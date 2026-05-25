import markdownIt from 'markdown-it';
import hljs from 'highlight.js';

interface MarkdownRendererProps {
  content: string;
}

// Initialize markdown-it without highlight first
let md: any = null;

function initializeMarkdown() {
  if (md) return md;

  md = markdownIt({
    highlight: function (str: string, lang: string) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return (
            '<pre class="hljs"><code>' +
            hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
            '</code></pre>'
          );
        } catch (__) {}
      }
      return (
        '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
      );
    },
  });

  return md;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const renderer = initializeMarkdown();
  const html = renderer.render(content);

  return (
    <div
      className="markdown-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
