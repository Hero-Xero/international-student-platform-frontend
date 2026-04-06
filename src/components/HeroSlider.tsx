import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { apiRequest, getCurrentApiBaseUrl } from '../services/api';

const fallbackImages = [
  '/images/1.jpeg',
  '/images/3.jpeg',
  '/images/4.jpeg',
  '/images/5.jpeg',
  '/images/6.jpeg',
  '/images/7.jpeg',
  '/images/8.jpeg',
  '/images/9.jpeg',
  '/images/10.jpeg',
  '/images/11.jpeg',
  '/images/12.jpeg',
  '/images/13.jpeg',
  '/images/WhatsApp Image 2026-03-25 at 7.29.24 PM.jpeg'
];

type SliderImage = {
  id: number | string;
  src: string;
  title: string;
};

type HeroSlideApiItem = {
  id: number;
  title?: string | null;
  image?: {
    url?: string;
  };
  attributes?: {
    title?: string | null;
    image?: {
      data?: {
        attributes?: {
          url?: string;
        };
      };
    };
  };
};

type HeroSlidesApiResponse = {
  data?: HeroSlideApiItem[];
};

type HeroNavItemApiEntry = {
  id: number;
  label?: string;
  url?: string;
  order?: number;
  attributes?: {
    label?: string;
    url?: string;
    order?: number;
  };
};

type HeroNavItemsApiResponse = {
  data?: HeroNavItemApiEntry[];
};

const fallbackSlides: SliderImage[] = fallbackImages.map((src, index) => ({
  id: `fallback-${index}`,
  src,
  title: `Slide ${index + 1}`,
}));

const getStrapiBaseUrl = () => {
  const base = getCurrentApiBaseUrl().trim();
  return base.endsWith('/') ? base.slice(0, -1) : base;
};

const getSlideImageUrl = (item: HeroSlideApiItem): string | undefined => {
  return item.attributes?.image?.data?.attributes?.url || item.image?.url;
};

const getSlideTitle = (item: HeroSlideApiItem, index: number): string => {
  return item.attributes?.title || item.title || `Slide ${index + 1}`;
};

const toAbsoluteUrl = (url: string, baseUrl: string) => {
  if (/^https?:\/\//i.test(url)) {
    return url;
  }
  if (!baseUrl) {
    return url;
  }
  return `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
};

const fallbackLinks = [
  { name: 'Home', path: '/' },
  { name: 'Academics', path: '/academics' },
  { name: 'Questionnaires', path: '/questionnaires' },
  { name: 'Resources', path: '/resources' },
  { name: 'Announcements', path: '/announcements' },
  { name: 'Contact Us', path: '/contact-us' }
];

const normalizeNavPath = (url: string) => {
  const trimmed = url.trim();
  if (!trimmed) {
    return '/';
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  if (trimmed === 'home' || trimmed === 'homepage') {
    return '/';
  }

  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
};

export function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [slides, setSlides] = useState<SliderImage[]>(fallbackSlides);
  const [links, setLinks] = useState(fallbackLinks);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const fetchSlides = async () => {
      const baseUrl = getStrapiBaseUrl();

      try {
        const payload = await apiRequest<HeroSlidesApiResponse>(
          '/api/hero-slides?populate=image&filters[isActive][$eq]=true&sort=order:asc',
          { auth: false }
        );
        const apiItems = Array.isArray(payload?.data) ? payload.data : [];

        const mappedSlides = apiItems
          .map((item, index): SliderImage | null => {
            const imageUrl = getSlideImageUrl(item);

            if (!imageUrl) {
              return null;
            }

            return {
              id: item.id,
              src: toAbsoluteUrl(imageUrl, baseUrl),
              title: getSlideTitle(item, index),
            };
          })
          .filter((item): item is SliderImage => item !== null);

        if (mappedSlides.length > 0) {
          setSlides(mappedSlides);
          setCurrentIndex(0);
        } else {
          setSlides(fallbackSlides);
        }
      } catch {
        setSlides(fallbackSlides);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSlides();
  }, []);

  useEffect(() => {
    const fetchNavItems = async () => {
      try {
        const payload = await apiRequest<HeroNavItemsApiResponse>(
          '/api/nav-items?sort=order:asc&filters[visible][$eq]=true',
          { auth: false }
        );

        const rawItems = Array.isArray(payload?.data) ? payload.data : [];
        const mappedLinks = rawItems
          .map((item): { order: number; name: string; path: string } | null => {
            const source = item.attributes || item;
            const label = source.label?.trim();
            const rawUrl = source.url?.trim();
            const order = typeof source.order === 'number' ? source.order : Number.MAX_SAFE_INTEGER;

            if (!label || !rawUrl) {
              return null;
            }

            return {
              order,
              name: label,
              path: normalizeNavPath(rawUrl),
            };
          })
          .filter((item): item is { order: number; name: string; path: string } => item !== null)
          .sort((a, b) => a.order - b.order)
          .map(({ name, path }) => ({ name, path }));

        if (mappedLinks.length > 0) {
          setLinks(mappedLinks);
        } else {
          setLinks(fallbackLinks);
        }
      } catch {
        setLinks(fallbackLinks);
      }
    };

    fetchNavItems();
  }, []);

  useEffect(() => {
    setLoadedImages({});

    slides.forEach((slide, index) => {
      const image = new Image();
      image.src = slide.src;
      image.onload = () => {
        setLoadedImages((prev) => ({ ...prev, [index]: true }));
      };
    });
  }, [slides]);

  useEffect(() => {
    if (currentIndex >= slides.length) {
      setCurrentIndex(0);
    }
  }, [currentIndex, slides.length]);

  useEffect(() => {
    if (!isAutoPlay || slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 7000); //  كل 7 ثواني

    return () => clearInterval(interval);
  }, [isAutoPlay, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 9000);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (isLoading) {
    return (
      <div className="relative w-full h-[70vh] md:h-screen overflow-hidden bg-gray-800">
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-[70vh] md:h-screen overflow-hidden">

      {/* IMAGE */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <motion.img
            key={slide.id}
            src={slide.src}
            alt={slide.title}
            className="absolute inset-0 w-full h-full object-cover"
            initial={false}
            animate={{ opacity: index === currentIndex && (loadedImages[index] || index === currentIndex) ? 1 : 0 }}
            transition={{ duration: 1.1, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/60" />

      {/* CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4"
      >
        {/* TITLE */}
        <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold">
          International Students Platform
        </h1>

        {/* SPACE */}
        <div className="h-10 md:h-16" />

        {/* LINKS */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-5">
          {links.map((item, index) => (
            /^https?:\/\//i.test(item.path) ? (
              <a
                key={index}
                href={item.path}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-sm md:text-base transition"
              >
                {item.name}
              </a>
            ) : (
              <Link
                key={index}
                to={item.path}
                className="px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-sm md:text-base transition"
              >
                {item.name}
              </Link>
            )
          ))}
        </div>
      </motion.div>

      {/* LEFT BUTTON */}
      <button
        onClick={prevSlide}
        disabled={slides.length <= 1}
        className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-3 text-white"
      >
        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      {/* RIGHT BUTTON */}
      <button
        onClick={nextSlide}
        disabled={slides.length <= 1}
        className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-3 text-white"
      >
        <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      {/* DOTS */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition ${
              index === currentIndex
                ? 'bg-[#00AC5C] scale-125'
                : 'bg-white/60'
            }`}
          />
        ))}
      </div>

    </div>
  );
}