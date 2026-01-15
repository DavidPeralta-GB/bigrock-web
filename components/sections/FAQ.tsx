"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface FAQItem {
  _id?: string
  question: string
  answer: string
  category?: string
}

interface FAQProps {
  title?: string
  faqs?: FAQItem[]
}

export function FAQ({
  title = "Frequently Asked Questions",
  faqs = [
    {
      question: "How does the free trial work?",
      answer: "You get full access to all Professional features for 14 days. No credit card required. At the end of your trial, you can choose a plan that fits your needs or continue with our free Starter tier.",
    },
    {
      question: "Can I change plans later?",
      answer: "Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing adjustments.",
    },
    {
      question: "Is my data secure?",
      answer: "Security is our top priority. We use bank-level AES-256 encryption, are SOC 2 certified, and fully compliant with GDPR and HIPAA regulations. Your data is backed up across multiple geographic locations.",
    },
    {
      question: "Do you offer integrations?",
      answer: "Yes! We integrate with popular tools including Slack, Microsoft Teams, Jira, Asana, QuickBooks, and many more. Our API also allows you to build custom integrations.",
    },
    {
      question: "What kind of support do you offer?",
      answer: "All plans include email support. Professional and Enterprise plans include priority support with faster response times. Enterprise customers also get a dedicated account manager.",
    },
  ],
}: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="relative py-24 bg-[var(--bg-canvas)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--fg-default)] mb-4">
            {title}
          </h2>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {(faqs || []).map((faq, index) => (
            <div
              key={faq._id || index}
              className="border border-[var(--border-default)] rounded-lg overflow-hidden bg-[var(--bg-inset)]"
            >
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-[var(--bg-canvas)]/50 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-medium text-[var(--fg-default)]">
                  {faq.question}
                </span>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 text-[var(--fg-muted)] flex-shrink-0 transition-transform duration-200",
                    openIndex === index && "rotate-180"
                  )}
                />
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-200",
                  openIndex === index ? "max-h-96" : "max-h-0"
                )}
              >
                <div className="px-6 pb-4 text-[var(--fg-muted)] leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
