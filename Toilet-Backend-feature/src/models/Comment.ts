import { Document, model, ObjectId, Schema, SchemaOptions } from 'mongoose';

interface ICommentDocument extends Document {
    toiletId: ObjectId;
    createBy: ObjectId;
    comment: string;
    rate: number;
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

const commentSchema = new Schema(
    {
        createBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            require: true,
        },
        toiletId: {
            type: Schema.Types.ObjectId,
            ref: 'Toilet',
            require: true,
        },
        comment: {
            type: String,
            require: true,
        },
        rate: {
            type: Number,
            require: true,
        },
    },
    options
);

const Comment = model<ICommentDocument>('Comments', commentSchema);

export default Comment;
