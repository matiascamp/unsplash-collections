import CollectionImages from "@/models/collectionImages"
import { CollectionSchema } from "@/schemas/collectionImage"
import { connectDb } from "@/utils/mongoose"
import { NextResponse } from "next/server"

export const GET = async () => {
    try {
        await connectDb()
       
        const result = await CollectionImages.find()
 
        return NextResponse.json({
            result
        },
            {
                status: 200
            })
    } catch (error) {
        return NextResponse.json({
            message: error
        },
            { status: 400 })
    }
}


export const POST = async (request: Request) => {

    const data = await request.json()

    const parseResult = CollectionSchema.safeParse(data)
    if (!parseResult.success) {
        return NextResponse.json(
            { error: "Invalid data", details: parseResult.error.flatten() },
            { status: 400 }
        )
    }
    try {
        const newCollection = new CollectionImages(parseResult.data);
        await newCollection.save();
        return NextResponse.json({ message: "Collection created" });
    } catch (error) {
        return NextResponse.json(
            { message: "Error trying to create collection", error },
            { status: 400 }
        );
    }
}