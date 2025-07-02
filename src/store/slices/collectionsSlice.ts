import { CollectionsProps } from '@/interfaces/images'
import { SetState } from '@/store/types';

type CollectionsState = {
    collectionsImages: CollectionsProps[]
}

type CollectionsActions = {
    setCollections: (collections: CollectionsProps[]) => void
    fetchCollections: () => Promise<CollectionsProps[]>
}

export const createCollectionsSlice = (set: SetState): CollectionsState & CollectionsActions => ({
    collectionsImages: [],
    
    setCollections: (collections: CollectionsProps[]) => set({ collectionsImages: collections }),
    fetchCollections: async () => {
        try {
            const response = await fetch('/api/collections')
            if (!response.ok) {
                throw new Error('Error to fetch collections')
            }
            const { result } = await response.json()
            set({ collectionsImages: result })
            return result
        } catch (error) {
            console.error('Error fetching collections:', error)
            throw error
        }
    }
}) 