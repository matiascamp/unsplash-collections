'use client'
import { useCollectionsWithFetch, useImages, useIsLoading, useStoreActions } from "@/store/hooks"
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Loader from "./Loader";
import DynamicImage from "./dynamicImage";

const AddToCollections = () => {
    const collectionsImages = useCollectionsWithFetch();
    const images = useImages();
    const isLoading = useIsLoading();
    const { fetchCollections } = useStoreActions();

    const [query, setQuery] = useState("")
    const [debouncedQuery, setDebouncedQuery] = useState(query)
    const { id } = useParams()
    const [loadingCollectionId, setLoadingCollectionId] = useState<string | null>(null);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query)
        }, 300)

        return () => {
            clearTimeout(handler)
        }
    }, [query])

    const filteredCollections = useMemo(() => {
        if (!debouncedQuery) return collectionsImages
        return collectionsImages.filter((collection) => collection.collectionName.toLowerCase().includes(debouncedQuery.toLowerCase()))
    }, [collectionsImages, debouncedQuery])

    const handleAddImage = async (collectionId: string) => {
        setLoadingCollectionId(collectionId);
        const image = images.find((image) => image.id === id);
        try {
            await fetch(`/api/collections/${collectionId}/images`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    collectionUrls: {
                        imageId: id,
                        urls: image?.urls
                    }
                })
            });
            await fetchCollections();
        } catch (error) {
            console.error("Error to add image", error);
        } finally {
            setLoadingCollectionId(null);
        }
    };
    

    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Add to Collections</h3>
            </div>
            <div className="space-y-4">
                <div className="flex items-center relative border border-[#E5E7EB] outline-none rounded-lg w-full focus:outline-none">
                    <input
                        type="text"
                        placeholder="Search collections..."
                        className="w-full p-4 outline-none focus:outline-none"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        {isLoading ?
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500"></div>
                            : <Image src='/Search.svg' alt="search image" width={20} height={20} />}
                    </div>
                </div>
                <div className="max-h-[400px] overflow-y-auto">
                    {(filteredCollections && debouncedQuery !== '') && <div>{filteredCollections.length < 2 ? filteredCollections.length + ' match' : filteredCollections.length + ' matches'} </div>}
                    {
                        filteredCollections.length > 0 ? (

                            filteredCollections.map((collection) =>
                                <div key={collection._id} className='flex gap-3 py-2 items-center'>
                                    {loadingCollectionId === collection._id ? (
                                        <Loader />
                                    ) : (
                                        <>
                                            {collection.collectionUrls[0]
                                                ? <DynamicImage src={collection.collectionUrls[0].urls.thumb} alt={"thumb photo"} width={15} height={15} className={"rounded-md h-15 w-full min-w-15 max-w-15 object-fit"} />
                                                : <div className="bg-gray-200 w-full min-w-15 max-w-15 h-15 rounded-md"></div>
                                            }
                                            <div className="w-full flex justify-between">
                                                <div className="flex flex-col">
                                                    {collection.collectionName}
                                                    {collection.collectionUrls.length < 2
                                                        ? <span>{collection.collectionUrls.length} photo</span>
                                                        : <span>{collection.collectionUrls.length} photos</span>
                                                    }
                                                </div>
                                                <button className="cursor-pointer" onClick={() => handleAddImage(collection._id)}>
                                                    + Add to Collection
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            )
                        ) :
                            <p className="text-gray-500 text-center">No collections found</p>
                    }
                </div>
            </div>
        </>
    )
}

export default AddToCollections