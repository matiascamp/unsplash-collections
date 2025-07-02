import { ImageIncluded } from "../imageIncluded";
import { describe, it, expect } from "vitest";

describe('ImageIncluded',() => {
    it('devuelve las colecciones que contienen la imagen',() => {
        const collections = [
            {_id: '1',collectionUrls:[{imageId:'a'}]},
            {_id: '2',collectionUrls:[{imageId:'b'}]},
        ]
        expect(ImageIncluded(collections,'a')).toHaveLength(1)
        expect(ImageIncluded(collections,'a')[0]._id).toBe('1')
    })

    it('devuelve un array vacío si ninguna colección contiene la imagen', () => {
        const collections = [
            { _id: '1', collectionUrls: [{ imageId: 'b' }] },
            { _id: '2', collectionUrls: [{ imageId: 'c' }] },
        ];
        expect(ImageIncluded(collections, 'a')).toHaveLength(0);
    });

    it('devuelve varias colecciones si la imagen está en más de una', () => {
        const collections = [
            { _id: '1', collectionUrls: [{ imageId: 'a' }] },
            { _id: '2', collectionUrls: [{ imageId: 'a' }] },
            { _id: '3', collectionUrls: [{ imageId: 'b' }] },
        ];
        const result = ImageIncluded(collections, 'a');
        expect(result).toHaveLength(2);
        expect(result.map((c: { _id: string }) => c._id)).toEqual(['1', '2']);
    });

    it('no falla si collectionUrls está vacío', () => {
        const collections = [
            { _id: '1', collectionUrls: [] },
            { _id: '2', collectionUrls: [{ imageId: 'a' }] },
        ];
        const result = ImageIncluded(collections, 'a');
        expect(result).toHaveLength(1);
        expect(result[0]._id).toBe('2');
    });

    it('devuelve un array vacío si collections está vacío', () => {
        expect(ImageIncluded([], 'a')).toHaveLength(0);
    });
})