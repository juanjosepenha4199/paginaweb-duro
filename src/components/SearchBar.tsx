'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Fuse from 'fuse.js';
import { mockProducts, Product } from '@/data/products';
import Image from 'next/image';

interface SearchResult {
  item: Product;
  refIndex: number;
}

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Memoize Fuse instance with optimized configuration
  const fuse = useMemo(() => new Fuse(mockProducts, {
    keys: ['name'],
    threshold: 0.4,
    includeScore: true,
    minMatchCharLength: 2,
    shouldSort: true,
    findAllMatches: true,
    useExtendedSearch: true,
    distance: 100,
  }), []);

  // Memoize click outside handler
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  // Debounce search results
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.length >= 2) {
        const searchResults = fuse.search(query);
        setResults(searchResults);
        setIsOpen(true);
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 150); // 150ms debounce

    return () => clearTimeout(timeoutId);
  }, [query, fuse]);

  // Memoize select handler
  const handleSelect = useCallback((productId: number) => {
    setQuery('');
    setIsOpen(false);
    router.push(`/catalogo/${productId}`);
  }, [router]);

  // Memoize input change handler
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  return (
    <div ref={searchRef} className="relative w-full">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Buscar productos..."
          className="w-full px-4 py-3 bg-zinc-800 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 text-lg"
        />
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <svg
            className="w-6 h-6 text-zinc-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-zinc-900 rounded-lg shadow-lg border border-zinc-700 max-h-96 overflow-y-auto">
          <div className="py-2">
            {results.slice(0, 5).map((result) => (
              <button
                key={result.item.id}
                onClick={() => handleSelect(result.item.id)}
                className="w-full px-4 py-3 text-left hover:bg-zinc-800 transition-colors flex items-center gap-4"
              >
                {result.item.image && (
                  <div className="w-12 h-12 relative flex-shrink-0">
                    <Image
                      src={result.item.image}
                      alt={result.item.name}
                      width={48}
                      height={48}
                      className="object-cover rounded-md"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <div className="text-white font-medium">{result.item.name}</div>
                  <div className="text-red-500">${result.item.price.toLocaleString()}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {isOpen && query.length >= 2 && results.length === 0 && (
        <div className="absolute z-50 w-full mt-2 bg-zinc-900 rounded-lg shadow-lg border border-zinc-700">
          <div className="px-4 py-3 text-zinc-400">
            No se encontraron productos
          </div>
        </div>
      )}
    </div>
  );
} 