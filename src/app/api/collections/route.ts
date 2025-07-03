import CollectionImages from "@/models/collectionImages"
import { CollectionSchema } from "@/schemas/collectionImage"
import { connectDb } from "@/utils/mongoose"
import { NextResponse } from "next/server"

export const GET = async () => {
    try {
        console.log('=== API GET Started ===');
        console.log('Environment check:');
        console.log('- MONGODB_URI exists:', !!process.env.MONGODB_URI);
        console.log('- MONGODB_URI length:', process.env.MONGODB_URI?.length || 0);
        console.log('- NODE_ENV:', process.env.NODE_ENV);

        console.log('Attempting to connect to database...');
        await connectDb();
        console.log('Database connection successful');

        console.log('Querying CollectionImages...');
        const result = await CollectionImages.find();
        console.log('Query completed. Results found:', result.length);
        console.log('First result (if any):', result[0] || 'No results');

        // Cambié la validación porque un array vacío no debería usar Object.keys
        if (result.length === 0) {
            console.log('No collections found, returning 404');
            return NextResponse.json({
                message: "collections not found"
            }, {
                status: 404
            });
        }

        console.log('Returning successful response with', result.length, 'items');
        return NextResponse.json({
            result
        }, {
            status: 200
        });

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