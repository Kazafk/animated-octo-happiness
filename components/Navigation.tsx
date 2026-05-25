import Link from 'next/link';
import SearchBar from './SearchBar';

export default function Navigation() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-6">
          <Link href="/" className="text-2xl font-bold text-primary hover:text-red-600">
            Portfolio
          </Link>
          <SearchBar />
        </div>
      </div>
    </nav>
  );
}
