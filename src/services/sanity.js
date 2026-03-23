import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: '25vcwkla',
  dataset: 'production',
  apiVersion: '2024-03-22',
  useCdn: true,
});
