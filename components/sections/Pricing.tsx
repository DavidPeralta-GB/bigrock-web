"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface PricingTier {
  _id?: string
  name: string
  price: string
  description: string
  features: string[]
  ctaText: string
  ctaLink?: string
  isPopular?: boolean
}

interface PricingProps {
  title?: string
  subtitle?: string
  tiers?: PricingTier[]
}

export function Pricing({
  title = "Simple, Transparent Pricing",
  subtitle = "No hidden fees. No surprises. Choose the plan that fits your team.",
  tiers = [
    {
      name: "Starter",
      price: "$9",
      description: "Perfect for small teams getting started",
      features: [
        "Up to 10 users",
        "Basic time tracking",
        "Weekly reports",
        "Email support",
      ],
      ctaText: "Start Free Trial",
    },
    {
      name: "Professional",
      price: "$29",
      description: "For growing teams that need more power",
      features: [
        "Up to 50 users",
        "Advanced analytics",
        "Custom reports",
        "Priority support",
        "API access",
        "Integrations",
      ],
      ctaText: "Start Free Trial",
      isPopular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations with custom needs",
      features: [
        "Unlimited users",
        "Dedicated account manager",
        "Custom integrations",
        "SLA guarantee",
        "On-premise option",
        "Advanced security",
      ],
      ctaText: "Contact Sales",
    },
  ],
}: PricingProps) {
  return (
    <section id="pricing" className="relative py-24 bg-[var(--bg-canvas)]">
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

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {(tiers || []).map((tier, index) => (
            <Card
              key={tier._id || index}
              className={cn(
                "relative overflow-hidden transition-all duration-300 hover:-translate-y-1",
                tier.isPopular
                  ? "bg-[var(--bg-inset)] border-[var(--accent-emphasis)] shadow-lg shadow-[var(--accent-emphasis)]/10"
                  : "bg-[var(--bg-inset)] border-[var(--border-default)]"
              )}
            >
              {/* Popular Badge */}
              {tier.isPopular && (
                <div className="absolute top-0 right-0 bg-[var(--accent-emphasis)] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  POPULAR
                </div>
              )}

              <CardHeader className="text-center pb-2">
                <h3 className="text-xl font-semibold text-[var(--fg-default)]">
                  {tier.name}
                </h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-[var(--fg-default)]">
                    {tier.price}
                  </span>
                  {tier.price !== "Custom" && (
                    <span className="text-[var(--fg-muted)]">/month</span>
                  )}
                </div>
                <p className="mt-2 text-sm text-[var(--fg-muted)]">
                  {tier.description}
                </p>
              </CardHeader>

              <CardContent className="pt-4">
                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  {(tier.features || []).map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-[var(--fg-muted)]">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  className="w-full"
                  variant={tier.isPopular ? "default" : "secondary"}
                >
                  {tier.ctaText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
