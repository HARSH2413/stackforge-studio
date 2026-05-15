"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { MessageCircle, X, Send, Sparkles, CheckCircle2, RotateCcw } from "lucide-react";
import {
  ChatbotStep,
  ChatbotMessage,
  LeadData,
  getNextStep,
  getBotResponseForStep,
  validatePhone,
  validateEmail,
  validateName,
} from "@/lib/chatbot-flow";
import { answerUserQuestion } from "@/lib/chatbot-knowledge";

// ──────────────────────────────────────────────────────────────
// Constants
// ──────────────────────────────────────────────────────────────
const TYPING_DELAY_MIN = 600;
const TYPING_DELAY_MAX = 1200;
const KB_FOLLOWUP_DELAY = 2000;
const INACTIVITY_NUDGE_1 = 45000; // 45 seconds
const INACTIVITY_NUDGE_2 = 120000; // 2 minutes
const MAX_LEAD_RETRIES = 3;

const getTypingDelay = (textLength: number): number => {
  // Longer messages = slightly longer typing delay for realism
  const base = TYPING_DELAY_MIN + Math.random() * (TYPING_DELAY_MAX - TYPING_DELAY_MIN);
  const lengthBonus = Math.min(textLength * 2, 400);
  return base + lengthBonus;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatbotMessage[]>([]);
  const [currentStep, setCurrentStep] = useState<ChatbotStep>("welcome");
  const [leadData, setLeadData] = useState<LeadData>({});
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const inactivityTimer1 = useRef<NodeJS.Timeout | null>(null);
  const inactivityTimer2 = useRef<NodeJS.Timeout | null>(null);
  const inactivityFired = useRef<Set<number>>(new Set());

  // Track current step in a ref to avoid stale closures in timers
  const currentStepRef = useRef(currentStep);
  currentStepRef.current = currentStep;

  const isTypingRef = useRef(isTyping);
  isTypingRef.current = isTyping;

  // ──────────────────────────────────────────────────────────
  // Initialize chat on first open
  // ──────────────────────────────────────────────────────────
  const initRef = useRef(false);
  useEffect(() => {
    if (isOpen && !initRef.current) {
      initRef.current = true;
      setLeadData((prev) => ({
        ...prev,
        conversationSource: window.location.pathname,
      }));
      addBotMessageForStep("welcome");
    }
    // Focus input when chat opens
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // ──────────────────────────────────────────────────────────
  // Auto-scroll on new messages
  // ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  // ──────────────────────────────────────────────────────────
  // Inactivity nudges — uses refs to avoid stale closure bugs
  // ──────────────────────────────────────────────────────────
  const clearInactivityTimers = useCallback(() => {
    if (inactivityTimer1.current) clearTimeout(inactivityTimer1.current);
    if (inactivityTimer2.current) clearTimeout(inactivityTimer2.current);
  }, []);

  useEffect(() => {
    clearInactivityTimers();

    if (isOpen && messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg.sender === "bot" && !isTyping && currentStep !== "final_closing") {
        // First nudge
        if (!inactivityFired.current.has(1)) {
          inactivityTimer1.current = setTimeout(() => {
            if (!isTypingRef.current && currentStepRef.current !== "final_closing") {
              inactivityFired.current.add(1);
              addBotMessageText(
                "Still here? 😊 No rush — I can help with:\n\n• A quick cost estimate for your project\n• Understanding our services better\n• Connecting you directly with our team\n\nJust pick an option or type your question!"
              );
            }
          }, INACTIVITY_NUDGE_1);
        }

        // Second nudge
        if (!inactivityFired.current.has(2)) {
          inactivityTimer2.current = setTimeout(() => {
            if (!isTypingRef.current && currentStepRef.current !== "final_closing") {
              inactivityFired.current.add(2);
              addBotMessageText(
                "No worries if you're busy! 👋\n\nYou can always come back later, or reach us directly:\n\n📧 hello@noryant.com\n\nWe're here whenever you're ready."
              );
            }
          }, INACTIVITY_NUDGE_2);
        }
      }
    }

    return clearInactivityTimers;
  }, [messages, isTyping, isOpen, currentStep, clearInactivityTimers]);

  // Reset inactivity flags when user interacts
  useEffect(() => {
    if (hasInteracted) {
      inactivityFired.current.clear();
      setHasInteracted(false);
    }
  }, [hasInteracted]);

  // ──────────────────────────────────────────────────────────
  // Message helpers
  // ──────────────────────────────────────────────────────────
  const addBotMessageForStep = useCallback((step: ChatbotStep, previousInput?: string) => {
    setIsTyping(true);
    const botResponse = getBotResponseForStep(step, previousInput);
    const delay = getTypingDelay(botResponse.text?.length || 0);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          sender: "bot",
          text: botResponse.text || "",
          options: botResponse.options,
          inputType: botResponse.inputType,
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
      setCurrentStep(step);
    }, delay);
  }, []);

  const addBotMessageText = useCallback((text: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          sender: "bot",
          text,
          inputType: "none",
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, getTypingDelay(text.length));
  }, []);

  // ──────────────────────────────────────────────────────────
  // Lead submission with retry logic
  // ──────────────────────────────────────────────────────────
  const submitLeadData = useCallback(async (data: LeadData, retries = 0) => {
    try {
      const response = await fetch("/api/chatbot-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, timestamp: new Date().toISOString() }),
      });
      if (!response.ok && retries < MAX_LEAD_RETRIES) {
        console.warn(`Lead submission failed (attempt ${retries + 1}), retrying...`);
        setTimeout(() => submitLeadData(data, retries + 1), 2000 * (retries + 1));
      }
    } catch (error) {
      console.error("Failed to submit lead data:", error);
      if (retries < MAX_LEAD_RETRIES) {
        setTimeout(() => submitLeadData(data, retries + 1), 2000 * (retries + 1));
      }
    }
  }, []);

  // ──────────────────────────────────────────────────────────
  // Input validation based on current step
  // ──────────────────────────────────────────────────────────
  const validateCurrentInput = (text: string): { valid: boolean; message?: string } => {
    switch (currentStep) {
      case "contact_whatsapp":
      case "talk_to_human_whatsapp":
        return validatePhone(text);
      case "contact_email":
        return validateEmail(text);
      case "contact_name":
      case "talk_to_human_start":
        return validateName(text);
      default:
        return { valid: true };
    }
  };

  // ──────────────────────────────────────────────────────────
  // Core input handler
  // ──────────────────────────────────────────────────────────
  const handleUserInput = useCallback(
    (text: string) => {
      if (!text.trim() || isTyping) return;

      setHasInteracted(true);

      // Validate input before processing
      const validation = validateCurrentInput(text);
      if (!validation.valid) {
        // Show validation error as bot message
        addBotMessageText(validation.message || "Please check your input and try again.");
        return;
      }

      // Add user message
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-user`,
          sender: "user",
          text,
          timestamp: new Date(),
        },
      ]);
      setInputValue("");

      // Process user input based on current step
      const updatedLeadData = { ...leadData };
      const lowerText = text.toLowerCase();
      const isSkip = lowerText === "skip" || lowerText === "no" || lowerText === "none" || lowerText === "later";

      switch (currentStep) {
        case "welcome":
        case "just_exploring":
        case "support_after_delivery":
          updatedLeadData.service = text;
          break;
        case "talk_to_human_start":
          updatedLeadData.name = text;
          break;
        case "talk_to_human_whatsapp":
          updatedLeadData.whatsapp = text;
          submitLeadData(updatedLeadData);
          break;
        case "service_selection":
          updatedLeadData.projectDescription = text;
          break;
        case "project_stage":
          updatedLeadData.projectStage = text;
          break;
        case "budget":
          updatedLeadData.budget = text;
          break;
        case "contact_name":
          if (!isSkip) updatedLeadData.name = text;
          break;
        case "contact_whatsapp":
          if (!isSkip) updatedLeadData.whatsapp = text;
          submitLeadData(updatedLeadData); // Partial save at WhatsApp
          break;
        case "contact_email":
          if (!isSkip) updatedLeadData.email = text;
          submitLeadData(updatedLeadData); // Lead complete
          break;
        case "timeline":
          updatedLeadData.timeline = text;
          break;
        case "redirect":
          // Handled via handleRedirect below
          break;
        case "callback_preference":
          updatedLeadData.callbackPreference = text;
          submitLeadData(updatedLeadData);
          break;
      }

      setLeadData(updatedLeadData);

      // ── KB question detection (only during free-text steps) ──
      const activeBotMsg = messages[messages.length - 1];
      const isTextInputStep = activeBotMsg?.inputType === "text" || (!activeBotMsg?.options && activeBotMsg?.inputType !== "tel" && activeBotMsg?.inputType !== "email");
      const isOptionStep = activeBotMsg?.inputType === "none" && activeBotMsg?.options;

      let isQuestionHandled = false;

      // Only check KB for text input steps where it makes sense (not during name/phone/email collection)
      const collectingContactInfo = ["contact_name", "contact_whatsapp", "contact_email", "talk_to_human_start", "talk_to_human_whatsapp"].includes(currentStep);

      if (!collectingContactInfo && !isOptionStep) {
        // Check if user typed a question instead of answering
        const isQuestion = text.includes("?") || /^(what|how|why|when|where|can|do|does|is|are|will|should)\b/i.test(text.trim());
        
        if (isQuestion || (isTextInputStep && text.length < 15)) {
          const kbAnswer = answerUserQuestion(text);
          if (kbAnswer) {
            addBotMessageText(kbAnswer);
            isQuestionHandled = true;

            // Only re-prompt for text-input steps where user still needs to answer.
            // For option-based steps (welcome, exploring, etc.), just add a gentle
            // follow-up — do NOT re-send the entire step message + options again.
            const stepsWithTextInput: ChatbotStep[] = ["service_selection"];
            if (stepsWithTextInput.includes(currentStep)) {
              setTimeout(() => {
                addBotMessageForStep(currentStep, text);
              }, KB_FOLLOWUP_DELAY);
            } else {
              // Gentle nudge — don't repeat options
              setTimeout(() => {
                addBotMessageText("Feel free to pick any option above, or ask me another question! 😊");
              }, KB_FOLLOWUP_DELAY);
            }
          }
        }
      }

      if (!isQuestionHandled) {
        const nextStep = getNextStep(currentStep, text);

        if (currentStep === "redirect") {
          handleRedirect(text);
        }

        addBotMessageForStep(nextStep, text);
      }
    },
    [currentStep, leadData, messages, isTyping, addBotMessageText, addBotMessageForStep, submitLeadData]
  );

  // ──────────────────────────────────────────────────────────
  // Option click handler
  // ──────────────────────────────────────────────────────────
  const handleOptionClick = useCallback(
    (option: string) => {
      handleUserInput(option);
    },
    [handleUserInput]
  );

  // ──────────────────────────────────────────────────────────
  // Redirect handler — WhatsApp, consultation, etc.
  // ──────────────────────────────────────────────────────────
  const handleRedirect = (option: string) => {
    const lower = option.toLowerCase();

{/*     if (lower.includes("whatsapp") || lower.includes("💬")) {
      const waText = encodeURIComponent(
        `Hi Noryant! I'd like to discuss a project.\n\nName: ${leadData.name || "Not shared"}\nService: ${leadData.service || "General inquiry"}\nBudget: ${leadData.budget || "Not specified"}`
      );
      const waLink = `https://wa.me/919999999999?text=${waText}`;
      window.open(waLink, "_blank");
    } */}
    // Callback & consultation are handled by step transitions
  };

  // ──────────────────────────────────────────────────────────
  // Reset chat
  // ──────────────────────────────────────────────────────────
  const resetChat = () => {
    setMessages([]);
    setCurrentStep("welcome");
    setLeadData({});
    setInputValue("");
    setIsTyping(false);
    inactivityFired.current.clear();
    initRef.current = false;
    setIsOpen(false);
    setTimeout(() => setIsOpen(true), 100);
  };

  // ──────────────────────────────────────────────────────────
  // Computed state
  // ──────────────────────────────────────────────────────────
  const activeBotMsg = [...messages].reverse().find((m) => m.sender === "bot");
  const isInputDisabled = (activeBotMsg?.inputType === "none" && !!activeBotMsg?.options) || isTyping;

  const getPlaceholder = (): string => {
    if (isTyping) return "Noryant is typing...";
    if (activeBotMsg?.inputType === "none" && activeBotMsg?.options) return "Select an option above...";
    if (currentStep === "contact_whatsapp" || currentStep === "talk_to_human_whatsapp") return "+91 98765 43210";
    if (currentStep === "contact_email") return "your@email.com or type 'skip'";
    if (currentStep === "contact_name" || currentStep === "talk_to_human_start") return "Your full name...";
    return "Type your message...";
  };

  return (
    <>
      {/* ── Floating CTA Button ── */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 animate-fade-up">
          <div
            className="hidden sm:block bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-lg cursor-pointer hover:bg-slate-50 transition-colors"
            onClick={() => setIsOpen(true)}
          >
            <p className="text-sm font-semibold text-slate-800">Need a Website, App or Custom Software?</p>
            <p className="text-xs text-amber-600 font-medium mt-0.5">Chat with us — it&apos;s free! ✨</p>
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-900/30 transition-all hover:scale-110 group relative"
            aria-label="Open Chatbot"
          >
            <div className="absolute inset-0 rounded-full border-2 border-amber-500 opacity-0 group-hover:animate-pulse-ring" />
            <MessageCircle className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-slate-900">
              1
            </span>
          </button>
        </div>
      )}

      {/* ── Chat Window ── */}
      {isOpen && (
        <div
          ref={chatWindowRef}
          className="fixed bottom-6 right-6 z-50 w-full max-w-[380px] h-[580px] max-h-[85vh] flex flex-col bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden sm:right-6 right-0 sm:bottom-6 bottom-0 sm:w-auto sm:rounded-2xl rounded-none animate-fade-up"
        >
          {/* Header */}
          <div className="bg-slate-900 px-4 py-4 border-b border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="relative animate-levitate">
                  <div className="h-10 w-10 rounded-[10px] logo-glass-dark shadow-sm overflow-hidden flex items-center justify-center">
                    <Image src="/images/noryant-logo.png" alt="Noryant" width={120} height={120} className="w-[85%] h-[85%] object-contain logo-glow" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-slate-900 shadow-sm" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Noryant</h3>
                  <div className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                      {isTyping ? "Typing..." : "Smart Project Assistant"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={resetChat}
                  className="text-slate-500 hover:text-white transition-colors p-1"
                  aria-label="Reset Chat"
                  title="Start new conversation"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-white transition-colors p-1"
                  aria-label="Close Chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Micro Trust Badges */}
            <div className="flex gap-2 justify-start mt-1">
              <span className="flex items-center gap-1 bg-slate-800/50 text-slate-300 text-[9px] px-1.5 py-0.5 rounded-sm border border-slate-700">
                <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" /> Free Consultation
              </span>
              <span className="flex items-center gap-1 bg-slate-800/50 text-slate-300 text-[9px] px-1.5 py-0.5 rounded-sm border border-slate-700">
                <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" /> 6 Months Support
              </span>
              <span className="flex items-center gap-1 bg-slate-800/50 text-slate-300 text-[9px] px-1.5 py-0.5 rounded-sm border border-slate-700">
                <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" /> Cost-Optimized
              </span>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4 custom-scrollbar">
            {messages.map((msg, idx) => {
              const isBot = msg.sender === "bot";
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isBot ? "items-start" : "items-end"} max-w-full animate-message-slide`}
                >
                  <div className={`flex items-end gap-2 max-w-[85%] ${isBot ? "flex-row" : "flex-row-reverse"}`}>
                    {isBot && (
                      <div className="flex-shrink-0 h-6 w-6 rounded-md logo-glass flex items-center justify-center mt-1 overflow-hidden border border-white/50 shadow-sm animate-levitate" style={{ animationDuration: '6s' }}>
                        <Image src="/images/noryant-logo.png" alt="Noryant" width={80} height={80} className="w-[85%] h-[85%] object-contain" />
                      </div>
                    )}
                    <div
                      className={`rounded-2xl px-4 py-2.5 text-sm ${
                        isBot
                          ? "bg-white border border-slate-200 text-slate-700 rounded-bl-sm shadow-sm"
                          : "bg-amber-500 text-slate-900 rounded-br-sm shadow-md font-medium"
                      } whitespace-pre-wrap leading-relaxed`}
                    >
                      {msg.text}
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 px-8">
                    {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>

                  {/* Options (only show for the latest bot message) */}
                  {isBot && msg.options && idx === messages.length - 1 && !isTyping && (
                    <div className="flex flex-wrap gap-2 mt-3 ml-8">
                      {msg.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleOptionClick(opt)}
                          className="text-xs font-medium px-3 py-1.5 rounded-full border border-amber-200 bg-amber-50 text-amber-800 hover:bg-amber-100 hover:border-amber-300 active:scale-95 transition-all text-left"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-end gap-2 max-w-[85%] animate-message-slide">
                <div className="flex-shrink-0 h-6 w-6 rounded-md logo-glass flex items-center justify-center mt-1 overflow-hidden border border-white/50 shadow-sm animate-levitate" style={{ animationDuration: '6s' }}>
                  <Image src="/images/noryant-logo.png" alt="Noryant" width={80} height={80} className="w-[85%] h-[85%] object-contain" />
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUserInput(inputValue);
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type={
                  activeBotMsg?.inputType === "email"
                    ? "email"
                    : activeBotMsg?.inputType === "tel"
                    ? "tel"
                    : "text"
                }
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={getPlaceholder()}
                disabled={isInputDisabled}
                className="flex-1 h-10 px-4 text-sm bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isInputDisabled}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 text-slate-900 hover:bg-amber-600 disabled:opacity-50 disabled:hover:bg-amber-500 active:scale-95 transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="text-center mt-2">
              <span className="text-[10px] text-slate-400 font-mono">Powered by Noryant AI</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
