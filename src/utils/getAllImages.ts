export const SearchImages = async (query: string, page: number, per_page: number) => {
    try {
        const searchResult = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&page=${page}&per_page=${per_page}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept-Version': 'v1',
                'Authorization': 'Client-ID E7yslmH4ILCuy9fJrF2EI6yrQ24tKO5e1XH-cVGQbs0'
            }
        });

        if (!searchResult.ok) {
            throw new Error(`Error en la búsqueda: ${searchResult.status}`);
        }

        const data = await searchResult.json();

        return {
            images: data.results,
            total: data.total,
            total_pages: data.total_pages,
            hasMore: page < data.total_pages
        };
    } catch (error) {
        console.error('Error al buscar fotos:', error);
        throw error;
    }
}

