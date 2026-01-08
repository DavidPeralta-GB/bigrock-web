import { notFound } from "next/navigation"
import { Metadata } from "next"
import { PortableText } from "@portabletext/react"
import { getPageBySlug, getAllPageSlugs, getSiteSettings } from "@/lib/queries"
import { Navigation, Footer } from "@/components/sections"

export const revalidate = 60

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const pages = await getAllPageSlugs()
  return pages?.map((page: { slug: string }) => ({
    slug: page.slug,
  })) || []
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const page = await getPageBySlug(slug)
  
  if (!page) {
    return {
      title: "Page Not Found",
    }
  }

  return {
    title: `${page.title} | TS@BigRock`,
    description: page.metaDescription || `${page.title} - TS@BigRock`,
  }
}

const portableTextComponents = {
  block: {
    h1: ({ children }: { children?: React.ReactNode }) => (
      <h1 className="text-3xl font-bold text-[var(--fg-default)] mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-2xl font-semibold text-[var(--fg-default)] mt-8 mb-3">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-xl font-semibold text-[var(--fg-default)] mt-6 mb-2">{children}</h3>
    ),
    h4: ({ children }: { children?: React.ReactNode }) => (
      <h4 className="text-lg font-medium text-[var(--fg-default)] mt-4 mb-2">{children}</h4>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-[var(--fg-muted)] mb-4 leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-[var(--accent-emphasis)] pl-4 my-4 text-[var(--fg-muted)] italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-disc list-inside text-[var(--fg-muted)] mb-4 space-y-2">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="list-decimal list-inside text-[var(--fg-muted)] mb-4 space-y-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => <li>{children}</li>,
    number: ({ children }: { children?: React.ReactNode }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-semibold text-[var(--fg-default)]">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => <em>{children}</em>,
    link: ({ value, children }: { value?: { href: string }; children?: React.ReactNode }) => (
      <a
        href={value?.href}
        className="text-[var(--accent-emphasis)] hover:underline"
        target={value?.href?.startsWith("http") ? "_blank" : undefined}
        rel={value?.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
  },
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const [page, siteSettings] = await Promise.all([
    getPageBySlug(slug),
    getSiteSettings(),
  ])

  if (!page) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-[var(--bg-canvas)]">
      <Navigation siteName={siteSettings?.siteName} />
      
      <div className="pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-[var(--fg-default)] mb-8">
            {page.title}
          </h1>
          
          {page.content && (
            <div className="prose prose-invert max-w-none">
              <PortableText value={page.content} components={portableTextComponents} />
            </div>
          )}
        </div>
      </div>

      <Footer
        siteName={siteSettings?.siteName}
        tagline={siteSettings?.tagline}
        contact={siteSettings?.contact}
        social={siteSettings?.social}
      />
    </main>
  )
}
