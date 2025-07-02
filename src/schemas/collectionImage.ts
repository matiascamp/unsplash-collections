import {z} from 'zod'

export const CollectionSchema = z.object({
    collectionName: z.string().min(1,'Collection name is required'),
    collectionUrls: z.array(
        z.object({
            imageId: z.string(),
            urls:  z.object({
                full: z.string().url(),
                regular: z.string().url(),
                small: z.string().url(),
                thumb: z.string().url(),
                small_s3: z.string().url().optional()
            })
        })
    ).optional()
})