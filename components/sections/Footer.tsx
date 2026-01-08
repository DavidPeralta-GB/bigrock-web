"use client"

import Link from "next/link"
import { Clock, Twitter, Linkedin, Github } from "lucide-react"

interface FooterProps {
  siteName?: string
  tagline?: string
  contact?: {
    email?: string
    phone?: string
  }
  social?: {
    twitter?: string
    linkedin?: string
    github?: string
  }
}

export function Footer({
  siteName = "TS@BigRock",
  tagline = "Professional Timesheet Management",
  contact = {
    email: "hello@bigrock.com",
    phone: "+1 (555) 123-4567",
  },
  social = {
    twitter: "#",
    linkedin: "#",
    github: "#",
  },
}: FooterProps) {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    Product: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Integrations", href: "#" },
      { label: "API", href: "#" },
    ],
    Company: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
    ],
    Resources: [
      { label: "Documentation", href: "#" },
      { label: "Help Center", href: "#" },
      { label: "Community", href: "#" },
      { label: "Status", href: "#" },
    ],
    Legal: [
      { label: "Privacy", href: "/privacy-policy" },
      { label: "Terms", href: "/terms" },
      { label: "Security", href: "#" },
      { label: "Cookies", href: "#" },
    ],
  }

  return (
    <footer className="bg-[var(--bg-inset)] border-t border-[var(--border-default)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-[var(--accent-emphasis)] flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-[var(--fg-default)]">
                {siteName}
              </span>
            </Link>
            <p className="text-sm text-[var(--fg-muted)] mb-4 max-w-xs">
              {tagline}
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {social.twitter && (
                <a
                  href={social.twitter}
                  className="text-[var(--fg-muted)] hover:text-[var(--fg-default)] transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              )}
              {social.linkedin && (
                <a
                  href={social.linkedin}
                  className="text-[var(--fg-muted)] hover:text-[var(--fg-default)] transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {social.github && (
                <a
                  href={social.github}
                  className="text-[var(--fg-muted)] hover:text-[var(--fg-default)] transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold text-[var(--fg-default)] mb-4 text-sm">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--fg-muted)] hover:text-[var(--fg-default)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--border-default)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[var(--fg-muted)]">
            {currentYear} {siteName}. All rights reserved.
          </p>
          {contact.email && (
            <a
              href={`mailto:${contact.email}`}
              className="text-sm text-[var(--fg-muted)] hover:text-[var(--fg-default)] transition-colors"
            >
              {contact.email}
            </a>
          )}
        </div>
      </div>
    </footer>
  )
}
