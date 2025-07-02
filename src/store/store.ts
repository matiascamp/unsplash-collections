import { create } from 'zustand'
import { persist } from "zustand/middleware";
import { createImagesSlice } from './slices/imagesSlice'
import { createCollectionsSlice } from './slices/collectionsSlice'
import { Store as StoreType } from './types'

export const Store = create<StoreType>()(
    persist(
        (set) => ({
            ...createImagesSlice(set),
            ...createCollectionsSlice(set),
        }),
        {
            name: 'unsplash-store',
            partialize: (state) => ({
                images: state.images.slice(-20), 
                currentPage: state.currentPage,
                collectionsImages: state.collectionsImages,
            }),
        }
    )
)