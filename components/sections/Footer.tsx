"use client"

import Link from "next/link"
import Image from "next/image"
import { Clock, Twitter, Linkedin, Github, Facebook, Instagram, Youtube, Music2, LucideIcon } from "lucide-react"
import { useCookieConsent } from "@/components/cookie-consent"

interface FooterLink {
  label: string
  href: string
}

interface FooterSection {
  title: string
  links: FooterLink[]
}

interface SocialLink {
  _key: string
  platform: 'linkedin' | 'twitter' | 'facebook' | 'instagram' | 'youtube' | 'github' | 'tiktok'
  url: string
}

const socialIcons: Record<SocialLink['platform'], LucideIcon> = {
  linkedin: Linkedin,
  twitter: Twitter,
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  github: Github,
  tiktok: Music2,
}

const platformLabels: Record<SocialLink['platform'], string> = {
  linkedin: 'LinkedIn',
  twitter: 'Twitter',
  facebook: 'Facebook',
  instagram: 'Instagram',
  youtube: 'YouTube',
  github: 'GitHub',
  tiktok: 'TikTok',
}

interface FooterProps {
  siteName?: string
  tagline?: string
  logo?: string
  contact?: {
    email?: string
    phone?: string
  }
  socialLinks?: SocialLink[]
  footerSections?: FooterSection[]
}

function normalizeHref(href: string): string {
  if (!href) return "#"
  if (href.startsWith("/") || href.startsWith("#") || href.startsWith("http")) {
    return href
  }
  return `/${href}`
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
  socialLinks,
  footerSections,
}: FooterProps) {
  const { openSettings } = useCookieConsent()
  const resolvedContact = contact ?? {
    email: "hello@bigrock.com",
    phone: "+1 (555) 123-4567",
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
                <Image src={logo} alt={siteName} width={36} height={36} className="h-9 w-auto" />
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
            {socialLinks && socialLinks.length > 0 && (
              <div className="flex items-center gap-4">
                {socialLinks.map((link) => {
                  const Icon = socialIcons[link.platform]
                  const label = platformLabels[link.platform]
                  if (!Icon) return null
                  return (
                    <a
                      key={link._key}
                      href={link.url}
                      className="text-[var(--fg-muted)] hover:text-[var(--fg-default)] transition-colors"
                      aria-label={label}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  )
                })}
              </div>
            )}
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
                      href={normalizeHref(link.href)}
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
          <div className="flex items-center gap-4">
            <button
              onClick={openSettings}
              className="text-sm text-[var(--fg-muted)] hover:text-[var(--fg-default)] transition-colors"
            >
              Cookie Settings
            </button>
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
      </div>
    </footer>
  )
}
