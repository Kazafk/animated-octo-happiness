import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { searchProjects, initializeSearch, SearchIndex } from '@/lib/search';
import ProjectGrid from './ProjectGrid';

export default function SearchResults() {
  const router = useRouter();
  const { q } = router.query;
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!q) return;

    const performSearch = async () => {
      setIsLoading(true);

      try {
        // Charger l'index de recherche généré au build
        const indexResponse = await fetch('/search-index.json');
        const index: SearchIndex[] = await indexResponse.json();

        // Initialiser Fuse.js avec l'index
        initializeSearch(index);

        // Effectuer la recherche
        const searchResults = searchProjects(String(q));

        // Les résultats incluent déjà les informations du projet
        setResults(searchResults);
      } catch (err) {
        console.error('Failed to perform search:', err);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    performSearch();
  }, [q]);

  if (!q) {
    return <div>Aucune requête de recherche</div>;
  }

  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold mb-2">Résultats de la recherche</h1>
      <p className="text-gray-600 mb-8">
        Recherche pour: <span className="font-bold text-dark">"{q}"</span>
      </p>

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Recherche en cours...</p>
        </div>
      ) : (
        <ProjectGrid
          projects={results}
          emptyMessage={`Aucun résultat trouvé pour "${q}"`}
        />
      )}
    </div>
  );
}
