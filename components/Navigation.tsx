import Link from 'next/link';
import SearchBar from './SearchBar';

export default function Navigation() {
  return (
    <nav className="bg-light border-b-12 border-dark sticky top-0 z-40">
      <div className="container mx-auto px-8 py-6">
        <div className="flex items-center justify-between gap-8">
          <Link
            href="/"
            className="text-3xl font-black text-primary hover:text-secondary transition-colors hover:underline"
            style={{
              textDecorationThickness: '4px',
              textUnderlineOffset: '6px',
            }}
          >
            PORTFOLIO
          </Link>
          <SearchBar />
        </div>
      </div>
    </nav>
  );
}
