import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { searchProjects, initializeSearch } from '@/lib/search';
import ProjectGrid from './ProjectGrid';
import { getAllProjects } from '@/lib/projects';

export default function SearchResults() {
  const router = useRouter();
  const { q } = router.query;
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!q) return;

    const performSearch = async () => {
      setIsLoading(true);

      // Initialiser l'index avec tous les projets
      const allProjects = getAllProjects();
      const index = allProjects.map((p) => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        description: p.description,
        tags: p.tags || [],
      }));

      initializeSearch(index);

      // Effectuer la recherche
      const searchResults = searchProjects(String(q));

      // Mapper les résultats aux projets complets
      const projectResults = searchResults
        .map((r) => allProjects.find((p) => p.slug === r.slug))
        .filter(Boolean);

      setResults(projectResults);
      setIsLoading(false);
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
