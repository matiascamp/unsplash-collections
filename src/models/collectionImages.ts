import { Schema, model, models } from "mongoose";

const collectionSchema = new Schema({
    collectionName: {
        type: String,
        required: [true, 'Collection Name is required'],
        unique: true,
        trim: true
    },
    collectionUrls: {
        type: [{
            imageId: { type: String, required: true },
            urls: {
                type: {
                    raw: { type: String, required: true },
                    full: { type: String, required: true },
                    regular: { type: String, required: true },
                    small: { type: String, required: true },
                    thumb: { type: String, required: true },
                    small_s3: { type: String, required: true }
                },
                required: true
            }
        }],
        default: []
    }
},
    { timestamps: true }
)

export default models.CollectionImages || model('CollectionImages', collectionSchema)