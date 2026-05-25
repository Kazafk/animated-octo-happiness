import Head from 'next/head';
import { getAllProjects } from '@/lib/projects';
import Hero from '@/components/Hero';
import ProjectGrid from '@/components/ProjectGrid';

export async function getStaticProps() {
  const allProjects = getAllProjects();

  return {
    props: {
      allProjects,
    },
  };
}

export default function Home({
  allProjects,
}: {
  allProjects: any[];
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
