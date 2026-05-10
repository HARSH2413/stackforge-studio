// ──────────────────────────────────────────────────────────────
// Noryant — Advanced Chatbot Conversation Flow
// Context-aware responses, input validation, smart transitions
// ──────────────────────────────────────────────────────────────

export type ChatbotStep =
  | "welcome"
  | "service_selection"
  | "project_description"
  | "project_stage"
  | "budget"
  | "contact_name"
  | "contact_whatsapp"
  | "contact_email"
  | "timeline"
  | "redirect"
  | "callback_preference"
  | "talk_to_human_start"
  | "talk_to_human_whatsapp"
  | "just_exploring"
  | "support_after_delivery"
  | "final_closing";

export interface ChatbotMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  options?: string[];
  inputType?: "text" | "email" | "tel" | "none";
  timestamp: Date;
}

export interface LeadData {
  service?: string;
  projectDescription?: string;
  projectStage?: string;
  budget?: string;
  name?: string;
  whatsapp?: string;
  email?: string;
  timeline?: string;
  callbackPreference?: string;
  conversationSource?: string;
}

// ──────────────────────────────────────────────────────────────
// Input validation helpers
// ──────────────────────────────────────────────────────────────

export const validatePhone = (input: string): { valid: boolean; message?: string } => {
  const digits = input.replace(/[\s\-\(\)\+]/g, "");
  if (digits.length < 7) return { valid: false, message: "That doesn't look like a valid phone number. Please enter at least 10 digits including country code." };
  if (digits.length > 15) return { valid: false, message: "That number seems too long. Please double-check and try again." };
  if (!/^\d+$/.test(digits)) return { valid: false, message: "Please enter only numbers (you can include + for country code)." };
  return { valid: true };
};

export const validateEmail = (input: string): { valid: boolean; message?: string } => {
  const lower = input.toLowerCase().trim();
  if (lower === "skip" || lower === "no" || lower === "none" || lower === "later") return { valid: true }; // Allow skip
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(lower)) return { valid: false, message: "That doesn't look like a valid email. Please try again, or type 'skip' to continue without email." };
  return { valid: true };
};

export const validateName = (input: string): { valid: boolean; message?: string } => {
  const trimmed = input.trim();
  if (trimmed.length < 2) return { valid: false, message: "Could you share your full name? Even a first name works." };
  if (/^\d+$/.test(trimmed)) return { valid: false, message: "That looks like a number. Could you share your name instead?" };
  return { valid: true };
};

// ──────────────────────────────────────────────────────────────
// Contextual input analysis
// ──────────────────────────────────────────────────────────────

const detectServiceIntent = (input: string): string | null => {
  const lower = input.toLowerCase();
  if (/website|web|site|landing|page|portal/.test(lower)) return "website";
  if (/app|mobile|android|ios|flutter/.test(lower)) return "mobile_app";
  if (/ai|automat|chatbot|bot|machine learning|ml/.test(lower)) return "ai_automation";
  if (/software|system|dashboard|erp|crm|inventory/.test(lower)) return "business_software";
  if (/computer vision|image|detection|ocr|visual/.test(lower)) return "computer_vision";
  return null;
};

const getServiceAcknowledgment = (input: string): string => {
  const service = detectServiceIntent(input);
  switch (service) {
    case "website":
      return "A website project — great choice! Websites are one of our strongest areas. 🌐";
    case "mobile_app":
      return "A mobile app — exciting! We build cross-platform apps with Flutter for both Android and iOS. 📱";
    case "ai_automation":
      return "AI and automation — love it! We've built smart bots, workflow automation, and AI-powered tools. 🤖";
    case "business_software":
      return "Business software — that's our bread and butter! We build systems tailored to real workflows. ⚙️";
    case "computer_vision":
      return "Computer vision — interesting project! We've worked on object detection and visual AI systems. 🔍";
    default:
      return "Interesting project! Let me understand more to suggest the best approach.";
  }
};

// ──────────────────────────────────────────────────────────────
// Step transition logic
// ──────────────────────────────────────────────────────────────

export const getNextStep = (currentStep: ChatbotStep, userInput?: string): ChatbotStep => {
  const input = userInput?.toLowerCase() || "";

  switch (currentStep) {
    case "welcome":
      if (input.includes("talk to human") || input.includes("speak to someone") || input.includes("real person")) return "talk_to_human_start";
      if (input.includes("just exploring") || input.includes("browsing") || input.includes("looking around")) return "just_exploring";
      if (input.includes("support") || input.includes("after delivery") || input.includes("bug")) return "support_after_delivery";
      if (input.includes("cost estimate") || input.includes("quick estimate") || input.includes("pricing")) return "service_selection";
      return "service_selection";

    case "talk_to_human_start":
      return "talk_to_human_whatsapp";

    case "talk_to_human_whatsapp":
      return "final_closing";

    case "just_exploring":
      if (input.includes("talk to human") || input.includes("speak")) return "talk_to_human_start";
      if (input.includes("ask") || input.includes("question")) return "welcome";
      if (input.includes("pricing") || input.includes("rough pricing") || input.includes("cost")) return "service_selection";
      if (input.includes("services") || input.includes("understand")) return "service_selection";
      return "service_selection";

    case "support_after_delivery":
      if (input.includes("yes") || input.includes("start") || input.includes("discuss")) return "service_selection";
      if (input.includes("question") || input.includes("more") || input.includes("ask")) return "welcome";
      return "service_selection";

    case "service_selection":
      return "project_stage";

    case "project_stage":
      return "budget";

    case "budget":
      return "contact_name";

    case "contact_name":
      return "contact_whatsapp";

    case "contact_whatsapp":
      return "contact_email";

    case "contact_email":
      return "timeline";

    case "timeline":
      return "redirect";

    case "redirect":
      if (input.includes("callback") || input.includes("call me") || input.includes("call back")) return "callback_preference";
      if (input.includes("continue") || input.includes("asking") || input.includes("more questions")) return "welcome";
      return "final_closing";

    case "callback_preference":
      return "final_closing";

    default:
      return "welcome";
  }
};

// ──────────────────────────────────────────────────────────────
// Response generation — contextual & personality-driven
// ──────────────────────────────────────────────────────────────

export const getBotResponseForStep = (
  step: ChatbotStep,
  previousInput?: string
): Partial<ChatbotMessage> => {
  const input = previousInput?.toLowerCase() || "";

  switch (step) {
    case "welcome":
      return {
        text: "Hey there! 👋 Welcome to Noryant.\n\nWe're a software development studio that builds practical, affordable digital solutions — websites, mobile apps, AI automation, and custom business software.\n\nWhat brings you here today?",
        options: [
          "🌐 Website Development",
          "📱 Mobile App",
          "🤖 AI & Automation",
          "⚙️ Business Software",
          "💰 Get a Quick Estimate",
          "🔧 Post-Delivery Support",
          "👀 Just Exploring",
          "👤 Talk to a Human",
        ],
        inputType: "none",
      };

    case "talk_to_human_start":
      return {
        text: "Absolutely! Our team will reach out to you directly.\n\nCould you share your name so we know who to connect with?",
        inputType: "text",
      };

    case "talk_to_human_whatsapp":
      return {
        text: `Thanks${previousInput ? `, ${previousInput.trim().split(" ")[0]}` : ""}! 🙌\n\nWhat's the best WhatsApp number to reach you on?\n\n(Include country code, e.g., +91 98765 43210)`,
        inputType: "tel",
      };

    case "just_exploring":
      return {
        text: "No pressure at all! 😊 Take your time.\n\nHere's what most visitors ask about:\n\n• 💰 Rough pricing for projects\n• 📋 How our development process works\n• 🛠️ What services we offer\n• 📁 Our past work & case studies\n\nWhat interests you?",
        options: [
          "💰 See Rough Pricing",
          "📋 Understand Our Process",
          "🛠️ Explore Services",
          "❓ Ask a Question",
          "👤 Talk to a Human",
        ],
        inputType: "none",
      };

    case "support_after_delivery":
      return {
        text: "Great question! Here's our support commitment:\n\n✅ 6 months complimentary technical support\n✅ Bug fixes & critical patches included\n✅ Minor UI adjustments covered\n✅ Technical guidance via WhatsApp/email\n✅ Optional extended maintenance plans available\n\nYou're never left alone after launch.\n\nWant to discuss a new project with this support assurance?",
        options: ["✅ Yes, Let's Discuss a Project", "❓ Ask More Questions"],
        inputType: "none",
      };

    case "service_selection": {
      let intro = "Great! To give you the best guidance, could you describe what you're looking to build?\n\nEven a rough idea works — something like:\n• \"I need a website for my bakery\"\n• \"I want an inventory app for my shop\"\n• \"I need to automate my email follow-ups\"";

      // Contextual intro based on what they selected
      if (input.includes("website") || input.includes("🌐")) {
        intro = "Awesome — websites are one of our specialties! 🌐\n\nCould you tell me a bit more? For example:\n• What kind of business is it for?\n• Do you need an admin panel or CMS?\n• Any specific features in mind (booking, e-commerce, forms)?";
      } else if (input.includes("mobile") || input.includes("app") || input.includes("📱")) {
        intro = "Mobile apps — exciting! 📱 We use Flutter for fast, cross-platform development.\n\nCould you describe your app idea? For example:\n• What problem does it solve?\n• Who are the users?\n• Any specific features (login, payments, maps)?";
      } else if (input.includes("ai") || input.includes("automation") || input.includes("🤖")) {
        intro = "AI & Automation — great choice! 🤖\n\nHelp me understand your need:\n• What manual process do you want to automate?\n• Do you need a chatbot, data processing, or workflow automation?\n• Any specific tools you currently use?";
      } else if (input.includes("business") || input.includes("software") || input.includes("⚙️")) {
        intro = "Business software — our bread and butter! ⚙️\n\nTell me about your workflow:\n• What does your business do?\n• What are you managing manually right now?\n• Any specific pain points (tracking, reporting, inventory)?";
      } else if (input.includes("estimate") || input.includes("cost") || input.includes("💰")) {
        intro = "Sure — let me help with a quick estimate! 💰\n\nFirst, could you briefly describe what you need built?\n\nSomething like: \"A mobile app for managing car inventory\" or \"A website with booking system.\"";
      }

      return {
        text: intro,
        inputType: "text",
      };
    }

    case "project_stage": {
      const ack = getServiceAcknowledgment(input);

      let stageIntro = ack;

      // Contextual enhancement based on their description
      if (input.length > 80) {
        stageIntro += "\n\nThat's a detailed description — really helpful! Let me understand where you are in the process.";
      } else if (input.includes("not sure") || input.includes("idea") || input.includes("thinking")) {
        stageIntro += "\n\nNo problem at all — we help clients go from rough ideas to complete execution roadmaps. Even a vague concept is a great starting point.";
      } else if (input.includes("cost") || input.includes("price") || input.includes("estimate") || input.includes("budget")) {
        stageIntro += "\n\nSure! I need just a couple of quick details to give you a realistic range.";
      } else if (input.includes("urgent") || input.includes("asap") || input.includes("fast") || input.includes("quick")) {
        stageIntro += "\n\nUnderstood — we'll prioritize speed. Let me gather a few details to create an efficient plan.";
      } else {
        stageIntro += "\n\nLet me understand where you are so I can suggest the best path forward.";
      }

      return {
        text: `${stageIntro}\n\nWhat stage is your project currently in?`,
        options: [
          "💡 Just an Idea",
          "🏗️ Need Full Development",
          "🔄 Upgrading Existing System",
          "💰 Need a Cost Estimate",
        ],
        inputType: "none",
      };
    }

    case "budget": {
      let budgetIntro = "";

      if (input.includes("idea") || input.includes("💡")) {
        budgetIntro = "Perfect starting point! 💡 We love helping clients shape ideas into concrete plans. We'll suggest the most practical and cost-efficient way to bring your vision to life.";
      } else if (input.includes("full development") || input.includes("🏗")) {
        budgetIntro = "Excellent! 🏗️ Full development means we can plan the complete architecture from day one — making it more efficient and scalable.";
      } else if (input.includes("upgrade") || input.includes("existing") || input.includes("🔄")) {
        budgetIntro = "Smart approach! 🔄 Upgrading existing systems is often more cost-effective than rebuilding. We'll audit what you have and improve only what's needed.";
      } else if (input.includes("estimate") || input.includes("cost") || input.includes("💰")) {
        budgetIntro = "Got it! 💰 Let me gather one more detail to give you a realistic estimate.";
      } else {
        budgetIntro = "Thanks for sharing! Let me understand your budget expectations to recommend the best approach.";
      }

      return {
        text: `${budgetIntro}\n\nWhat's your approximate budget range for this project?`,
        options: [
          "Under ₹25K",
          "₹25K – ₹50K",
          "₹50K – ₹1 Lakh",
          "₹1 Lakh+",
          "🤔 Not Sure Yet",
          "💬 Need Consultation First",
        ],
        inputType: "none",
      };
    }

    case "contact_name": {
      let nameIntro = "";

      if (input.includes("under") || input.includes("25k")) {
        nameIntro = "We specialize in lean, practical builds for budget-conscious businesses. Many functional solutions can be delivered within this range. 💪";
      } else if (input.includes("25k") && (input.includes("50k") || input.includes("–"))) {
        nameIntro = "Great range! 👍 Many practical custom systems — websites, dashboards, and focused apps — can be efficiently delivered within this bracket.";
      } else if (input.includes("50k") || input.includes("1 lakh") || input.includes("1l")) {
        nameIntro = "Excellent budget range! 🎯 This allows us to build stronger architecture with more feature depth and scalability.";
      } else if (input.includes("lakh") || input.includes("1l") || input.includes("above")) {
        nameIntro = "Great investment! 🚀 This opens room for advanced architecture, AI features, complex workflows, and premium UX design.";
      } else if (input.includes("not sure") || input.includes("consultation") || input.includes("🤔") || input.includes("💬")) {
        nameIntro = "No worries! 😊 We'll first understand your requirements and then suggest the most cost-optimized path. No obligation.";
      } else {
        nameIntro = "Noted! Our team can suggest the best technical approach for your budget and requirements. 📋";
      }

      return {
        text: `${nameIntro}\n\nTo send you a personalized recommendation, could you share your name?`,
        inputType: "text",
      };
    }

    case "contact_whatsapp": {
      const firstName = previousInput?.trim().split(" ")[0] || "";
      return {
        text: `Nice to meet you${firstName ? `, ${firstName}` : ""}! 😊\n\nWhat's the best WhatsApp number to reach you?\n\n(Include country code, e.g., +91 98765 43210)`,
        inputType: "tel",
      };
    }

    case "contact_email":
      return {
        text: "Almost done! 📧\n\nWhat's your email address?\n\n(Type 'skip' if you'd prefer WhatsApp-only communication)",
        inputType: "text",
      };

    case "timeline":
      return {
        text: "Last question — how soon are you looking to start? ⏰\n\nThis helps us plan our availability for your project.",
        options: [
          "🔥 Immediately",
          "📅 Within 1 Month",
          "📆 1–3 Months",
          "🔍 Just Exploring for Now",
        ],
        inputType: "none",
      };

    case "redirect": {
      let timelineAck = "";
      if (input.includes("immediately") || input.includes("🔥")) {
        timelineAck = "Great — we'll prioritize getting started quickly! 🚀\n\n";
      } else if (input.includes("1 month") || input.includes("📅")) {
        timelineAck = "Good timeline! We can have everything planned and ready. 📋\n\n";
      } else if (input.includes("1–3") || input.includes("1-3") || input.includes("📆")) {
        timelineAck = "Nice — that gives us room for thorough planning. 📐\n\n";
      } else if (input.includes("exploring") || input.includes("🔍")) {
        timelineAck = "No rush at all! We'll be here when you're ready. 😊\n\n";
      }

      return {
        text: `${timelineAck}How would you like to continue the conversation?`,
        options: [
          "💬 Chat on WhatsApp",
          "📞 Request a Callback",
          "🗓️ Schedule Free Consultation",
          "❓ Continue Asking Questions",
        ],
        inputType: "none",
      };
    }

    case "callback_preference":
      return {
        text: "When's the best time for us to call you? 📞",
        options: [
          "🌅 Morning (9AM–12PM)",
          "☀️ Afternoon (12PM–4PM)",
          "🌆 Evening (4PM–8PM)",
        ],
        inputType: "none",
      };

    case "final_closing": {
      let closingMessage = "Thank you for chatting with Noryant! 🙌\n\nHere's what happens next:\n\n";

      // Personalized closing based on conversation context
      if (input.includes("whatsapp") || input.includes("💬")) {
        closingMessage += "✅ We've opened WhatsApp for you — our team will respond shortly\n";
      } else if (input.includes("callback") || input.includes("call") || input.includes("📞")) {
        closingMessage += "✅ Callback request received — we'll call you at your preferred time\n";
      } else if (input.includes("consultation") || input.includes("schedule") || input.includes("🗓")) {
        closingMessage += "✅ Consultation request noted — our team will reach out to schedule\n";
      } else if (input.includes("morning") || input.includes("afternoon") || input.includes("evening") || input.includes("🌅") || input.includes("☀️") || input.includes("🌆")) {
        closingMessage += "✅ Callback scheduled — we'll call you at your preferred time\n";
      }

      closingMessage += "✅ Free consultation — no obligations\n✅ Cost-optimized development approach\n✅ 6 months complimentary post-launch support\n\nWe're excited to work with you! 🚀";

      return {
        text: closingMessage,
        inputType: "none",
      };
    }

    default:
      return {
        text: "I'm here to help! I can assist with:\n\n• 💰 Project estimates & pricing\n• 🛠️ Service information\n• 📋 Development process\n• 🤝 Connecting you with our team\n\nWhat would you like to know?",
        options: [
          "💰 Get a Quick Estimate",
          "👤 Talk to a Human",
          "👀 Just Exploring",
        ],
        inputType: "none",
      };
  }
};
