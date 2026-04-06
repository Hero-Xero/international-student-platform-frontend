/**
 * Content Block Renderer
 * Renders various types of content blocks from Strapi CMS
 */

import { ContentBlock as ContentBlockType } from '../types/strapi';

interface ContentBlocksProps {
  blocks?: ContentBlockType[];
}

export function ContentBlocks({ blocks }: ContentBlocksProps) {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {blocks.map((block, idx) => (
        <ContentBlock key={idx} block={block} />
      ))}
    </div>
  );
}

interface ContentBlockProps {
  block: ContentBlockType;
}

function ContentBlock({ block }: ContentBlockProps) {
  switch (block.type) {
    case 'rich-text':
      return (
        <div 
          className="prose prose-sm md:prose-base max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{
            __html: renderRichText(block.content)
          }}
        />
      );
    
    case 'quote':
      return (
        <blockquote className="border-l-4 border-green-500 pl-4 italic text-gray-700 dark:text-gray-300 my-4">
          <p className="text-lg mb-2">"{block.quote}"</p>
          {block.author && <p className="text-sm text-gray-600 dark:text-gray-400">— {block.author}</p>}
        </blockquote>
      );
    
    case 'media':
      return (
        <figure className="my-6">
          <img
            src={block.url}
            alt={block.alt || 'Content image'}
            className="w-full max-h-96 object-cover rounded-lg"
          />
          {block.caption && (
            <figcaption className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    
    case 'slider':
      return (
        <div className="my-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {block.slides.map((slide, idx) => (
              <div key={idx} className="rounded-lg overflow-hidden shadow-md">
                <img
                  src={slide.image}
                  alt={slide.title || `Slide ${idx + 1}`}
                  className="w-full h-48 object-cover"
                />
                {slide.title && (
                  <div className="p-3 bg-white dark:bg-slate-800">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {slide.title}
                    </h4>
                    {slide.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {slide.description}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    
    default:
      return null;
  }
}

/**
 * Basic HTML sanitization to prevent XSS
 * For production, consider using a library like DOMPurify
 */
function sanitizeHtml(html: string): string {
  // Remove script tags and event handlers
  let sanitized = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  sanitized = sanitized.replace(/on\w+\s*=\s*['"]/gi, 'data-event="');
  return sanitized;
}

function markdownToHtml(markdown: string): string {
  return markdown
    .split('\n')
    .map((line) => {
      if (line.startsWith('### ')) {
        return `<h3>${line.slice(4)}</h3>`;
      }
      if (line.startsWith('## ')) {
        return `<h2>${line.slice(3)}</h2>`;
      }
      if (line.startsWith('# ')) {
        return `<h1>${line.slice(2)}</h1>`;
      }
      if (line.trim() === '') {
        return '<br />';
      }
      return `<p>${line}</p>`;
    })
    .join('');
}

function renderRichText(content: string): string {
  const safeContent = sanitizeHtml(content);
  const looksLikeHtml = /<\/?[a-z][\s\S]*>/i.test(safeContent);
  return looksLikeHtml ? safeContent : markdownToHtml(safeContent);
}
