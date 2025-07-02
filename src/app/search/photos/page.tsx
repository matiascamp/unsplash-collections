'use client'
import DynamicImage from "@/components/dynamicImage";
import Loader from "@/components/Loader";
import SearchInput from "@/components/searchInput";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';
import { UnsplashImage } from "@/interfaces/images";

const IMAGES_PER_LOAD = 8;

const SearchImages = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [hasSearched, setHasSearched] = useState(false);
    const observerRef = useRef<IntersectionObserver | null>(null);

    const { data, isLoading: swrIsLoading } = useSWR(
        searchTerm ? `/api/images?query=${encodeURIComponent(searchTerm)}&page=${page}&per_page=${IMAGES_PER_LOAD}` : null,
        fetcher,
        { keepPreviousData: true }
    );

    const lastImageRef = useCallback((node: Element | null) => {
        if (swrIsLoading) return;
        if (observerRef.current) observerRef.current.disconnect();
        observerRef.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && data?.hasMore) {
                setPage(prev => prev + 1);
            }
        }, { root: null, rootMargin: '100px', threshold: 0.1 });
        if (node) observerRef.current.observe(node);
    }, [swrIsLoading, data?.hasMore]);

    const handleSearch = async (term: string): Promise<void> => {
        setSearchTerm(term);
        setPage(1);
        setHasSearched(true);
        sessionStorage.setItem('lastSearchQuery', term);
    };


    useEffect(() => {
        const storedQuery = sessionStorage.getItem('lastSearchQuery');
        if (storedQuery) {
            setSearchTerm(storedQuery);
            setHasSearched(true);
        }
    }, []);


    const [allImages, setAllImages] = useState<UnsplashImage[]>([]);
    useEffect(() => {
        if (page === 1 && data?.images) {
            setAllImages(data.images);
        } else if (data?.images) {
            setAllImages(prev => {
                const imagesMap = new Map(prev.map((img: UnsplashImage) => [img.id, img]));
                (data.images as UnsplashImage[]).forEach((img: UnsplashImage) => imagesMap.set(img.id, img));
                return Array.from(imagesMap.values());
            });
        }
    }, [data?.images, page]);

    if (swrIsLoading && !hasSearched) {
        return <Loader message={'Loading images'} />;
    }

    return (
        <>
            <div className="w-full flex justify-center mb-8 fixed top-(--navbar-height) ">
                <Image src='/gradiend-bg@2x.png' alt="gradient-bg" fill sizes="100vw" className="bannerInput" priority={true} />
                <SearchInput
                    onSearch={handleSearch}
                    isLoading={swrIsLoading}
                    initialValue={searchTerm}
                />
            </div>
            <div className="max-w-full w-full h-full pt-(--custom-height) px-5">
                {(!swrIsLoading || hasSearched) && (
                    <div className="flex justify-evenly">
                        <div className="columns-1 xs:columns-2 sm:columns-2 md:columns-3 lg:columns-4  max-w-screen">
                            {allImages?.map((image, index) => {
                                const isLastImage = index === allImages.length - 1;
                                return (
                                    <div
                                        key={image.id}
                                        ref={isLastImage ? lastImageRef : null}
                                        className="break-avoid"
                                    >
                                        <Link href={`/photos/${image.id}`} className="cursor-pointer">
                                            <DynamicImage
                                                src={image.urls.regular}
                                                alt={image.alt_description}
                                                className={"mb-5 w-full object-cover rounded-sm xs:!max-w-65 xs:min-h-100 sm:!max-w-75 sm:min-h-100 md:min-h-auto md:w-full "}
                                                width={image.width}
                                                height={image.height}
                                            />
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {swrIsLoading && hasSearched && allImages.length > 0 && (
                <div className="flex justify-center p-5 bg-gray-100 text-black">
                    <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                        <p>Loading more images...</p>
                    </div>
                </div>
            )}

            {!data?.hasMore && hasSearched && allImages.length > 0 && !swrIsLoading && (
                <div className="flex justify-center p-5 bg-gray-200 text-black">
                    <p>No more images available</p>
                </div>
            )}

            {allImages.length === 0 && hasSearched && !swrIsLoading && (
                <div className="flex flex-col items-center justify-center min-h-screen">
                    <p className="text-gray-600 text-lg mb-2">No images found</p>
                </div>
            )}
        </>
    );
}

export default SearchImages;
