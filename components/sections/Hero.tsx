"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

interface HeroProps {
  headline?: string
  subheadline?: string
  ctaPrimary?: { text: string; link: string }
  ctaSecondary?: { text: string; link: string }
  stats?: { value: string; label: string }[]
}

export function Hero({
  headline = "The Timesheet App Your Team Will Actually Use",
  subheadline = "Stop wrestling with spreadsheets. Track time, manage approvals, and streamline your entire workforce with our intuitive, professional solution.",
  ctaPrimary = { text: "Start Free Trial", link: "#" },
  ctaSecondary = { text: "Watch Demo", link: "#" },
  stats = [
    { value: "500+", label: "Companies" },
    { value: "10K+", label: "Active Users" },
    { value: "99.9%", label: "Uptime" },
  ],
}: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[var(--bg-canvas)]">
        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(var(--fg-default) 1px, transparent 1px),
                              linear-gradient(90deg, var(--fg-default) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--accent-emphasis)] rounded-full blur-[128px] opacity-20" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-[128px] opacity-10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-400/20 mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm font-medium text-blue-400">
            Now with AI-powered time suggestions
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-[var(--fg-default)] mb-6 leading-tight animate-slide-up">
          <span className="bg-gradient-to-r from-white via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            {headline}
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-[var(--fg-muted)] max-w-2xl mx-auto mb-10 animate-slide-up animation-delay-100">
          {subheadline}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up animation-delay-200">
          <Button size="lg" className="group px-8">
            {ctaPrimary.text}
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="secondary" size="lg" className="group px-8">
            <Play className="mr-2 w-4 h-4" />
            {ctaSecondary.text}
          </Button>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 animate-fade-in animation-delay-300">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-[var(--fg-default)] mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-[var(--fg-muted)]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--bg-canvas)] to-transparent" />
    </section>
  )
}
