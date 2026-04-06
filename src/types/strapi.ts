/**
 * Strapi CMS Response Types
 * Define interfaces for all Strapi single-type endpoints
 */

export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiSingleTypeResponse<T> {
  data: T;
  meta?: Record<string, any>;
}

/**
 * Block types for dynamic content rendering
 */
export interface RichTextBlock {
  type: 'rich-text';
  content: string;
}

export interface QuoteBlock {
  type: 'quote';
  quote: string;
  author?: string;
}

export interface MediaBlock {
  type: 'media';
  url: string;
  alt?: string;
  caption?: string;
}

export interface SliderBlock {
  type: 'slider';
  slides: {
    image: string;
    title?: string;
    description?: string;
  }[];
}

export type ContentBlock = RichTextBlock | QuoteBlock | MediaBlock | SliderBlock;

/**
 * Homepage single-type
 */
export interface Homepage {
  id: number;
  title?: string;
  subtitle?: string;
  description?: string;
  blocks?: ContentBlock[];
  featured_image?: {
    data?: {
      id: number;
      attributes: {
        url: string;
        alt?: string;
      };
    };
  };
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Academics single-type
 */
export interface Academics {
  id: number;
  title?: string;
  subtitle?: string;
  description?: string;
  blocks?: ContentBlock[];
  departments?: {
    name: string;
    description: string;
    icon?: string;
  }[];
  image?: {
    data?: {
      id: number;
      attributes: {
        url: string;
        alt?: string;
      };
    };
  };
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Questionnaires single-type
 */
export interface Questionnaires {
  id: number;
  title?: string;
  subtitle?: string;
  description?: string;
  blocks?: ContentBlock[];
  forms?: {
    name: string;
    url: string;
    description?: string;
  }[];
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Resources single-type
 */
export interface Resources {
  id: number;
  title?: string;
  subtitle?: string;
  description?: string;
  blocks?: ContentBlock[];
  categories?: {
    name: string;
    description?: string;
    icon?: string;
    resources?: {
      name: string;
      url: string;
      size?: string;
    }[];
  }[];
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Announcements single-type
 */
export interface Announcements {
  id: number;
  title?: string;
  subtitle?: string;
  description?: string;
  blocks?: ContentBlock[];
  announcements_items?: {
    title: string;
    excerpt?: string;
    content?: string;
    date: string;
    category?: string;
    urgent?: boolean;
    attachments?: {
      data?: {
        id: number;
        attributes: {
          url: string;
          name: string;
        };
      }[];
    };
  }[];
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Contact Us single-type
 */
export interface ContactUs {
  id: number;
  title?: string;
  subtitle?: string;
  description?: string;
  blocks?: ContentBlock[];
  email?: string;
  phone?: string;
  address?: string;
  office_hours?: {
    day: string;
    hours: string;
  }[];
  social_media?: {
    platform: string;
    url: string;
  }[];
  createdAt?: string;
  updatedAt?: string;
}

/**
 * API Error response
 */
export interface StrapiError {
  status: number;
  name: string;
  message: string;
  details?: {
    errors?: Array<{
      path: string[];
      message: string;
      name: string;
    }>;
  };
}
