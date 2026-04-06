/**
 * CMS API service layer for Strapi single-type endpoints
 * Provides fetch functions for all page content
 */

import { apiRequest, ApiRequestOptions } from './api';
import { 
  Homepage, 
  Academics, 
  Questionnaires, 
  Resources, 
  Announcements, 
  ContactUs,
  StrapiSingleTypeResponse 
} from '../types/strapi';

const CMS_API_ENDPOINTS = {
  HOMEPAGE: '/api/homepage',
  ACADEMICS: '/api/academics',
  QUESTIONNAIRES: '/api/questionnaires',
  RESOURCES: '/api/resources',
  ANNOUNCEMENTS: '/api/announcements',
  CONTACT_US: '/api/contact-us',
} as const;

/** Default populate query to fetch all relations */
const DEFAULT_POPULATE = 'populate=*';

type CmsBlock = {
  __component?: string;
  body?: string;
  quote?: string;
  author?: string;
  media?: {
    url?: string;
    alternativeText?: string;
    caption?: string;
  };
  slides?: Array<{
    image?: string;
    title?: string;
    description?: string;
  }>;
};

function normalizeBlocks(blocks: unknown): Homepage['blocks'] {
  if (!Array.isArray(blocks)) {
    return [];
  }

  return (blocks as CmsBlock[])
    .map((block) => {
      const component = block.__component || '';

      if (component === 'shared.rich-text' && block.body) {
        return {
          type: 'rich-text' as const,
          content: block.body,
        };
      }

      if (component === 'shared.quote' && block.quote) {
        return {
          type: 'quote' as const,
          quote: block.quote,
          author: block.author,
        };
      }

      if (component === 'shared.media' && block.media?.url) {
        return {
          type: 'media' as const,
          url: block.media.url,
          alt: block.media.alternativeText,
          caption: block.media.caption,
        };
      }

      if (component === 'shared.slider' && Array.isArray(block.slides)) {
        return {
          type: 'slider' as const,
          slides: block.slides
            .filter((slide) => !!slide.image)
            .map((slide) => ({
              image: slide.image as string,
              title: slide.title,
              description: slide.description,
            })),
        };
      }

      return null;
    })
    .filter((block): block is NonNullable<typeof block> => block !== null);
}

function normalizeSingleTypeResponse<T extends { blocks?: unknown }>(data: T): T {
  return {
    ...data,
    blocks: normalizeBlocks(data?.blocks),
  };
}

/**
 * Fetch homepage content
 */
export async function getHomepage(): Promise<Homepage> {
  try {
    const response = await apiRequest<StrapiSingleTypeResponse<Homepage>>(
      `${CMS_API_ENDPOINTS.HOMEPAGE}?${DEFAULT_POPULATE}`
    );
    return normalizeSingleTypeResponse((response.data || {}) as Homepage);
  } catch (error) {
    console.error('Error fetching homepage:', error);
    throw error;
  }
}

/**
 * Fetch academics content
 */
export async function getAcademics(): Promise<Academics> {
  try {
    const response = await apiRequest<StrapiSingleTypeResponse<Academics>>(
      `${CMS_API_ENDPOINTS.ACADEMICS}?${DEFAULT_POPULATE}`
    );
    return normalizeSingleTypeResponse((response.data || {}) as Academics);
  } catch (error) {
    console.error('Error fetching academics:', error);
    throw error;
  }
}

/**
 * Fetch questionnaires content
 */
export async function getQuestionnaires(): Promise<Questionnaires> {
  try {
    const response = await apiRequest<StrapiSingleTypeResponse<Questionnaires>>(
      `${CMS_API_ENDPOINTS.QUESTIONNAIRES}?${DEFAULT_POPULATE}`
    );
    return normalizeSingleTypeResponse((response.data || {}) as Questionnaires);
  } catch (error) {
    console.error('Error fetching questionnaires:', error);
    throw error;
  }
}

/**
 * Fetch resources content
 */
export async function getResources(): Promise<Resources> {
  try {
    const response = await apiRequest<StrapiSingleTypeResponse<Resources>>(
      `${CMS_API_ENDPOINTS.RESOURCES}?${DEFAULT_POPULATE}`
    );
    return normalizeSingleTypeResponse((response.data || {}) as Resources);
  } catch (error) {
    console.error('Error fetching resources:', error);
    throw error;
  }
}

/**
 * Fetch announcements content
 */
export async function getAnnouncements(): Promise<Announcements> {
  try {
    const response = await apiRequest<StrapiSingleTypeResponse<Announcements>>(
      `${CMS_API_ENDPOINTS.ANNOUNCEMENTS}?${DEFAULT_POPULATE}`
    );
    return normalizeSingleTypeResponse((response.data || {}) as Announcements);
  } catch (error) {
    console.error('Error fetching announcements:', error);
    throw error;
  }
}

/**
 * Fetch contact us content
 */
export async function getContactUs(): Promise<ContactUs> {
  try {
    // Use the exact single-type endpoint requested by backend contract.
    const directResponse = await apiRequest<StrapiSingleTypeResponse<ContactUs>>(
      CMS_API_ENDPOINTS.CONTACT_US
    );

    const directData = normalizeSingleTypeResponse((directResponse.data || {}) as ContactUs);

    // If blocks are missing from direct response, fetch populated payload.
    if (!directData.blocks || directData.blocks.length === 0) {
      const populatedResponse = await apiRequest<StrapiSingleTypeResponse<ContactUs>>(
        `${CMS_API_ENDPOINTS.CONTACT_US}?${DEFAULT_POPULATE}`
      );
      return normalizeSingleTypeResponse((populatedResponse.data || {}) as ContactUs);
    }

    return directData;
  } catch (error) {
    try {
      // Fallback for setups that require explicit relation population.
      const populatedResponse = await apiRequest<StrapiSingleTypeResponse<ContactUs>>(
        `${CMS_API_ENDPOINTS.CONTACT_US}?${DEFAULT_POPULATE}`
      );
      return normalizeSingleTypeResponse((populatedResponse.data || {}) as ContactUs);
    } catch (fallbackError) {
      console.error('Error fetching contact us:', fallbackError);
      throw fallbackError;
    }
  }
}

/**
 * Helper function to check if content is loaded and not empty
 */
export function isContentLoaded(content: any): boolean {
  if (!content) return false;
  if (!content.id) return false;
  return true;
}

/**
 * Helper function to get image URL from Strapi media response
 */
export function getImageUrl(imageData: any): string | null {
  if (!imageData?.data?.attributes?.url) {
    return null;
  }
  const url = imageData.data.attributes.url;
  // Handle relative URLs from Strapi
  if (url.startsWith('/uploads') || url.startsWith('http')) {
    return url;
  }
  return url;
}

/**
 * Helper function to safely render rich text (basic HTML sanitization)
 * For production, consider using a library like DOMPurify
 */
export function renderRichText(html: string): string {
  if (!html) return '';
  // Basic XSS prevention - strip script tags
  return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
}
