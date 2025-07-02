import collectionImages from "@/models/collectionImages"
import { connectDb } from "@/utils/mongoose"
import { NextResponse } from "next/server"

export const DELETE = async (__: Request, { params }: { params: Promise<{ imageId: string, collectionId: string }> }) => {
    await connectDb()

    const { imageId, collectionId } = await params

    try {
        const findCollection = await collectionImages.findById(collectionId)

        if (!findCollection) {
            return NextResponse.json({ error: "Collection not found" })
        }

        findCollection.collectionUrls = findCollection.collectionUrls.filter((image: { imageId: string }) => image.imageId !== imageId)

        await findCollection.save()

        return NextResponse.json({ success: true }, { status: 200 })

    } catch (error) {
        console.error(error)
        
        return NextResponse.json({ error: "Error deleting image from collection" }, { status: 500 })
    }
}