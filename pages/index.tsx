import Head from 'next/head';
import { getAllProjects, getFeaturedProjects } from '@/lib/projects';
import Hero from '@/components/Hero';
import ProjectGrid from '@/components/ProjectGrid';

export async function getStaticProps() {
  const allProjects = getAllProjects();
  const featuredProjects = getFeaturedProjects();

  return {
    props: {
      allProjects,
      featuredProjects,
    },
  };
}

export default function Home({
  allProjects,
  featuredProjects,
}: {
  allProjects: any[];
  featuredProjects: any[];
}) {
  return (
    <>
      <Head>
        <title>Portfolio Technique - Partage de projets et travaux</title>
        <meta
          name="description"
          content="Portfolio complet partageant les projets techniques avec la communauté"
        />
      </Head>

      <Hero />

      {/* Section Featured Projects */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center">Projets en vedette</h2>
          <ProjectGrid projects={featuredProjects} />
        </div>
      </section>

      {/* Section All Projects */}
      <section className="py-12 bg-light">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center">Tous les projets</h2>
          <p className="text-center text-gray-600 mb-8">
            {allProjects.length} projet{allProjects.length > 1 ? 's' : ''} au total
          </p>
          <ProjectGrid projects={allProjects} />
        </div>
      </section>
    </>
  );
}
