import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';

interface SearchBarProps {
  sticky?: boolean;
}

export default function SearchBar({ sticky = false }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  }, [query, router]);

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex gap-2 ${sticky ? 'sticky top-0 z-50' : ''}`}
    >
      <input
        type="text"
        placeholder="Rechercher les projets..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <button
        type="submit"
        className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-red-600 transition-colors"
      >
        Chercher
      </button>
    </form>
  );
}
