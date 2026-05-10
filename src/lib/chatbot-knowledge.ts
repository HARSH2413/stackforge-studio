export const answerUserQuestion = (query: string): string | null => {
  const lowerQuery = query.toLowerCase();

  const triggers = [
    // PRICING FAQ
    {
      keywords: ["website cost", "price of website", "how much does a website", "website pricing"],
      response:
        "Website pricing depends on pages, admin requirements, forms and integrations. We also provide startup-friendly cost-efficient builds. Would you like a quick estimate?",
    },
    {
      keywords: ["app cost", "price of app", "how much does an app", "app pricing"],
      response:
        "Mobile app pricing depends on screens, backend, user roles and features. We can provide a rough estimate based on your idea. Want to share a brief description?",
    },
    {
      keywords: ["maintenance", "expensive", "running cost", "monthly cost", "server cost"],
      response:
        "We design low-recurring-cost systems and provide 6 months complimentary support. We integrate free-tier architecture wherever possible to keep maintenance cheap. Ready to get a quick cost estimate?",
    },
    
    // CAPABILITY FAQ
    {
      keywords: ["inventory", "crm", "erp", "business software"],
      response:
        "Yes, custom inventory and workflow systems are one of our core offerings. We build cost-efficient software tailored to specific workflows. Would you like a free consultation?",
    },
    {
      keywords: ["ai", "automation", "chatbots", "bot", "openai", "gemini"],
      response:
        "Yes, AI inquiry bots, workflow bots and automation assistants are part of our AI solutions. Should we set up a call to discuss your automation needs?",
    },
    {
      keywords: ["upgrade", "improve", "old system", "legacy"],
      response:
        "Absolutely. We can improve selected modules without forcing a full rebuild. Would you like us to audit your existing system?",
    },

    // TRUST FAQ
    {
      keywords: ["company", "freelancer", "agency", "who are you"],
      response:
        "We operate as Stackforge Studio, a dedicated software development team handling end-to-end client solutions. We prioritize long-term relationships and scalable code.",
    },
    {
      keywords: ["support", "help after", "post launch", "bug fix"],
      response:
        "Yes, every delivered solution includes complimentary 6 months technical support covering bug fixes, minor corrections, and technical guidance.",
    },
    {
      keywords: ["time", "how long", "timeline", "duration", "fast"],
      response:
        "Timelines depend on complexity, but after requirement review we provide a practical roadmap. Simple MVPs can take 2-4 weeks. Would you like a timeline estimate?",
    },
    
    // OBJECTIONS
    {
      keywords: ["budget too low", "too expensive", "can't afford", "don't have money"],
      response:
        "We understand. In many cases we can recommend a lean MVP version first so your business can start digitally without heavy initial investment. Want to discuss a lean approach?",
    },
    {
      keywords: ["just checking", "looking around", "comparing", "not sure yet"],
      response:
        "That's completely fine. Even if you are comparing, we can still provide a free technical roadmap so you know realistic cost and feature scope. Should I connect you to our team?",
    },
    {
      keywords: ["discuss with partner", "talk to my boss", "team decision"],
      response:
        "Certainly. We can share a summarized proposal on WhatsApp/email that you can review internally. What is your preferred email or WhatsApp?",
    },
    {
      keywords: ["don't want to share", "not comfortable", "no number", "no email"],
      response:
        "No issue. I can still answer general questions here until you're ready. What else would you like to know?",
    },
  ];

  for (const trigger of triggers) {
    if (trigger.keywords.some((keyword) => lowerQuery.includes(keyword))) {
      return trigger.response;
    }
  }

  return null;
};
