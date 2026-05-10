import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import WhyUs from "@/components/WhyUs";
import HomepageServices from "@/components/HomepageServices";
import Testimonials from "@/components/Testimonials";
import HomepageCTA from "@/components/HomepageCTA";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://stackforge.studio/#organization",
      name: "Stackforge Studio",
      url: "https://stackforge.studio",
      logo: "https://stackforge.studio/favicon.ico",
      description: "A growing software development studio building affordable, scalable, and low-maintenance digital solutions for businesses ready to grow.",
      contactPoint: { "@type": "ContactPoint", contactType: "customer service", availableLanguage: "English" },
      sameAs: ["https://linkedin.com/company/stackforge"],
    },
    {
      "@type": "WebSite",
      "@id": "https://stackforge.studio/#website",
      url: "https://stackforge.studio",
      name: "Stackforge Studio",
      publisher: { "@id": "https://stackforge.studio/#organization" },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "What services does Stackforge Studio offer?", acceptedAnswer: { "@type": "Answer", text: "Custom website development, Flutter mobile apps, AI automation, computer vision engineering, business software systems, and startup MVP development." } },
        { "@type": "Question", name: "How is Stackforge Studio different?", acceptedAnswer: { "@type": "Answer", text: "We focus on cost-optimized, lean software development. We use free-tier infrastructure where possible and build only what your business needs." } },
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
        <Testimonials />
        <HomepageCTA />
      </main>
      <Footer />
    </>
  );
}
