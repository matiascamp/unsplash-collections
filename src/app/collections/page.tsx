import { CollectionsProps } from "@/interfaces/images";
import CollectionGridClient from '@/components/CollectionGridClient';

const Collections = async () => {

    let baseUrl

    if (process.env.NODE_ENV === 'production') {
        baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `https://${process.env.VERCEL_URL}`
    } else {
        baseUrl = 'http://localhost:3000';
    }


    const res = await fetch(`${baseUrl}/api/collections`);


    if (!res.ok) {
        return <div>Error to load collections</div>;
    }

    const collections: { result: CollectionsProps[] } = await res.json();

    return (
        <main className="flex justify-center flex-col items-center pt-(--custom-height-image-individual) ">
            <div className="flex items-center flex-col">
                <h1 className="font-bold text-4xl mb-5 bg-gradient-to-r from-[#F2C593] to-[#8A3282] bg-clip-text text-transparent">Collections</h1>
                <p className="text-md max-w-sm text-center leading-5">Explore the world through collections of beatiful photos free to use under the <u className="font-bold">Unsplash License.</u></p>
            </div>
            <div className="flex flex-wrap w-full justify-center">
                {
                    collections && <CollectionGridClient collectionsImages={collections.result} />
                }

            </div>
        </main>
    )
}

export default Collections
