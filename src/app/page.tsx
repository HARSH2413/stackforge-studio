import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import WhyUs from "@/components/WhyUs";
import HomepageServices from "@/components/HomepageServices";
import Projects from "../components/Projects";
import Testimonials from "@/components/Testimonials";
import HomepageCTA from "@/components/HomepageCTA";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://noryant.com/#organization",
      name: "Noryant",
      url: "https://noryant.com",
      logo: "https://noryant.com/favicon.ico",
      description: "A growing software development studio building affordable, scalable, and low-maintenance digital solutions for businesses ready to grow.",
      contactPoint: { "@type": "ContactPoint", contactType: "customer service", email: "hello@noryant.com", availableLanguage: "English" },
      sameAs: ["https://www.linkedin.com/company/noryant"],
    },
    {
      "@type": "WebSite",
      "@id": "https://noryant.com/#website",
      url: "https://noryant.com",
      name: "Noryant",
      publisher: { "@id": "https://noryant.com/#organization" },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "What services does Noryant offer?", acceptedAnswer: { "@type": "Answer", text: "Custom website development, Flutter mobile apps, AI automation, computer vision engineering, business software systems, and startup MVP development." } },
        { "@type": "Question", name: "How is Noryant different?", acceptedAnswer: { "@type": "Answer", text: "We focus on cost-optimized, lean software development. We use free-tier infrastructure where possible and build only what your business needs." } },
      ],
    },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <WhyUs />
        <HomepageServices />
        <Projects />
        <Testimonials />
        <HomepageCTA />
      </main>
      <Footer />
    </>
  );
}
