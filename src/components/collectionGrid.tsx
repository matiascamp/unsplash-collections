'use client'
import React, { useState } from 'react';
import PhotoCollection from '@/utils/photosCollection';
import { CollectionsProps } from '@/interfaces/images';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';

type CollectionGridProps = {
    collectionsImages: CollectionsProps[]
}

const Modal = dynamic(() => import('./modal'), { ssr: false });

const CollectionGrid = ({ collectionsImages }: CollectionGridProps) => {
    const [show, setShow] = useState(false)

    const handleModal = () => {
        setShow(!show)
    }
    

    return (
        <div className="min-h-screen w-full">
            <div className="max-w-7xl p-15 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 grid-rows-[320px]">
                    {collectionsImages.map((collection) => (
                        <Link href={`/collections/${collection._id}`} key={collection._id} className="h-full">
                            <PhotoCollection
                                title={collection.collectionName}
                                photos={collection.collectionUrls}
                                photoCount={collection.collectionUrls.length}
                            />
                        </Link>
                    ))}
                    <div className="h-73">
                        <button 
                            className="w-full h-full bg-gray-200 rounded-lg flex flex-col items-center justify-center p-10 cursor-pointer gap-5" 
                            onClick={handleModal}
                        >
                            <Image className="color-gray-500 text-gray-500" src='/Plus.svg' alt="add image" width={30} height={30} />
                            <p className='text-2xl text-gray-500'>Add new collection</p>
                        </button>
                    </div>
                </div>
            </div>
            <Modal isOpen={show} onClose={() => setShow(false)} />
        </div>
    );
};

export default CollectionGrid;