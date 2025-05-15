import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'd1jvgmj0', // pegue isso no sanity.io/manage
  dataset: 'production',
  apiVersion: '2023-01-01',
  useCdn: true,
})