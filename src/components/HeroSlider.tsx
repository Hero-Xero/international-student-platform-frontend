import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { apiRequest, getCurrentApiBaseUrl } from '../services/api';
import { useAuth } from '../context/AuthContext';

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

type HeroNavTarget = '_self' | '_blank';

type HeroNavTreeApiItem = {
  title?: string;
  url?: string;
  target?: HeroNavTarget;
  isProtected?: boolean;
  children?: HeroNavTreeApiItem[];
};

type HeroNavTreeItem = {
  title: string;
  url: string;
  target: HeroNavTarget;
  isProtected: boolean;
  children: HeroNavTreeItem[];
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

const fallbackHeroNavTree: HeroNavTreeItem[] = [
  { title: 'Home', url: '/', target: '_self', isProtected: false, children: [] },
  { title: 'Academics', url: '/academics', target: '_self', isProtected: false, children: [] },
  { title: 'Questionnaires', url: '/questionnaires', target: '_self', isProtected: false, children: [] },
  { title: 'Resources', url: '/resources', target: '_self', isProtected: false, children: [] },
  { title: 'Announcements', url: '/announcements', target: '_self', isProtected: false, children: [] },
  { title: 'Contact Us', url: '/contact-us', target: '_self', isProtected: false, children: [] },
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

const parseHeroNavTree = (payload: unknown): HeroNavTreeApiItem[] => {
  if (!payload || typeof payload !== 'object') {
    return [];
  }

  const extractFromMenuRecords = (records: unknown[]): HeroNavTreeApiItem[] => {
    const menuRecords = records.filter((entry) => entry && typeof entry === 'object') as Array<{
      title?: string;
      slug?: string;
      items?: unknown;
    }>;

    // Prefer the explicit hero-nav menu record when present.
    const heroNavRecord = menuRecords.find((entry) => entry.title === 'hero-nav');
    if (heroNavRecord && Array.isArray(heroNavRecord.items)) {
      return heroNavRecord.items as HeroNavTreeApiItem[];
    }

    const firstRecordWithItems = menuRecords.find((entry) => Array.isArray(entry.items));
    if (firstRecordWithItems && Array.isArray(firstRecordWithItems.items)) {
      return firstRecordWithItems.items as HeroNavTreeApiItem[];
    }

    return [];
  };

  const tryExtract = (candidate: unknown): HeroNavTreeApiItem[] => {
    if (Array.isArray(candidate)) {
      const fromMenuRecords = extractFromMenuRecords(candidate);
      if (fromMenuRecords.length > 0) {
        return fromMenuRecords;
      }
      return candidate as HeroNavTreeApiItem[];
    }
    if (!candidate || typeof candidate !== 'object') {
      return [];
    }

    const record = candidate as {
      ['hero-nav']?: unknown;
      menu?: unknown;
      data?: unknown;
    };

    if (Array.isArray(record['hero-nav'])) {
      return record['hero-nav'] as HeroNavTreeApiItem[];
    }

    if (record.menu) {
      const menuItems = tryExtract(record.menu);
      if (menuItems.length > 0) {
        return menuItems;
      }
    }

    if (record.data) {
      const dataItems = tryExtract(record.data);
      if (dataItems.length > 0) {
        return dataItems;
      }
    }

    return [];
  };

  return tryExtract(payload);
};

const normalizeHeroNavTree = (items: HeroNavTreeApiItem[]): HeroNavTreeItem[] => {
  return items
    .map((item): HeroNavTreeItem | null => {
      const title = item.title?.trim();
      const rawUrl = item.url?.trim() || '/';

      if (!title) {
        return null;
      }

      const target: HeroNavTarget = item.target === '_blank' ? '_blank' : '_self';

      return {
        title,
        url: target === '_self' ? normalizeNavPath(rawUrl) : rawUrl,
        target,
        isProtected: Boolean(item.isProtected),
        children: normalizeHeroNavTree(Array.isArray(item.children) ? item.children : []),
      };
    })
    .filter((item): item is HeroNavTreeItem => item !== null);
};

const filterProtectedHeroNavTree = (items: HeroNavTreeItem[], isLoggedIn: boolean): HeroNavTreeItem[] => {
  return items
    .filter((item) => isLoggedIn || !item.isProtected)
    .map((item) => ({
      ...item,
      children: filterProtectedHeroNavTree(item.children, isLoggedIn),
    }));
};

interface HeroNavMenuNodeProps {
  item: HeroNavTreeItem;
  path: string[];
  activePath: string[];
  onActivatePath: (path: string[]) => void;
  level?: number;
}

function HeroNavMenuNode({ item, path, activePath, onActivatePath, level = 0 }: HeroNavMenuNodeProps) {
  const hasChildren = item.children.length > 0;
  const isTopLevel = level === 0;
  const itemPath = [...path, `${item.title}:${item.url}`];
  const isOpen = itemPath.every((segment, index) => activePath[index] === segment);

  const itemClassName = isTopLevel
    ? 'px-4 py-2 rounded-full bg-gray-800/50 hover:bg-gray-900/65 text-white text-sm md:text-base transition-all duration-500 ease-out inline-flex items-center gap-2'
    : 'w-full text-left px-4 py-2 bg-[#1f3769] hover:bg-[#284884] text-white transition-all duration-500 ease-out inline-flex items-center justify-between gap-2 text-sm';

  return (
    <li
      className={`relative ${isTopLevel ? '' : 'w-full'}`}
      onMouseEnter={() => hasChildren && onActivatePath(itemPath)}
    >
      {item.target === '_blank' ? (
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className={itemClassName}
        >
          <span>{item.title}</span>
          {hasChildren && <span aria-hidden="true">v</span>}
        </a>
      ) : (
        <Link to={item.url} className={itemClassName}>
          <span>{item.title}</span>
          {hasChildren && <span aria-hidden="true">v</span>}
        </Link>
      )}

      {hasChildren && (
        <ul
          className={`flex flex-col min-w-[220px] bg-[#1f3769] border border-[#284884] rounded-none shadow-xl z-30 transition-all duration-500 ease-out ${
            isTopLevel ? 'absolute left-0 top-full mt-3' : 'absolute left-full top-0 ml-3'
          } ${
            isOpen
              ? 'opacity-100 visible translate-y-0 scale-100 pointer-events-auto'
              : 'opacity-0 invisible translate-y-2 scale-95 pointer-events-none'
          }`}
        >
          {item.children.map((child) => (
            <HeroNavMenuNode
              key={`${child.title}-${child.url}`}
              item={child}
              path={itemPath}
              activePath={activePath}
              onActivatePath={onActivatePath}
              level={level + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [slides, setSlides] = useState<SliderImage[]>(fallbackSlides);
  const [heroNavTree, setHeroNavTree] = useState<HeroNavTreeItem[]>(fallbackHeroNavTree);
  const [activeHeroNavPath, setActiveHeroNavPath] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  const hoverResetTimeoutRef = useRef<number | null>(null);
  const { user } = useAuth();

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
    const fetchHeroNavTree = async () => {
      try {
        const payload = await apiRequest<unknown>(
          '/api/tree-menus/menu',
          { auth: false }
        );

        const rawHeroNavTree = parseHeroNavTree(payload);
        const normalizedHeroNavTree = normalizeHeroNavTree(rawHeroNavTree);

        if (normalizedHeroNavTree.length > 0) {
          setHeroNavTree(normalizedHeroNavTree);
        } else {
          setHeroNavTree(fallbackHeroNavTree);
        }
      } catch {
        setHeroNavTree(fallbackHeroNavTree);
      }
    };

    fetchHeroNavTree();
  }, []);

  const activateHeroNavPath = (path: string[]) => {
    if (hoverResetTimeoutRef.current !== null) {
      window.clearTimeout(hoverResetTimeoutRef.current);
      hoverResetTimeoutRef.current = null;
    }

    setActiveHeroNavPath(path);
  };

  const resetHeroNavPath = () => {
    hoverResetTimeoutRef.current = window.setTimeout(() => {
      setActiveHeroNavPath([]);
      hoverResetTimeoutRef.current = null;
    }, 200);
  };

  const visibleHeroNavTree = filterProtectedHeroNavTree(heroNavTree, Boolean(user));

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
    <div className="relative w-full h-[70vh] md:h-screen overflow-visible">

      {/* IMAGE */}
      <div className="absolute inset-0 overflow-hidden z-0">
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
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute inset-x-0 top-[64%] md:top-[68%] -translate-y-1/2 z-30 flex flex-col items-center justify-center text-center text-white px-4"
      >
        {/* TITLE */}
        <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold">
          International Students Platform
        </h1>

        {/* SPACE */}
        <div className="h-10 md:h-16" />

        {/* HERO NAV */}
        <ul className="flex flex-wrap justify-center gap-3 md:gap-5" onMouseLeave={resetHeroNavPath}>
          {visibleHeroNavTree.map((item) => (
            <HeroNavMenuNode
              key={`${item.title}-${item.url}`}
              item={item}
              path={[]}
              activePath={activeHeroNavPath}
              onActivatePath={activateHeroNavPath}
            />
          ))}
        </ul>
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