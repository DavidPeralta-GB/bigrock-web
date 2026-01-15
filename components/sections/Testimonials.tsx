"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

interface Testimonial {
  _id?: string
  quote: string
  author: string
  role: string
  company: string
  avatar?: { asset?: { url?: string } }
}

interface TestimonialsProps {
  title?: string
  testimonials?: Testimonial[]
}

export function Testimonials({
  title = "Loved by Teams Worldwide",
  testimonials = [
    {
      quote: "TS@BigRock transformed how we track time. What used to take hours now takes minutes. Our team actually enjoys logging their hours now!",
      author: "Sarah Chen",
      role: "Engineering Manager",
      company: "TechCorp",
    },
    {
      quote: "The approval workflow is seamless. I can review and approve my entire team's timesheets in under 5 minutes. Game changer for our operations.",
      author: "Michael Rodriguez",
      role: "Operations Director",
      company: "InnovateCo",
    },
    {
      quote: "Finally, a timesheet app that doesn't feel like a chore. The mobile app is particularly fantastic - I can log time from anywhere.",
      author: "Emily Watson",
      role: "Project Lead",
      company: "DesignStudio",
    },
  ],
}: TestimonialsProps) {
  return (
    <section className="relative py-24 bg-[var(--bg-inset)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--fg-default)] mb-4">
            {title}
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {(testimonials || []).map((testimonial, index) => (
            <Card
              key={testimonial._id || index}
              className="relative bg-[var(--bg-canvas)] border-[var(--border-default)] hover:border-[var(--accent-emphasis)]/30 transition-all duration-300"
            >
              <CardContent className="p-6">
                {/* Quote Icon */}
                <Quote className="w-8 h-8 text-[var(--accent-emphasis)] opacity-50 mb-4" />

                {/* Quote Text */}
                <blockquote className="text-[var(--fg-default)] leading-relaxed mb-6">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--accent-emphasis)] to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-[var(--fg-default)] text-sm">
                      {testimonial.author}
                    </div>
                    <div className="text-xs text-[var(--fg-muted)]">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
