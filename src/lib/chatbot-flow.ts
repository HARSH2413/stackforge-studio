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

export const getNextStep = (currentStep: ChatbotStep, userInput?: string): ChatbotStep => {
  const input = userInput?.toLowerCase() || "";

  switch (currentStep) {
    case "welcome":
      if (input.includes("talk to human")) return "talk_to_human_start";
      if (input.includes("just exploring")) return "just_exploring";
      if (input.includes("support")) return "support_after_delivery";
      return "service_selection";
      
    case "talk_to_human_start":
      return "contact_name";

    case "just_exploring":
      if (input.includes("talk to human")) return "talk_to_human_start";
      if (input.includes("ask a question")) return "welcome"; // Handled by KB
      return "service_selection";

    case "support_after_delivery":
      if (input.includes("yes")) return "service_selection";
      return "welcome"; // Or handled by KB

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
      if (input.includes("callback")) {
        return "callback_preference";
      }
      return "final_closing";

    case "callback_preference":
      return "final_closing";

    default:
      return "welcome";
  }
};

export const getBotResponseForStep = (
  step: ChatbotStep,
  previousInput?: string
): Partial<ChatbotMessage> => {
  const input = previousInput?.toLowerCase() || "";

  switch (step) {
    case "welcome":
      return {
        text: "👋 Welcome to Stackforge Studio.\nWe build affordable websites, mobile apps, AI automation and custom software for growing businesses.\n\nHow can we help you today?",
        options: [
          "Website Development",
          "Mobile App Development",
          "AI Automation",
          "Business Software",
          "Get Quick Cost Estimate",
          "Need Support After Delivery?",
          "Just Exploring",
          "Talk to Human",
        ],
        inputType: "none",
      };

    case "talk_to_human_start":
      return {
        text: "Absolutely. Please share your name and WhatsApp number and our team will connect with you directly.\n\nWhat is your Full Name?",
        inputType: "text",
      };

    case "just_exploring":
      return {
        text: "No worries. Here are common reasons businesses reach out to us:\n• custom websites\n• mobile apps\n• inventory systems\n• admin dashboards\n• AI workflow automation\n\nWould you like to:",
        options: [
          "See Rough Pricing",
          "Understand Services",
          "Ask a Question",
          "Talk to Human",
        ],
        inputType: "none",
      };

    case "support_after_delivery":
      return {
        text: "Yes. Every delivered project includes 6 months complimentary technical support covering bug fixes, minor corrections and technical guidance.\n\nWould you like to discuss a project with support assurance?",
        options: ["Yes Start Discussion", "Ask More Questions"],
        inputType: "none",
      };

    case "service_selection":
      return {
        text: "Great. Could you briefly describe what you are looking to build?",
        inputType: "text",
      };

    case "project_stage":
      let stageIntro = "Understood.";
      if (input.includes("not sure") || input.includes("idea")) {
        stageIntro = "No problem. Even a rough idea is enough. Are you trying to digitize an existing business process, launch a new product, or improve an old system?";
      } else if (input.includes("cost") || input.includes("price")) {
        stageIntro = "Sure, we can help with a practical estimate. I just need 2 quick details so our estimate is realistic.";
      } else if (input.includes("can you build") || input.includes("possible")) {
        stageIntro = "Very likely yes. We build custom solutions tailored to workflow needs. Let me understand a few details and suggest the best approach.";
      }
      return {
        text: `${stageIntro}\n\nWhat stage are you currently in?`,
        options: [
          "Just an Idea",
          "Need Full Development",
          "Need Upgrade",
          "Need Cost Estimate",
        ],
        inputType: "none",
      };

    case "budget":
      let budgetIntro = "";
      if (input.includes("idea")) budgetIntro = "Perfect. We also help clients convert raw ideas into complete execution roadmaps.";
      if (input.includes("full development")) budgetIntro = "Excellent. That means we can focus directly on implementation planning.";
      if (input.includes("upgrade")) budgetIntro = "Great. We can audit the existing system and improve only what is necessary.";
      if (input.includes("estimate")) budgetIntro = "Understood. We will guide you with a cost-efficient development estimate.";
      
      return {
        text: `${budgetIntro}\n\nWhat is your approximate budget for this project?`,
        options: [
          "Under ₹25K",
          "₹25K to ₹50K",
          "₹50K to ₹1L",
          "Above ₹1L",
          "Need Consultation First",
          "Not Sure",
        ],
        inputType: "none",
      };

    case "contact_name":
      let nameIntro = "Great. Our team can suggest the best technical roadmap for this.";
      if (input.includes("under")) nameIntro = "We specialize in lean and practical MVP-style builds for budget-sensitive businesses.";
      if (input.includes("25k to 50k")) nameIntro = "Good range. Many practical custom systems can be delivered efficiently within this bracket.";
      if (input.includes("50k to 1l")) nameIntro = "Great. That allows stronger scalability and feature depth.";
      if (input.includes("above 1l")) nameIntro = "Excellent. That opens room for advanced architecture and automation.";
      if (input.includes("consultation") || input.includes("not sure")) nameIntro = "No issue. We can first understand the requirement and suggest the most cost-optimized route.";

      return {
        text: `${nameIntro}\n\nWhere can we share the detailed guidance?\nPlease enter your Full Name:`,
        inputType: "text",
      };

    case "contact_whatsapp":
      return {
        text: "What is your WhatsApp number?",
        inputType: "tel",
      };

    case "contact_email":
      return {
        text: "What is your Email Address? (Or type 'skip' to use WhatsApp only)",
        inputType: "text",
      };

    case "timeline":
      return {
        text: "How soon are you planning to begin?",
        options: ["Immediate", "Within 1 Month", "1 to 3 Months", "Just Exploring"],
        inputType: "none",
      };

    case "redirect":
      return {
        text: "Perfect. How would you like to continue?",
        options: [
          "Chat on WhatsApp",
          "Request Callback",
          "Schedule Free Consultation",
          "Continue Asking Here",
        ],
        inputType: "none",
      };

    case "callback_preference":
      return {
        text: "What is your preferred callback time?",
        options: ["Morning", "Afternoon", "Evening"],
        inputType: "none",
      };

    case "final_closing":
      return {
        text: "Thank you for reaching out to Stackforge Studio.\n\n✔ Free Consultation\n✔ Cost-Optimized Development\n✔ 6 Months Complimentary Support\n\nOur team will connect with you shortly.",
        inputType: "none",
      };

    default:
      return {
        text: "I can help with project estimates, software consultation, websites, mobile apps, AI automation, business software, or support questions.\n\nPlease choose any option to guide me:",
        options: [
          "Get Quick Cost Estimate",
          "Talk to Human",
          "Just Exploring"
        ],
        inputType: "none",
      };
  }
};
