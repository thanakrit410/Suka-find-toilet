import { Document, model, Schema, SchemaOptions } from 'mongoose';

interface ILocationDocument extends Document {
    latitude: number;
    longitude: number;
    title: string;
    contact: string;
    cost: string;
    handicap: boolean;
    free: boolean;
    type: string;
    timeOpen: string;
    timeClose: string;
    toiletpicture: string;
}

const options: SchemaOptions = {
    toJSON: {
        transform(doc, ret) {
            // delete ret._id;
            // delete ret.password;
            // delete ret.salt;
            // delete ret.createAt;
            // delete ret.updateAt;
        },
    },
    timestamps: true,
};

const locationSchema = new Schema(
    {
        latitude: {
            type: Number,
            require: true,
        },
        longitude: {
            type: Number,
            require: true,
        },
        title: {
            type: String,
            require: true,
        },
        contact: {
            type: String,
            require: true,
        },
        cost: {
            type: String,
            require: true,
        },
        handicap: {
            type: Boolean,
            require: true,
        },
        free: {
            type: Boolean,
            require: true,
        },
        type: {
            type: String,
            require: true,
        },
        timeOpen: {
            type: String,
            require: true,
        },
        timeClose: {
            type: String,
            require: true,
        },
        toiletpicture: {
            type: String,
            require: false,
        },
    },
    options
);

const Location = model<ILocationDocument>('location', locationSchema);

export default Location;
