import { Link } from "react-router-dom";
import {
  FileText,
  MessageCircle,
  Shield,
  Zap,
  BarChart3,
  Brain,
} from "lucide-react";
import "../Styles/Home.css";
import NavBar from "../components/NavBar";

const features = [
  {
    title: "Smart Organization",
    desc: "Auto-categorize documents into Medical, Finance, Study, and more.",
    icon: FileText,
  },
  {
    title: "AI Chat Assistant",
    desc: "Ask questions and get instant answers from your documents.",
    icon: MessageCircle,
  },
  {
    title: "Quiz Generator",
    desc: "Create practice quizzes from your study materials automatically.",
    icon: Brain,
  },
  {
    title: "Secure Storage",
    desc: "Bank-level encryption for all your sensitive documents.",
    icon: Shield,
  },
  {
    title: "Fast Search",
    desc: "Find any document in seconds with powerful AI search.",
    icon: Zap,
  },
  {
    title: "Analytics",
    desc: "Track document usage and study patterns with insights.",
    icon: BarChart3,
  },
];

export default function Home() {
  return (
    
    <div className="home-root min-h-screen bg-[--page-bg] flex flex-col">
      {/* hero */}
      <main className="flex-1">
        <section className="max-w-6xl mx-auto py-14 px-4 md:px-0 text-center hero-area">
          <h1 className="hero-title">
            Your Intelligent <span className="accent">Document</span>
            <br />
            Management System
          </h1>
          <p className="hero-sub">
            Upload, organize, and interact with your documents using AI. Get
            instant summaries, generate quizzes, and chat with your data.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3 hero-cta-row">
            <button className="primary-btn">Start Free Trial</button>
            <button className="secondary-btn">Watch Demo</button>
          </div>
        </section>
        <br />

        {/* feature cards */}
        <section className="max-w-6xl mx-auto px-4 md:px-0 pb-16 features-grid">
          {features.map(({ title, desc, icon: Icon }) => (
            <article
              key={title}
              className="feature-card group"
            >
              <div className="feature-head">
                <div className="feature-bubble">
                  <Icon className="feature-icon" />
                </div>
                <h3 className="feature-title">{title}</h3>
              </div>

              <p className="feature-desc">{desc}</p>
            </article>
          ))}
        </section>
          <br />
        {/* CTA strip */}
        <section className="pb-16 px-4 md:px-0">
          <div className="max-w-3xl mx-auto cta-strip">
            <h2 className="cta-title">Ready to Transform Your Documents?</h2>
            <p className="cta-sub">Join thousands of users who are managing their documents smarter with AI.</p>
            <Link to="/signup" className="cta-action">Get Started Now</Link>
          </div>
        </section>
      </main>
    </div>
  );
}
