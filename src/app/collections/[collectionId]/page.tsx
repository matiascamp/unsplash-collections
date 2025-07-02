import DynamicImage from "@/components/dynamicImage";
import { CollectionsProps,ImageProps } from "@/interfaces/images";

const getGridClasses = (imageCount:number) => {
    const baseClasses = "grid gap-4 justify-center mx-auto";

    if (imageCount === 1) {
        return `${baseClasses} grid-cols-1 max-w-sm`;
    }
    if (imageCount === 2) {
        return `${baseClasses} grid-cols-1 sm:grid-cols-2 max-w-2xl`;
    }
    if (imageCount === 3) {
        return `${baseClasses} grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-4xl`;
    }
    if(imageCount === 4) {
        return `${baseClasses} grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl`;
    }

    return "columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 mx-auto max-w-screen"
};


const  UniqueCollection = async ({ params }: { params: Promise<{ collectionId: string }>}) => {
    
    const { collectionId } = await params;

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    const res = await fetch(`${baseUrl}/api/collections`);
    
    if (!res.ok) {
        return <div className="flex justify-center items-center w-full h-screen">Error to fetch collection</div>;
    }

    const collections = await res.json();
    
    const findCollection = collections.result.find((collection:CollectionsProps) => collection._id === collectionId)
    

    return (
        <div className="max-w-full w-full h-screen pt-(--custom-height-collections) px-5">
            {
                findCollection && (
                    <>
                        <div className="w-full flex flex-col items-center pb-5">
                            <h1 className="font-bold text-4xl mb-4 bg-gradient-to-r from-[#F2C593] to-[#8A3282] bg-clip-text text-transparent">{findCollection.collectionName}</h1>
                            <h3 className="font-thin tracking-tighter">{findCollection.collectionUrls.length < 2 ? findCollection.collectionUrls.length + ' photo' : findCollection.collectionUrls.length + ' photos'}</h3>
                        </div>
                        <div   className={getGridClasses(findCollection.collectionUrls.length)}>
                            {findCollection.collectionUrls.map((element:ImageProps) => (
                                <div key={element.imageId} className={findCollection.collectionUrls.length < 5 ? "justify-self-center" : "break-inside-avoid"}>
                                    <DynamicImage
                                        className={"w-full h-auto mb-5  object-cover rounded-md"}
                                        alt={`image collection ${element.imageId}`}
                                        src={element.urls.full}
                                        width={1000}
                                        height={1000}
                                    />
                                </div>
                            ))}
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default UniqueCollection
