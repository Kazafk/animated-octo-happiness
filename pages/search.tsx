import Head from 'next/head';
import SearchResults from '@/components/SearchResults';

export default function SearchPage() {
  return (
    <>
      <Head>
        <title>Recherche - Portfolio</title>
      </Head>
      <SearchResults />
    </>
  );
}
