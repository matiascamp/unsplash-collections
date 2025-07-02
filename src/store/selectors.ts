import { UnsplashImage, CollectionsProps } from '@/interfaces/images'


type StoreState = {
    images: UnsplashImage[]
    hasMore: boolean
    isLoading: boolean
    currentPage: number
    collectionsImages: CollectionsProps[]
}


export const selectImages = (state: StoreState): UnsplashImage[] => state.images
export const selectIsLoading = (state: StoreState): boolean => state.isLoading
export const selectHasMore = (state: StoreState): boolean => state.hasMore
export const selectCurrentPage = (state: StoreState): number => state.currentPage


export const selectCollections = (state: StoreState): CollectionsProps[] => state.collectionsImages

export const selectImageCount = (state: StoreState): number => state.images.length
export const selectLastImage = (state: StoreState): UnsplashImage | undefined => state.images[state.images.length - 1]
export const selectFirstImage = (state: StoreState): UnsplashImage | undefined => state.images[0]
export const selectImagesByPage = (page: number) => (state: StoreState): UnsplashImage[] => {
    const imagesPerPage = 8
    const startIndex = (page - 1) * imagesPerPage
    return state.images.slice(startIndex, startIndex + imagesPerPage)
}


export const selectCollectionCount = (state: StoreState): number => state.collectionsImages.length
export const selectCollectionById = (id: string) => (state: StoreState): CollectionsProps | undefined => 
    state.collectionsImages.find((collection) => collection._id === id)


export const selectImagesFromState = (state: StoreState): UnsplashImage[] => state.images
export const selectIsLoadingFromState = (state: StoreState): boolean => state.isLoading
export const selectHasMoreFromState = (state: StoreState): boolean => state.hasMore
export const selectCurrentPageFromState = (state: StoreState): number => state.currentPage
export const selectImageCountFromState = (state: StoreState): number => state.images.length

export const selectCollectionsFromState = (state: StoreState): CollectionsProps[] => state.collectionsImages
export const selectCollectionCountFromState = (state: StoreState): number => state.collectionsImages.length

export const selectIsSearchEmpty = (state: StoreState): boolean => state.images.length === 0 && !state.isLoading
export const selectCanLoadMore = (state: StoreState): boolean => state.hasMore && !state.isLoading && state.images.length > 0 