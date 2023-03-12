import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Comment from '../models/Comment';
import User from '../models/User';

export const createComment = async (req: Request, res: Response) => {
    console.log('createComment work!');
    const body = req.body;
    await Comment.create(body);
    res.status(201).json({
        message: 'created',
    });
};

// export const getComment = async (req: Request, res: Response) => {
//     console.log('getComment work!');

//     // const query = req.query;
//     // console.log('query: ', query);

//     const data = await Comment.find();
//     res.status(200).json({
//         message: 'success',
//         data: data,
//     });
// };

export const getComment = async (req: Request, res: Response) => {
    console.log('getComment work!');
    const query = req.query;
    console.log('getComment: ', query.toiletId);
    // const aom: any = await Comment.aggregate([
    //     {
    //         $lookup: {
    //             from: 'users',
    //             localField: 'createBy',
    //             foreignField: '_id',
    //             as: 'result',
    //         },
    //     },
    // ]);
    // console.log('data41', aom);
    // res.status(200).json({
    //     message: 'success',
    //     Comment: aom,
    // });
    const regexQuery = query.toiletId;
    console.log(regexQuery);
    try {
        if (query.toiletId !== '') {
            const regexQuery = query.toiletId;
            if (regexQuery) {
                console.log(regexQuery);
                const dataComment: any = await Comment.aggregate([
                    { $match: { toiletId: new mongoose.Types.ObjectId(regexQuery.toString()) } },
                    {
                        $lookup: {
                            from: 'users',
                            localField: 'createBy',
                            foreignField: '_id',
                            as: 'result',
                        },
                    },
                    { $sort: { createdAt: -1 } },
                ]);
                if (dataComment.length > 0) {
                    res.status(200).json({
                        message: 'success',
                        Comment: dataComment,
                    });
                    console.log(dataComment);
                } else {
                    console.log('No data');
                    res.status(400).json({ message: 'No results found' });
                }
            } else {
                console.log('regexQuery is undefined');
                res.status(400).json({ message: 'Invalid query' });
            }
        } else {
            console.log('No search');
            res.status(400).json({ message: 'Please enter place name' });
        }
    } catch (err) {
        console.log(err);
        res.status(500);
    }
};
