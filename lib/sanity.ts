import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

export const client = createClient({
  projectId: 'yj6cjjt2',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

const builder = createImageUrlBuilder({ projectId: 'yj6cjjt2', dataset: 'production' })

export function urlFor(source: any) {
  return builder.image(source)
}
