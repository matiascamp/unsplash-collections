import { NextResponse } from "next/server";
import CollectionImages from "@/models/collectionImages";
import { ImageProps } from "@/interfaces/images";

export const POST = async (request: Request, { params }: { params: Promise<{ collectionId: string }> }) => {
    try {
        const { collectionId } = await params;
        const { collectionUrls } = await request.json();

        const collection = await CollectionImages.findById(collectionId);
        
        if (!collection) {
            return NextResponse.json(
                { error: "Collection not found" },
                { status: 404 }
            );
        }


        const imageExists = collection.collectionUrls.some(
            (img: ImageProps) => img.imageId === collectionUrls.imageId
        );

        if (imageExists) {
            return NextResponse.json(
                { error: "Image already exists in collection" },
                { status: 400 }
            );
        }

        collection.collectionUrls.push(collectionUrls);


        await collection.save();
        
        return NextResponse.json(
            { 
                message: "Image added to collection successfully"
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error adding image to collection:", error);
        return NextResponse.json(
            { error: "Error adding image to collection" },
            { status: 500 }
        );
    }
}