import { describe, it, expect, vi, beforeEach } from "vitest";
import { SearchImages } from "../getAllImages";

global.fetch = vi.fn();
const mockFetch = fetch as unknown as ReturnType<typeof vi.fn>;

describe('SearchImages', () => {
    const mockResults = [{ id: '1', url: 'img1' }, { id: '2', url: 'img2' }];
    const mockResponse = {
        results: mockResults,
        total: 2,
        total_pages: 1
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('devuelve el formato correcto cuando la respuesta es exitosa', async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse
        });
        const data = await SearchImages('cat', 1, 2);
        expect(data).toEqual({
            images: mockResults,
            total: 2,
            total_pages: 1,
            hasMore: false
        });
    });

    it('lanza un error si la respuesta no es ok', async () => {
        mockFetch.mockResolvedValueOnce({
            ok: false,
            status: 500
        });
        await expect(SearchImages('cat', 1, 2)).rejects.toThrow('Error en la búsqueda: 500');
    });

    it('lanza un error si fetch falla', async () => {
        mockFetch.mockRejectedValueOnce(new Error('Network error'));
        await expect(SearchImages('cat', 1, 2)).rejects.toThrow('Network error');
    });
}); 