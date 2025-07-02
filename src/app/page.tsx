'use client'
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useStoreActions, useCurrentPage, useHasMore, useIsLoading } from "@/store/hooks";
import SearchInput from "../components/searchInput";
import Image from "next/image";

const IMAGES_PER_LOAD = 8;

export default function Home() {
  const { setImages, addImages, resetImages, setIsLoading, setHasMore, setCurrentPage } = useStoreActions();
  const currentPage = useCurrentPage();
  const hasMore = useHasMore();
  const isLoading = useIsLoading();

  const [lastSearchQuery, setLastSearchQuery] = useState("");
  const router = useRouter();

  const loadImages = useCallback(async (page: number, term: string, reset = false) => {
    if (!term && !lastSearchQuery) {
      return;
    }

    const searchTerm = term || lastSearchQuery;

    setIsLoading(true);

    try {
      const response = await fetch(`/api/images?query=${encodeURIComponent(searchTerm)}&page=${page}&per_page=${IMAGES_PER_LOAD}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!Array.isArray(data.images)) {
        console.error("data.images no es un array:", data.images);
        setHasMore(false);
        return;
      }

      if (data.images.length === 0 && page === 1) {
        setHasMore(false);
        if (reset) setImages([]);
        return;
      }

      if (reset) {
        setImages(data.images);
      } else {
        addImages(data.images);
      }

      setHasMore(data.hasMore);

      if (term) setLastSearchQuery(term);

      if (reset || page === 1) {
        router.push('/search/photos');
      }

    } catch (error) {
      console.error("Error loading images:", error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  }, [router, setImages, addImages, setIsLoading, setHasMore, lastSearchQuery]);

  useEffect(() => {
    resetImages()
    setCurrentPage(1)
    setHasMore(true)
  }, [resetImages, setCurrentPage, setHasMore]);

  useEffect(() => {
    const fetchMoreImages = async () => {
      if (currentPage > 1 && hasMore && !isLoading) {
        await loadImages(currentPage, lastSearchQuery, false);
      }
    };

    fetchMoreImages();
  }, [currentPage, loadImages, hasMore, isLoading, lastSearchQuery]);

  const handleSearch = async (query: string) => {
    try {
      sessionStorage.setItem('lastSearchQuery', query)
    } catch (error) {
      console.warn('Could not save to sessionStorage:', error)
    }
    setCurrentPage(1)
    setHasMore(true)
    await loadImages(1, query, true)
  }

  return (
    <main className="h-screen relative overflow-hidden">
      <Image
        src='/hero-left.png'
        alt="hero-image"
        width={537}
        height={797}
        className="absolute object-cover  w-[360px] max-[639px]:-left-[330px] sm:-left-[330px] md:-left-[280px] lg:-left-[150px] xl:left-[0px] h-[70%] top-1/2 -translate-y-1/2 z-0 pointer-events-none select-none"
      />
      <Image
        src='/hero-right.png'
        alt="hero-image"
        width={537}
        height={797}
        className="absolute object-cover w-[360px]  max-[639px]:-right-[330px] sm:-right-[330px] md:-right-[280px] lg:-right-[150px] xl:right-[0px] h-[70%] top-1/2 -translate-y-1/2 z-0 pointer-events-none select-none"
      />
      <div className="flex flex-col items-center justify-center h-full w-full gap-3 relative">
        <h1 className="text-4xl font-semibold">Search</h1>
        <h3 className="text-sm">Search high-resolution images from Unsplash</h3>
        <SearchInput
          onSearch={handleSearch}
          isLoading={isLoading}
        />
      </div>
    </main>
  );
}
