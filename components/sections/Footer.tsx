"use client"

import Link from "next/link"
import { Clock, Twitter, Linkedin, Github } from "lucide-react"

interface FooterLink {
  label: string
  href: string
}

interface FooterSection {
  title: string
  links: FooterLink[]
}

interface FooterProps {
  siteName?: string
  tagline?: string
  logo?: string
  contact?: {
    email?: string
    phone?: string
  }
  social?: {
    twitter?: string
    linkedin?: string
    github?: string
  }
  footerSections?: FooterSection[]
}

const defaultFooterSections: FooterSection[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy-policy" },
      { label: "Terms", href: "/terms" },
      { label: "Cookies", href: "/cookies" },
    ],
  },
]

export function Footer({
  siteName = "TS@BigRock",
  tagline = "Professional Timesheet Management",
  logo,
  contact,
  social,
  footerSections,
}: FooterProps) {
  const resolvedContact = contact ?? {
    email: "hello@bigrock.com",
    phone: "+1 (555) 123-4567",
  }
  const resolvedSocial = social ?? {
    twitter: "#",
    linkedin: "#",
    github: "#",
  }
  const resolvedSections = footerSections?.length ? footerSections : defaultFooterSections
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[var(--bg-inset)] border-t border-[var(--border-default)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              {logo ? (
                <img src={logo} alt={siteName} className="h-9 w-auto" />
              ) : (
                <div className="w-9 h-9 rounded-lg bg-[var(--accent-emphasis)] flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
              )}
              <span className="text-lg font-bold text-[var(--fg-default)]">
                {siteName}
              </span>
            </Link>
            <p className="text-sm text-[var(--fg-muted)] mb-4 max-w-xs">
              {tagline}
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {resolvedSocial.twitter && (
                <a
                  href={resolvedSocial.twitter}
                  className="text-[var(--fg-muted)] hover:text-[var(--fg-default)] transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              )}
              {resolvedSocial.linkedin && (
                <a
                  href={resolvedSocial.linkedin}
                  className="text-[var(--fg-muted)] hover:text-[var(--fg-default)] transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {resolvedSocial.github && (
                <a
                  href={resolvedSocial.github}
                  className="text-[var(--fg-muted)] hover:text-[var(--fg-default)] transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Link Columns */}
          {resolvedSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-[var(--fg-default)] mb-4 text-sm">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {(section.links || []).map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href || "#"}
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
          {resolvedContact.email && (
            <a
              href={`mailto:${resolvedContact.email}`}
              className="text-sm text-[var(--fg-muted)] hover:text-[var(--fg-default)] transition-colors"
            >
              {resolvedContact.email}
            </a>
          )}
        </div>
      </div>
    </footer>
  )
}
