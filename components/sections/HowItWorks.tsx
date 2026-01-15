"use client"

import {
  UserPlus,
  Clock,
  CheckCircle,
  BarChart3,
  type LucideIcon,
} from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
  "user-plus": UserPlus,
  clock: Clock,
  "check-circle": CheckCircle,
  "bar-chart": BarChart3,
}

interface Step {
  _id?: string
  stepNumber: number
  title: string
  description: string
  icon: string
}

interface HowItWorksProps {
  title?: string
  steps?: Step[]
}

export function HowItWorks({
  title = "How It Works",
  steps = [
    {
      stepNumber: 1,
      title: "Create Your Team",
      description: "Set up your workspace in minutes. Invite team members and organize them into projects.",
      icon: "user-plus",
    },
    {
      stepNumber: 2,
      title: "Track Time",
      description: "Team members log their hours with just one click. It really is that simple.",
      icon: "clock",
    },
    {
      stepNumber: 3,
      title: "Review & Approve",
      description: "Managers review submissions and approve with a single click. No paperwork needed.",
      icon: "check-circle",
    },
    {
      stepNumber: 4,
      title: "Analyze & Export",
      description: "Generate reports, analyze trends, and export data for payroll or invoicing.",
      icon: "bar-chart",
    },
  ],
}: HowItWorksProps) {
  return (
    <section id="how-it-works" className="relative py-24 bg-[var(--bg-inset)]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(var(--fg-default) 1px, transparent 1px)`,
        backgroundSize: "24px 24px",
      }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--fg-default)] mb-4">
            {title}
          </h2>
          <p className="text-lg text-[var(--fg-muted)]">
            Get up and running in four simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting Line - Desktop */}
          <div className="hidden lg:block absolute top-24 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-[var(--accent-emphasis)] via-[var(--accent-emphasis)] to-[var(--accent-emphasis)] opacity-20" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(steps || []).map((step, index) => {
              const IconComponent = iconMap[step.icon] || Clock
              return (
                <div
                  key={step._id || index}
                  className="relative text-center group"
                >
                  {/* Step Number & Icon */}
                  <div className="relative inline-flex flex-col items-center mb-6">
                    {/* Number Badge */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[var(--accent-emphasis)] flex items-center justify-center text-xs font-bold text-white z-10">
                      {step.stepNumber}
                    </div>
                    {/* Icon Container */}
                    <div className="w-20 h-20 rounded-2xl bg-[var(--bg-canvas)] border border-[var(--border-default)] flex items-center justify-center group-hover:border-[var(--accent-emphasis)]/50 group-hover:shadow-lg group-hover:shadow-[var(--accent-emphasis)]/10 transition-all duration-300">
                      <IconComponent className="w-8 h-8 text-[var(--accent-fg)]" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-[var(--fg-default)] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[var(--fg-muted)] leading-relaxed max-w-xs mx-auto">
                    {step.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
