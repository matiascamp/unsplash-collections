import { Store } from './store'
import * as selectors from './selectors'
import { UnsplashImage, CollectionsProps } from '@/interfaces/images'
import { useEffect, useState, useMemo } from 'react'

export const useImages = (): UnsplashImage[] => Store(selectors.selectImages)
export const useIsLoading = (): boolean => Store(selectors.selectIsLoading)
export const useHasMore = (): boolean => Store(selectors.selectHasMore)
export const useCurrentPage = (): number => Store(selectors.selectCurrentPage)
export const useImageCount = (): number => Store(selectors.selectImageCount)

export const useCollections = (): CollectionsProps[] => Store(selectors.selectCollections)
export const useCollectionCount = (): number => Store(selectors.selectCollectionCount)

export const useCollectionsWithFetch = (): CollectionsProps[] => {
    const collections = Store(selectors.selectCollections)
    const { fetchCollections } = Store()
    
    useEffect(() => {
        if (collections.length === 0) {
            fetchCollections().catch(console.error)
        }
    }, [collections.length, fetchCollections])
    
    return collections
}

export const useCollectionsState = () => {
    const collections = Store(selectors.selectCollections)
    const collectionCount = Store(selectors.selectCollectionCount)
    const { fetchCollections } = Store()
    const [isLoadingCollections, setIsLoadingCollections] = useState(false)
    
    const loadCollections = async () => {
        if (collections.length === 0 && !isLoadingCollections) {
            setIsLoadingCollections(true)
            try {
                await fetchCollections()
            } catch (error) {
                console.error('Error loading collections:', error)
            } finally {
                setIsLoadingCollections(false)
            }
        }
    }
    
    useEffect(() => {
        loadCollections()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [collections.length])
    
    return { 
        collections, 
        collectionCount, 
        isLoadingCollections, 
        loadCollections 
    }
}

export const useSearchState = () => {
    const images = Store(selectors.selectImages)
    const isLoading = Store(selectors.selectIsLoading)
    const hasMore = Store(selectors.selectHasMore)
    const currentPage = Store(selectors.selectCurrentPage)
    const imageCount = Store(selectors.selectImageCount)
    
    return { images, isLoading, hasMore, currentPage, imageCount }
}

export const useIsSearchEmpty = (): boolean => Store(selectors.selectIsSearchEmpty)
export const useCanLoadMore = (): boolean => Store(selectors.selectCanLoadMore)

export const useCollectionById = (id: string): CollectionsProps | undefined => Store(selectors.selectCollectionById(id))

export const useImagesByPage = (page: number): UnsplashImage[] => {
    const selector = useMemo(() => selectors.selectImagesByPage(page), [page])
    return Store(selector)
}

export const useStoreActions = () => {
    const store = Store()
    return {
        setImages: store.setImages,
        addImages: store.addImages,
        resetImages: store.resetImages,
        setIsLoading: store.setIsLoading,
        setHasMore: store.setHasMore,
        setCurrentPage: store.setCurrentPage,
        setCollections: store.setCollections,
        fetchCollections: store.fetchCollections,
    }
} 