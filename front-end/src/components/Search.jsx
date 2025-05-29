'use client';
import { useSearch } from '../context/SearchContext';
import { useEffect } from 'react';

export default function Search() {
  const { isOpen, closeSearch } = useSearch();

  // Fecha ao clicar fora
  useEffect(() => {
    const handleOutside = (e) => {
      const search = document.getElementById('search-panel');
      if (search && !search.contains(e.target)) {
        closeSearch();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutside);
    }
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [isOpen, closeSearch]);
}
