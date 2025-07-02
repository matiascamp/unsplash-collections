'use client'
import dynamic from 'next/dynamic'

const CollectionGrid = dynamic(() => import('./collectionGrid'), { ssr: false });

export default CollectionGrid; 