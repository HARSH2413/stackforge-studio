"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Bot, Sparkles, CheckCircle2 } from "lucide-react";
import {
  ChatbotStep,
  ChatbotMessage,
  LeadData,
  getNextStep,
  getBotResponseForStep,
} from "@/lib/chatbot-flow";
import { answerUserQuestion } from "@/lib/chatbot-knowledge";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatbotMessage[]>([]);
  const [currentStep, setCurrentStep] = useState<ChatbotStep>("welcome");
  const [leadData, setLeadData] = useState<LeadData>({});
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  // Inactivity timers refs
  const inactivityTimer1 = useRef<NodeJS.Timeout | null>(null);
  const inactivityTimer2 = useRef<NodeJS.Timeout | null>(null);

  // Initialize the chat on first open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setLeadData((prev) => ({
        ...prev,
        conversationSource: window.location.pathname,
      }));
      addBotMessageForStep("welcome");
    }
  }, [isOpen]);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  // Inactivity logic
  useEffect(() => {
    // Clear existing timers
    if (inactivityTimer1.current) clearTimeout(inactivityTimer1.current);
    if (inactivityTimer2.current) clearTimeout(inactivityTimer2.current);

    if (isOpen && messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg.sender === "bot" && !isTyping && currentStep !== "final_closing") {
        inactivityTimer1.current = setTimeout(() => {
          addBotMessageText("Still there? I can help you with a quick estimate or connect you to our team.");
        }, 30000); // 30 seconds

        inactivityTimer2.current = setTimeout(() => {
          addBotMessageText("No worries. You can return anytime or click Talk to Human for direct assistance.");
        }, 90000); // 90 seconds (60s after first warning)
      }
    }

    return () => {
      if (inactivityTimer1.current) clearTimeout(inactivityTimer1.current);
      if (inactivityTimer2.current) clearTimeout(inactivityTimer2.current);
    };
  }, [messages, isTyping, isOpen, currentStep]);

  const addBotMessageForStep = (step: ChatbotStep, previousInput?: string) => {
    setIsTyping(true);
    const botResponse = getBotResponseForStep(step, previousInput);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: "bot",
          text: botResponse.text || "",
          options: botResponse.options,
          inputType: botResponse.inputType,
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
      setCurrentStep(step);
    }, 800 + Math.random() * 500); // Simulated typing delay
  };

  const addBotMessageText = (text: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: "bot",
          text,
          inputType: "none",
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 600);
  };

  const submitLeadData = async (data: LeadData) => {
    try {
      await fetch("/api/chatbot-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, timestamp: new Date().toISOString() }),
      });
    } catch (error) {
      console.error("Failed to submit lead data:", error);
    }
  };

  const handleUserInput = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: "user",
        text,
        timestamp: new Date(),
      },
    ]);
    setInputValue("");

    // Process user input based on current step
    let updatedLeadData = { ...leadData };
    const lowerText = text.toLowerCase();
    const isSkip = lowerText.includes("skip") || lowerText.includes("no") || lowerText.includes("refuse");

    switch (currentStep) {
      case "welcome":
      case "just_exploring":
      case "support_after_delivery":
        updatedLeadData.service = text;
        break;
      case "talk_to_human_start":
        updatedLeadData.name = text;
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
        submitLeadData(updatedLeadData); // Partial save
        break;
      case "contact_email":
        if (!isSkip) updatedLeadData.email = text;
        submitLeadData(updatedLeadData); // Lead complete!
        break;
      case "timeline":
        updatedLeadData.timeline = text;
        break;
      case "redirect":
        // Handled below
        break;
      case "callback_preference":
        updatedLeadData.callbackPreference = text;
        submitLeadData(updatedLeadData); // Resubmit with callback pref
        break;
    }

    setLeadData(updatedLeadData);

    // Check if it's an out-of-flow KB question
    const activeBotMsg = messages[messages.length - 1];
    const isExpectingSpecificInput = activeBotMsg?.inputType !== "text" && activeBotMsg?.inputType !== "none";
    
    let isQuestionHandled = false;
    if (!isExpectingSpecificInput) {
      const kbAnswer = answerUserQuestion(text);
      if (kbAnswer) {
        addBotMessageText(kbAnswer);
        isQuestionHandled = true;
        // Re-ask the current step's question after answering
        setTimeout(() => {
          addBotMessageForStep(currentStep, text);
        }, 1500);
      }
    }

    if (!isQuestionHandled) {
      const nextStep = getNextStep(currentStep, text);
      
      if (nextStep === "redirect" && currentStep !== "redirect") {
         // Transitioning into redirect
         addBotMessageForStep(nextStep, text);
      } else if (currentStep === "redirect") {
         // Answering the redirect options
         handleRedirect(text);
         addBotMessageForStep(nextStep, text);
      } else {
         // Normal transition
         addBotMessageForStep(nextStep, text);
      }
    }
  };

  const handleOptionClick = (option: string) => {
    handleUserInput(option);
  };

  const handleRedirect = (option: string) => {
     let waText = encodeURIComponent(`Hi, I would like to discuss a project. Name: ${leadData.name || ''}, Service: ${leadData.service || ''}`);
     const waLink = `https://wa.me/919999999999?text=${waText}`;

     if (option.includes("WhatsApp")) {
         window.open(waLink, "_blank");
     } else if (option.includes("Consultation")) {
         addBotMessageText("Great! Someone from our team will contact you shortly to schedule.");
     }
  };

  const activeBotMsg = [...messages].reverse().find(m => m.sender === 'bot');

  return (
    <>
      {/* Floating Button with Collapsed Text */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 animate-fade-up">
          <div className="hidden sm:block bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-lg cursor-pointer hover:bg-slate-50 transition-colors"
               onClick={() => setIsOpen(true)}>
            <p className="text-sm font-semibold text-slate-800">Need a Website, App or Custom Software?</p>
            <p className="text-xs text-amber-600 font-medium mt-0.5">Chat with Us.</p>
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

      {/* Chat Window */}
      {isOpen && (
        <div 
          ref={chatWindowRef}
          className="fixed bottom-6 right-6 z-50 w-full max-w-[380px] h-[580px] max-h-[85vh] flex flex-col bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden sm:right-6 right-0 sm:bottom-6 bottom-0 sm:w-auto sm:rounded-2xl rounded-none animate-fade-up"
        >
          {/* Header */}
          <div className="bg-slate-900 px-4 py-4 border-b border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 border border-slate-700">
                  <Bot className="w-5 h-5 text-amber-500" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-slate-900" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Stackforge Studio</h3>
                  <div className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Smart Project Assistant</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Close Chat"
              >
                <X className="w-5 h-5" />
              </button>
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
                <div key={msg.id} className={`flex flex-col ${isBot ? "items-start" : "items-end"} max-w-full animate-message-slide`}>
                  <div className={`flex items-end gap-2 max-w-[85%] ${isBot ? "flex-row" : "flex-row-reverse"}`}>
                    {isBot && (
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-slate-800 flex items-center justify-center mt-1">
                        <Bot className="w-3 h-3 text-amber-500" />
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
                  <span className={`text-[10px] text-slate-400 mt-1 px-8`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>

                  {/* Options (only show for the latest bot message) */}
                  {isBot && msg.options && idx === messages.length - 1 && !isTyping && (
                    <div className="flex flex-wrap gap-2 mt-3 ml-8">
                      {msg.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleOptionClick(opt)}
                          className="text-xs font-medium px-3 py-1.5 rounded-full border border-amber-200 bg-amber-50 text-amber-800 hover:bg-amber-100 transition-colors text-left"
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
                 <div className="flex-shrink-0 h-6 w-6 rounded-full bg-slate-800 flex items-center justify-center mt-1">
                    <Bot className="w-3 h-3 text-amber-500" />
                 </div>
                 <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                   <div className="flex gap-1">
                     <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                     <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                     <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
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
                type={activeBotMsg?.inputType === "email" ? "email" : activeBotMsg?.inputType === "tel" ? "tel" : "text"}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={activeBotMsg?.inputType === "none" && activeBotMsg?.options ? "Select an option above..." : "Type your message..."}
                disabled={activeBotMsg?.inputType === "none" && !!activeBotMsg?.options}
                className="flex-1 h-10 px-4 text-sm bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || (activeBotMsg?.inputType === "none" && !!activeBotMsg?.options)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 text-slate-900 hover:bg-amber-600 disabled:opacity-50 disabled:hover:bg-amber-500 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="text-center mt-2">
              <span className="text-[10px] text-slate-400 font-mono">Powered by Stackforge AI</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
