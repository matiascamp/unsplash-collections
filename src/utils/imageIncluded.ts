export const ImageIncluded = (collections,id) => {
    return collections.filter(collection =>
        collection.collectionUrls.some(image => image.imageId === id)
    );
}