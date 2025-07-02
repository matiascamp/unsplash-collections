import { UnsplashImage } from '@/interfaces/images'
import { SetState, Store } from '@/store/types';

type ImagesState = {
    images: UnsplashImage[]
    hasMore: boolean
    isLoading: boolean
    currentPage: number
}

type ImagesActions = {
    setImages: (value: UnsplashImage[]) => void
    addImages: (value: UnsplashImage[]) => void
    resetImages: () => void
    setIsLoading: (value: boolean) => void
    setHasMore: (value: boolean) => void
    setCurrentPage: (value: number) => void
}

export const createImagesSlice = (set: SetState): ImagesState & ImagesActions => ({
    images: [],
    hasMore: true,
    isLoading: false,
    currentPage: 1,
    
    setImages: (images: UnsplashImage[]) => set({ images }),
    addImages: (newImages: UnsplashImage[]) => set((state: Store) => ({
        ...state,
        images: [...state.images, ...newImages]
    })),
    resetImages: () => set({ images: [] }),
    setIsLoading: (isLoading: boolean) => set({ isLoading }),
    setHasMore: (hasMore: boolean) => set({ hasMore }),
    setCurrentPage: (currentPage: number) => set({ currentPage }),
}) 