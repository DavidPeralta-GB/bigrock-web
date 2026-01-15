"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
  Clock,
  Users,
  BarChart3,
  Shield,
  Smartphone,
  Zap,
  type LucideIcon,
} from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
  clock: Clock,
  users: Users,
  "bar-chart": BarChart3,
  shield: Shield,
  smartphone: Smartphone,
  zap: Zap,
}

interface Feature {
  _id?: string
  title: string
  description: string
  icon: string
}

interface FeaturesProps {
  title?: string
  subtitle?: string
  features?: Feature[]
}

export function Features({
  title = "Everything You Need",
  subtitle = "Powerful features that make time tracking effortless for teams of all sizes.",
  features = [
    {
      title: "One-Click Time Entry",
      description: "Log hours instantly with our streamlined interface. No more hunting through menus.",
      icon: "clock",
    },
    {
      title: "Team Management",
      description: "Organize teams, set permissions, and manage approvals all in one place.",
      icon: "users",
    },
    {
      title: "Real-Time Analytics",
      description: "Get instant insights into team productivity with beautiful dashboards.",
      icon: "bar-chart",
    },
    {
      title: "Enterprise Security",
      description: "Bank-level encryption and compliance with SOC 2, GDPR, and HIPAA.",
      icon: "shield",
    },
    {
      title: "Mobile Ready",
      description: "Track time on the go with our native iOS and Android apps.",
      icon: "smartphone",
    },
    {
      title: "Lightning Fast",
      description: "Built for speed. No lag, no waiting. Just pure productivity.",
      icon: "zap",
    },
  ],
}: FeaturesProps) {
  return (
    <section id="features" className="relative py-24 bg-[var(--bg-canvas)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--fg-default)] mb-4">
            {title}
          </h2>
          <p className="text-lg text-[var(--fg-muted)] max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(features || []).map((feature, index) => {
            const IconComponent = iconMap[feature.icon] || Clock
            return (
              <Card
                key={feature._id || index}
                className="group relative overflow-hidden bg-[var(--bg-inset)] border-[var(--border-default)] hover:border-[var(--accent-emphasis)]/50 transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-6">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-lg bg-[var(--accent-subtle)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-6 h-6 text-[var(--accent-fg)]" />
                  </div>
                  {/* Content */}
                  <h3 className="text-lg font-semibold text-[var(--fg-default)] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-[var(--fg-muted)] text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
                {/* Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-emphasis)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
