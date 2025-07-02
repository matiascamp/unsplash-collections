import { SearchImages } from "@/utils/getAllImages"
import { NextResponse } from "next/server"
import { ImageQuerySchema } from "@/schemas/imageQuery";


export const GET = async (request: Request) => {
    const { searchParams } = new URL(request.url)

    const parseResult = ImageQuerySchema.safeParse({
        query: searchParams.get("query"),
        page: searchParams.get("page"),
        per_page: searchParams.get("per_page")
      });
    
      if (!parseResult.success) {
        return NextResponse.json(
          { error: "Invalid query params", details: parseResult.error.flatten() },
          { status: 400 }
        );
      }



    const { query, page, per_page } = parseResult.data;
    try {
        const { hasMore, images, total, total_pages } = await SearchImages(query, page, per_page)

        return NextResponse.json({
            hasMore,
            images,
            total,
            total_pages
        },
            {
                status: 200
            }
        )

    } catch (error) {
        console.error('Error en API route:', error);
        return NextResponse.json(
            { message: 'Error al buscar imágenes' },
            { status: 500 }
        );
    }
}