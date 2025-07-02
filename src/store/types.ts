import { UnsplashImage, CollectionsProps } from '@/interfaces/images'

export interface StoreState {
    images: UnsplashImage[]
    hasMore: boolean
    isLoading: boolean
    currentPage: number
    
    collectionsImages: CollectionsProps[]
}

export interface StoreActions {
    setImages: (images: UnsplashImage[]) => void
    addImages: (images: UnsplashImage[]) => void
    resetImages: () => void
    setIsLoading: (loading: boolean) => void
    setHasMore: (hasMore: boolean) => void
    setCurrentPage: (page: number) => void
    
    setCollections: (collections: CollectionsProps[]) => void
    fetchCollections: () => Promise<CollectionsProps[]>
}

export type Store = StoreState & StoreActions

export type SetState = (
    partial: Store | Partial<Store> | ((state: Store) => Store | Partial<Store>),
    replace?: false | undefined
) => void

export type GetState = () => Store 