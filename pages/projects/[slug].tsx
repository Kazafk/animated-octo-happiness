import Head from 'next/head';
import { getProject, getProjectSlugs } from '@/lib/projects';
import ProjectDetail from '@/components/ProjectDetail';

export async function getStaticPaths() {
  const slugs = getProjectSlugs();
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);

  if (!project) {
    return { notFound: true };
  }

  return {
    props: {
      project,
    },
  };
}

export default function ProjectPage({ project }: { project: any }) {
  return (
    <>
      <Head>
        <title>{project.title} - Portfolio</title>
        <meta name="description" content={project.description} />
        <meta property="og:title" content={project.title} />
        <meta property="og:description" content={project.description} />
      </Head>

      <ProjectDetail project={project} />
    </>
  );
}
