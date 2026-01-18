"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

interface CTAProps {
  title?: string
  description?: string
  buttonText?: string
  buttonLink?: string
}

export function CTA({
  title = "Ready to Transform Your Time Tracking?",
  description = "Join thousands of teams who have already made the switch. Start your free trial today and see the difference.",
  buttonText = "Start Free Trial",
  buttonLink = "#",
}: CTAProps) {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-emphasis)] via-[var(--accent-emphasis)] to-purple-600">
        {/* Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-[128px] opacity-20" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400 rounded-full blur-[128px] opacity-30" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm mb-8">
          <Sparkles className="w-8 h-8 text-white" />
        </div>

        {/* Content */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
          {title}
        </h2>
        <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10">
          {description}
        </p>

        {/* CTA Button */}
        <Link href={buttonLink || "#"}>
          <Button
            size="lg"
            className="bg-white text-[var(--accent-emphasis)] hover:bg-white/90 px-8 py-6 text-lg font-semibold group"
          >
            {buttonText}
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>

      </div>
    </section>
  )
}
