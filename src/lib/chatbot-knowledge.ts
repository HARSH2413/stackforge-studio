// ──────────────────────────────────────────────────────────────
// Noryant — Advanced Chatbot Knowledge Base
// Fuzzy keyword scoring, priority-ranked triggers, rich responses
// ──────────────────────────────────────────────────────────────

interface KBTrigger {
  /** Primary keywords (high weight) */
  keywords: string[];
  /** Secondary / contextual keywords (lower weight, helps disambiguation) */
  related?: string[];
  /** The response text */
  response: string;
  /** Higher priority wins when multiple triggers match */
  priority?: number;
}

const knowledgeBase: KBTrigger[] = [
  // ═══════════════════ PRICING & COST FAQ ═══════════════════

  {
    keywords: ["website cost", "website price", "how much website", "website pricing", "price for website", "website budget", "website quote", "cost of a website"],
    related: ["website", "cost", "price", "how much", "quote", "budget"],
    response:
      "Website pricing depends on a few factors:\n\n• Number of pages & complexity\n• Admin panel / CMS requirements\n• Custom forms, integrations, or e-commerce\n• SEO & performance optimization\n\nEvery project is scoped individually based on your needs — we'll give you a clear, honest estimate during a free consultation.\n\nWant me to connect you for a personalized quote?",
    priority: 10,
  },
  {
    keywords: ["app cost", "app price", "how much app", "app pricing", "mobile app cost", "flutter cost", "android cost", "ios cost", "app budget", "app quote"],
    related: ["app", "mobile", "flutter", "android", "ios", "cost", "price"],
    response:
      "Mobile app pricing varies based on:\n\n• Number of screens & user flows\n• Backend complexity (auth, database, APIs)\n• Platform — Android, iOS, or both (Flutter)\n• Push notifications, payments, maps, etc.\n\nWe tailor pricing to your exact scope — no generic packages. Share your idea and we'll give you a realistic, no-obligation estimate.\n\nWould you like to describe your app concept?",
    priority: 10,
  },
  {
    keywords: ["ai cost", "automation cost", "chatbot cost", "bot cost", "ai pricing"],
    related: ["ai", "automation", "chatbot", "bot", "cost", "price"],
    response:
      "AI automation pricing depends on the use case:\n\n• Inquiry chatbots & lead capture bots\n• Workflow automation (email, data, reports)\n• Advanced AI with custom models & integrations\n\nWe optimize for low recurring costs using efficient API usage. Every AI project is scoped based on complexity.\n\nWant to describe your automation need so we can scope it?",
    priority: 10,
  },
  {
    keywords: ["maintenance cost", "running cost", "monthly cost", "server cost", "hosting cost", "recurring cost", "ongoing cost"],
    related: ["maintenance", "expensive", "server", "hosting", "recurring", "ongoing", "monthly"],
    response:
      "We specifically architect for low recurring costs:\n\n✔ Free-tier cloud hosting where suitable\n✔ Serverless functions to avoid idle server charges\n✔ Optimized database queries & caching\n✔ 6 months complimentary support included\n\nMost of our delivered projects run on near-zero monthly infrastructure costs.\n\nWant me to explain our cost-optimization approach for your specific case?",
    priority: 8,
  },
  {
    keywords: ["payment", "payment terms", "installment", "pay later", "emi", "advance payment", "how to pay"],
    related: ["payment", "pay", "installment", "advance"],
    response:
      "We keep payments simple and fair:\n\n• 30–40% advance to start development\n• Remaining on milestone delivery or project completion\n• No hidden charges — everything is discussed upfront\n\nFor larger projects, we can discuss milestone-based payment plans.\n\nWould you like to discuss a project?",
    priority: 7,
  },
  {
    keywords: ["cheapest", "lowest price", "minimum cost", "free", "no budget", "very low budget"],
    related: ["cheap", "free", "low", "budget", "afford"],
    response:
      "We understand budget constraints — especially for startups and small businesses.\n\nOur approach:\n• Start with a lean MVP (only must-have features)\n• Use free-tier infrastructure aggressively\n• Scale features as your business grows\n\nEven with limited budgets, we've delivered functional, professional solutions. Let's discuss what's possible within your range — no judgment here.\n\nWant to share your budget range?",
    priority: 9,
  },

  // ═══════════════════ CAPABILITY FAQ ═══════════════════

  {
    keywords: ["inventory", "stock management", "warehouse", "inventory system", "product management"],
    related: ["inventory", "stock", "warehouse", "product", "manage"],
    response:
      "Yes — inventory and stock management systems are one of our specialties.\n\nWe've built systems with:\n• Real-time stock tracking\n• Multi-location inventory\n• Low-stock alerts & reorder flows\n• Barcode/QR scanning integration\n• Role-based access for staff\n\nOur Car Guru project is a live example. Would you like a free consultation to discuss your inventory needs?",
    priority: 8,
  },
  {
    keywords: ["crm", "customer management", "lead management", "sales pipeline", "client management"],
    related: ["crm", "customer", "lead", "sales", "client", "pipeline"],
    response:
      "We build custom CRM solutions tailored to your actual sales process — not generic off-the-shelf tools.\n\nFeatures we can include:\n• Lead capture & tracking\n• Follow-up reminders\n• Pipeline visualization\n• WhatsApp/email integration\n• Analytics dashboards\n\nShall we discuss your specific workflow?",
    priority: 8,
  },
  {
    keywords: ["erp", "business software", "management system", "operations", "workflow system"],
    related: ["erp", "business", "management", "operations", "workflow"],
    response:
      "We build focused business management systems that cover exactly what you need — without the bloat of traditional ERP.\n\nCommon modules we've built:\n• Order management\n• Invoice & billing\n• Employee/task tracking\n• Reporting dashboards\n• Custom workflow automation\n\nWant to tell me about your business operations? I'll suggest what makes sense.",
    priority: 7,
  },
  {
    keywords: ["ecommerce", "online store", "shop", "shopping cart", "sell online", "marketplace"],
    related: ["ecommerce", "store", "shop", "cart", "sell", "marketplace", "products"],
    response:
      "We can build custom e-commerce solutions or set up optimized platforms:\n\n• Custom-built stores with payment integration\n• Product catalog with search & filters\n• Shopping cart, checkout & order tracking\n• Admin panel for inventory and orders\n• SEO-optimized product pages\n\nWhat type of products are you looking to sell? That'll help me suggest the best approach.",
    priority: 8,
  },
  {
    keywords: ["ai", "artificial intelligence", "machine learning", "openai", "gemini", "gpt", "chatgpt", "llm"],
    related: ["ai", "automation", "machine", "learning", "intelligence", "model"],
    response:
      "AI & intelligent automation is one of our core strengths. We build:\n\n• Smart chatbots (like this one!) for lead capture\n• Document analysis & summarization\n• Workflow automation with AI decision-making\n• Custom AI integrations (OpenAI, Gemini, etc.)\n• Computer vision solutions\n\nAI doesn't have to be expensive — we design cost-efficient AI that runs on optimized API calls.\n\nWhat problem are you trying to solve with AI?",
    priority: 9,
  },
  {
    keywords: ["automation", "automate", "automated", "workflow automation", "process automation"],
    related: ["automation", "automate", "process", "workflow", "manual"],
    response:
      "We help businesses eliminate repetitive manual work through smart automation:\n\n• Auto-generate reports from data\n• Email/WhatsApp notification flows\n• Data entry automation\n• Scheduled task runners\n• API integrations between your existing tools\n\nWhat manual process is eating up your time? Let's see if we can automate it.",
    priority: 7,
  },
  {
    keywords: ["computer vision", "image recognition", "object detection", "ocr", "visual ai"],
    related: ["vision", "image", "recognition", "detection", "camera", "ocr", "visual"],
    response:
      "Yes, computer vision is part of our engineering capability:\n\n• Object detection & classification\n• OCR (document text extraction)\n• Quality inspection automation\n• Custom image analysis pipelines\n• Real-time video processing\n\nWhat's your use case? I can help assess technical feasibility.",
    priority: 8,
  },
  {
    keywords: ["flutter", "cross platform", "android ios", "both platforms", "single codebase"],
    related: ["flutter", "cross", "platform", "android", "ios", "dart"],
    response:
      "Flutter is our primary mobile development framework — and for good reason:\n\n✔ Single codebase for Android & iOS\n✔ Native-quality performance\n✔ Beautiful, custom UI designs\n✔ Faster development = lower cost\n✔ Easy to maintain & update\n\nWe've delivered multiple Flutter apps including the Car Guru inventory system.\n\nWant to discuss your mobile app idea?",
    priority: 8,
  },
  {
    keywords: ["next.js", "nextjs", "react", "frontend", "web app", "web application", "dashboard"],
    related: ["next", "react", "frontend", "web", "dashboard", "application"],
    response:
      "We build modern web applications using Next.js and React:\n\n• Server-side rendering for SEO\n• Fast, responsive user interfaces\n• Admin dashboards & portals\n• API integrations\n• Real-time data displays\n\nPerfect for business dashboards, customer portals, and data-heavy applications.\n\nWhat kind of web application are you thinking about?",
    priority: 7,
  },
  {
    keywords: ["seo", "google ranking", "search engine", "organic traffic", "rank higher"],
    related: ["seo", "google", "ranking", "search", "organic", "traffic"],
    response:
      "SEO is built into every website we develop — not treated as an afterthought:\n\n✔ Semantic HTML & structured data\n✔ Core Web Vitals optimization\n✔ Meta tags, OG images, sitemap\n✔ Mobile-first responsive design\n✔ Fast loading speeds\n\nWe build websites that are ready to rank from day one.\n\nWant to discuss your website project with SEO in mind?",
    priority: 7,
  },

  // ═══════════════════ PROCESS & TRUST FAQ ═══════════════════

  {
    keywords: ["who are you", "about noryant", "about you", "your company", "your team", "what is noryant"],
    related: ["company", "freelancer", "agency", "who", "noryant", "team"],
    response:
      "Noryant is a dedicated software development studio focused on practical digital solutions for growing businesses.\n\n🔹 We're not freelancers — we're a committed team\n🔹 End-to-end development (design → deploy → support)\n🔹 Every project gets dedicated attention\n🔹 We prioritize long-term relationships over one-off deals\n\nWe've delivered 7+ custom projects across mobile apps, web platforms, AI systems, and business software.\n\nAnything specific you'd like to know about us?",
    priority: 9,
  },
  {
    keywords: ["support", "help after", "post launch", "after delivery", "bug fix", "maintenance support"],
    related: ["support", "help", "launch", "delivery", "bug", "fix", "maintenance"],
    response:
      "Every project we deliver includes 6 months of complimentary technical support:\n\n✔ Bug fixes & critical patches\n✔ Minor UI corrections\n✔ Technical guidance & troubleshooting\n✔ Performance monitoring advice\n\nAfter the 6-month period, we offer affordable ongoing maintenance plans if needed.\n\nYou'll never be left without support after launch.",
    priority: 8,
  },
  {
    keywords: ["how long", "timeline", "duration", "delivery time", "how fast", "when ready", "turnaround"],
    related: ["time", "long", "timeline", "duration", "fast", "when", "weeks", "months"],
    response:
      "Typical delivery timelines:\n\n📄 Landing pages / simple sites → 1–2 weeks\n🌐 Business websites → 2–4 weeks\n📱 Mobile apps (MVP) → 4–8 weeks\n⚙️ Business software → 6–12 weeks\n🤖 AI integrations → 2–6 weeks\n\nWe always share a clear timeline before development starts — no surprises.\n\nWant a timeline estimate for your specific project?",
    priority: 8,
  },
  {
    keywords: ["process", "how do you work", "development process", "steps", "workflow", "how it works"],
    related: ["process", "work", "steps", "workflow", "how", "start"],
    response:
      "Our development process is straightforward:\n\n1️⃣ Free Consultation — Understand your requirement\n2️⃣ Proposal & Roadmap — Clear scope, timeline, pricing\n3️⃣ Design & Development — Regular progress updates\n4️⃣ Testing & Review — You review before launch\n5️⃣ Deployment — We handle the technical setup\n6️⃣ Support — 6 months complimentary support\n\nNo jargon, no unnecessary complexity. We keep it practical.\n\nReady to start with a free consultation?",
    priority: 9,
  },
  {
    keywords: ["portfolio", "previous work", "past projects", "examples", "case study", "show work"],
    related: ["portfolio", "previous", "past", "projects", "examples", "work", "show"],
    response:
      "You can explore our delivered projects on the Projects page. Here are some highlights:\n\n🚗 Car Guru — Flutter inventory management app for a car dealership\n📚 AI ki School — AI-powered educational learning platform\n📝 CET Prep Platform — Exam simulation system for students\n🎂 Cake Business — Professional digital presence for a small business\n\nEach project was custom-built around the client's actual workflow.\n\nVisit /projects for full case studies, or tell me about your project idea!",
    priority: 8,
  },
  {
    keywords: ["tech stack", "technologies", "what tools", "frameworks", "languages", "stack"],
    related: ["tech", "stack", "tools", "frameworks", "languages", "technology"],
    response:
      "Our primary tech stack:\n\n🌐 Web: Next.js, React, TypeScript, Tailwind\n📱 Mobile: Flutter (Android + iOS)\n⚙️ Backend: Node.js, Python, Firebase\n🤖 AI: OpenAI, Gemini, LangChain, Custom ML\n☁️ Cloud: Vercel, Firebase, AWS (free-tier optimized)\n🗄️ Database: PostgreSQL, MongoDB, Firestore\n\nWe pick the right tools for your project — not the trendiest ones.\n\nHave a specific tech question?",
    priority: 7,
  },
  {
    keywords: ["contract", "agreement", "nda", "legal", "terms"],
    related: ["contract", "agreement", "nda", "legal", "terms", "sign"],
    response:
      "Yes, we provide clear project agreements that cover:\n\n• Scope of work & deliverables\n• Timeline & milestones\n• Payment terms\n• Ownership & IP transfer\n• Support terms\n\nWe can also sign NDAs for sensitive projects. Everything is transparent and straightforward.\n\nWant to discuss your project requirements?",
    priority: 6,
  },
  {
    keywords: ["revision", "changes", "modify", "update after", "edit after", "not happy"],
    related: ["revision", "change", "modify", "update", "edit", "happy", "satisfied"],
    response:
      "We include revision rounds in every project:\n\n✔ Regular check-ins during development\n✔ You review and provide feedback at each milestone\n✔ Reasonable revisions included in project scope\n✔ Post-launch modifications covered under 6-month support\n\nWe want you to be 100% satisfied with the final product.\n\nWant to start a conversation about your project?",
    priority: 7,
  },
  {
    keywords: ["location", "where are you", "based in", "office", "city", "country", "india"],
    related: ["location", "where", "based", "office", "city", "india"],
    response:
      "We're based in India and work with clients both locally and internationally.\n\nAll communication happens digitally — via WhatsApp, email, and video calls — so location is never a barrier.\n\nWe've served clients across different cities and industries with seamless remote collaboration.",
    priority: 5,
  },

  // ═══════════════════ OBJECTION HANDLING ═══════════════════

  {
    keywords: ["too expensive", "can't afford", "over budget", "budget too low", "don't have money", "costly"],
    related: ["expensive", "afford", "budget", "money", "costly", "pricey"],
    response:
      "We completely understand budget concerns — it's actually why Noryant exists.\n\nOur approach for tight budgets:\n✔ Start with a lean MVP — only must-have features\n✔ Use free-tier infrastructure aggressively\n✔ Phase development — launch fast, enhance later\n✔ No unnecessary recurring costs\n\nWe've helped businesses launch with very limited budgets by focusing only on what matters.\n\nWant to discuss a lean approach that fits your budget?",
    priority: 9,
  },
  {
    keywords: ["just checking", "looking around", "comparing", "not sure yet", "window shopping", "browsing"],
    related: ["checking", "looking", "comparing", "sure", "browse", "explore"],
    response:
      "That's completely fine! No pressure at all.\n\nEven while you're exploring, we can offer:\n✔ A free technical roadmap for your idea\n✔ Realistic cost range so you can compare fairly\n✔ Honest advice — even if we're not the right fit\n\nWe'd rather build trust than rush a sale.\n\nWant a no-obligation consultation to help with your research?",
    priority: 7,
  },
  {
    keywords: ["discuss with partner", "talk to my boss", "team decision", "need to think", "get back to you", "decide later"],
    related: ["discuss", "partner", "boss", "team", "think", "decide", "later"],
    response:
      "Of course — take your time! Important decisions deserve proper thought.\n\nI can help you prepare:\n✔ Share a quick summary on WhatsApp/email\n✔ Include rough pricing for your team to review\n✔ No follow-up spam — just one helpful message\n\nWant me to send a summary to share with your team?",
    priority: 7,
  },
  {
    keywords: ["don't want to share", "no details", "not comfortable", "privacy", "no number", "no email", "don't trust"],
    related: ["share", "comfortable", "privacy", "trust", "personal", "details"],
    response:
      "Totally understood — your privacy matters.\n\nYou can continue chatting here without sharing any personal details. I can answer questions about:\n• Our services & capabilities\n• Rough pricing estimates\n• Development process\n• Technology recommendations\n\nWhen you're ready to take the next step, we're here.",
    priority: 8,
  },
  {
    keywords: ["bad experience", "scammed", "previous developer", "burnt", "failed project", "unfinished"],
    related: ["bad", "experience", "scammed", "developer", "failed", "unfinished", "previous"],
    response:
      "I'm sorry to hear that — unfortunately, it's a common pain point in this industry.\n\nHere's how Noryant is different:\n✔ Transparent, milestone-based development\n✔ Regular progress updates — you see what's being built\n✔ Clear agreements with defined deliverables\n✔ 6 months post-launch support guarantee\n✔ Full source code ownership transferred to you\n\nWe earn trust through delivery, not just promises.\n\nWant to discuss your situation? Maybe we can help complete or fix what was left unfinished.",
    priority: 9,
  },
  {
    keywords: ["why not wordpress", "why not wix", "why not shopify", "template", "no code", "drag and drop"],
    related: ["wordpress", "wix", "shopify", "template", "nocode", "drag"],
    response:
      "Great question! Templates and no-code tools work for simple needs, but custom development gives you:\n\n✔ Exact features for your workflow (no workarounds)\n✔ Better performance & SEO\n✔ No monthly platform fees eating into profits\n✔ Full ownership — no vendor lock-in\n✔ Scales with your business without breaking\n\nWe actually recommend templates when they're genuinely the better fit. Honest advice is part of our process.\n\nWant help deciding what's right for your case?",
    priority: 8,
  },

  // ═══════════════════ SMALL TALK & MISC ═══════════════════

  {
    keywords: ["hello", "hi", "hey", "good morning", "good evening", "good afternoon"],
    related: ["hello", "hi", "hey", "morning", "evening", "afternoon"],
    response:
      "Hey there! 👋 Welcome to Noryant.\n\nI can help you with:\n• Project estimates & pricing\n• Understanding our services\n• Technical consultation\n• Connecting you with our team\n\nWhat would you like to explore?",
    priority: 3,
  },
  {
    keywords: ["thank you", "thanks", "appreciated", "helpful", "great help"],
    related: ["thank", "thanks", "appreciate", "helpful", "great"],
    response:
      "You're welcome! Happy to help. 😊\n\nIf you have more questions later, feel free to come back anytime. We're always here.\n\nAnything else I can assist with right now?",
    priority: 3,
  },
  {
    keywords: ["bye", "goodbye", "see you", "talk later", "that's all", "nothing else"],
    related: ["bye", "goodbye", "later", "all", "nothing", "done"],
    response:
      "Thanks for chatting with us! 👋\n\nWhenever you're ready to start a project or just have more questions, we're right here.\n\n📧 hello@noryant.com\n📱 WhatsApp: wa.me/919999999999\n\nHave a great day!",
    priority: 3,
  },
  {
    keywords: ["human", "real person", "speak to someone", "actual person", "not a bot", "agent"],
    related: ["human", "person", "someone", "agent", "real", "bot"],
    response:
      "Of course! Our team is happy to connect directly.\n\nYou can:\n📱 WhatsApp us: wa.me/919999999999\n📧 Email: hello@noryant.com\n\nOr share your name and number here, and we'll reach out within a few hours.\n\nWhat works best for you?",
    priority: 8,
  },
];

// ──────────────────────────────────────────────────────────────
// Fuzzy scoring engine — matches even with typos / partial input
// ──────────────────────────────────────────────────────────────

const normalizeText = (text: string): string =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const wordIntersection = (words: string[], text: string): number => {
  let score = 0;
  for (const word of words) {
    if (text.includes(word)) {
      score += word.length >= 4 ? 2 : 1; // Longer words = stronger signal
    }
  }
  return score;
};

export const answerUserQuestion = (query: string): string | null => {
  const normalized = normalizeText(query);
  if (normalized.length < 2) return null;

  const queryWords = normalized.split(" ");

  let bestMatch: { response: string; score: number } | null = null;

  for (const trigger of knowledgeBase) {
    let score = 0;

    // Primary keyword matching (high weight)
    for (const keyword of trigger.keywords) {
      const normalizedKeyword = normalizeText(keyword);
      if (normalized.includes(normalizedKeyword)) {
        score += 10 + normalizedKeyword.length; // Exact phrase match = highest score
      } else {
        // Word-level partial match
        const keywordWords = normalizedKeyword.split(" ");
        const overlap = wordIntersection(keywordWords, normalized);
        if (overlap >= keywordWords.length * 0.6) {
          score += 5 + overlap;
        }
      }
    }

    // Secondary keyword matching (lower weight)
    if (trigger.related) {
      const relatedScore = wordIntersection(trigger.related, normalized);
      score += relatedScore * 0.5;
    }

    // Priority boost
    score += (trigger.priority || 5) * 0.3;

    // Only consider if meaningful match
    if (score > 5 && (!bestMatch || score > bestMatch.score)) {
      bestMatch = { response: trigger.response, score };
    }
  }

  return bestMatch?.response || null;
};
