import { Request, Response } from 'express';
import User from '../models/User';
import { uploadImage } from '../utils/cloudinary';
// export const createLocation = async (req: Request, res: Response) => {
//     console.log('createLocation work!');
//     const body = req.body;
//     await Location.create(body);
//     res.status(201).json({
//         message: 'created'
//     });
// };

// export const User = mongoose.model('users')
export const updateUser = async (req: Request, res: Response) => {
    try {
        const uid = req.params.uid;
        const { secure_url } = await uploadImage(req.body.profile_picture);
        console.log(secure_url);
        // const picture_name = secure_url.split('/').pop();
        await User.findByIdAndUpdate(uid, {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phone: req.body.phone,
            // email: req.body.email,
            // password: req.body.password,
            // hash: req.body.hash,
            // salt: req.body.salt,
            profile_picture: secure_url,
        })

            .then((data) => {
                console.log(data);
                res.status(200).json({ data: data });
            })
            .catch((err) => {
                console.log('error', err);
                res.status(500).json({ message: 'server error' });
            });
    } catch (error) {
        console.log('error', error);
    }
    // const uid = req.params.uid;
    // const { secure_url } = await uploadImage(req.body);
    // console.log(secure_url);
    // const picture_name = secure_url.split('/').pop();
    // await User.findByIdAndUpdate(uid, {
    //     firstname: req.body.firstname,
    //     lastname: req.body.lastname,
    //     phone: req.body.phone,
    //     // email: req.body.email,
    //     // password: req.body.password,
    //     // hash: req.body.hash,
    //     // salt: req.body.salt,
    //     profile_picture: picture_name,
    // })

    //     .then((data) => {
    //         console.log(data);
    //         res.status(200).json({ data: data });
    //     })
    //     .catch((err) => {
    //         console.log('error', err);
    //         res.status(500).json({ message: 'server error' });
    //     });
};

export const deleteUser = async (req: Request, res: Response) => {
    User.findByIdAndRemove(req.body.id)
        .then((data) => {
            console.log(data);
            res.send(data);
        })
        .catch((err) => {
            console.log('error', err);
        });
};
