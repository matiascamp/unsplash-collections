import { CollectionsProps } from './../interfaces/images';


export const ImageIncluded = (collections:CollectionsProps[],id:string | string[]) => {
    return collections.filter(collection =>
        collection.collectionUrls.some(image => image.imageId === id)
    );
}