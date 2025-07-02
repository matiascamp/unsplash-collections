'use client'
import DynamicImage from "@/components/dynamicImage";
import dynamic from "next/dynamic";
import { CollectionsProps } from "@/interfaces/images";
import { useImages, useCollectionsWithFetch, useStoreActions } from "@/store/hooks";
import { ImageIncluded } from "@/utils/imageIncluded";
import { useParams } from "next/navigation";
import { useState } from "react";

const Modal = dynamic(() => import("@/components/modal"), { ssr: false });

const ImageDetail = () => {
    const images = useImages();
    const collectionsImages = useCollectionsWithFetch();
    
    const { fetchCollections } = useStoreActions();

    const { id } = useParams()

    const [show, setShow] = useState(false)

    const image = images.find((image) => image.id === id)
    const date = new Date(image?.created_at || "")

    const handleModal = () => {
        setShow(!show);
    }

    const collectionsWithImage = ImageIncluded(collectionsImages, id)

    const handleDelete = async (collectionId: string, imageId: string) => {
        await fetch(`/api/collections/${collectionId}/images/${imageId}`, {
            method: 'DELETE',
        })
        await fetchCollections()
    }

    const handleDownload = async () => {
        try {
            if (!image) return
            const response = await fetch(image.urls.full, { mode: 'cors' });
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = `${image?.id}.jpg`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading image:', error);
        }
    };

    return (
        <main className="max-w-full w-[100%] h-screen px-(--image-individual) pb-(--image-individual) pt-(--custom-height-image-individual) z-1">
            {
                image && (
                    <div className="flex justify-center h-full mx-auto gap-10 xs:flex-col xs:w-full xs:h-screen xs:mt-10 sm:flex-col sm:w-full sm:h-screen sm:mt-10 md:w-[70%] md:mt-0 lg:flex-row lg:w-full lg:h-full">
                        <div className="w-full  h-full max-w-[600px]">
                            <DynamicImage className={"w-full h-full object-cover rounded-md md:min-h-full"} src={image?.urls?.full} alt={image?.alt_description} width={image.width} height={image.height} />
                        </div>
                        <div className="w-1/2 flex flex-col gap-6 sm:w-full sm:pb-10 xs:w-full xs:pb-10">
                            <div className="flex items-center gap-3">
                                <DynamicImage className={"rounded-full"} src={image.user.profile_image.small} alt={image.user.username} width={32} height={32} />
                                <h1 className="text-sm font-semibold">{image.user.first_name} {image.user.last_name}</h1>
                            </div>
                            <div>
                                <p className="text-xs">Published on {date.toDateString()}</p>
                            </div>
                            <div className="flex gap-5">
                                <button className="bg-[#E5E7EB] py-3 px-4 rounded-sm text-md text-black text-bold cursor-pointer flex gap-3 text-sm font-semibold items-center" onClick={handleModal}><DynamicImage src={"/Plus.svg"} alt={"plus icon"} width={15} height={15} /> Add to collection</button>
                                <button className="bg-[#E5E7EB] py-3 px-4 rounded-sm text-md text-black cursor-pointer flex gap-3 text-sm font-semibold items-center" onClick={handleDownload}><DynamicImage src={"/down_arrow.svg"} alt={"dowload icon"} width={15} height={15} /> Download</button>
                            </div>
                            <div>
                                {collectionsWithImage && (
                                    <div className="w-full">
                                        <h3 className="mb-2 font-bold text-xl">Collections</h3>
                                        {collectionsWithImage.map((collections: CollectionsProps) => (
                                            <button key={collections._id} className="flex items-center w-full relative gap-5 p-2 rounded-md cursor-pointer hover:bg-gray-200  z-20" onClick={() => handleDelete(collections._id, collections.collectionUrls[0].imageId)} >
                                                <DynamicImage className={"rounded-md w-15 h-15"} src={collections.collectionUrls[0].urls.thumb} alt={"thumb collection Image"} width={50} height={50} />
                                                <div className="flex flex-col items-start">
                                                    <span className="text-regular font-semibold">
                                                        {collections.collectionName}
                                                    </span>
                                                    <span className="text-sm tracking-tight">
                                                        {collections.collectionUrls.length} photos
                                                    </span>
                                                </div>
                                                <div className="absolute top-0 h-full w-full text-end pr-7  pt-6 opacity-0 hover:opacity-100 z-30">
                                                    - Remove
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <Modal isOpen={show} onClose={() => setShow(false)} />
                        </div>
                    </div>
                )
            }
        </main>
    )
}

export default ImageDetail;
