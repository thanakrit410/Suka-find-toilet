import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import expressSession from 'express-session';
import bodyParser from 'body-parser';

// dotenv.config({ path: '.env' });
// dotenv.config();
dotenv.config({ path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : `.env` });

import { connectMongoDB } from './config/mongoDB';
connectMongoDB();

import locationRouters from './routes/location';
import userRouters from './routes/userRoute';
import authRouters from './routes/authRoute';
import toiletRouters from './routes/toiletRoute';
import searchRouters from './routes/searchRoute';
import commentRouters from './routes/commentRoute';

declare module 'express-session' {
    interface SessionData {
        [key: string]: any;
    }
}
const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(
    expressSession({
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
    })
);
app.use(cors());
const PORT = process.env.PORT || 4000;

const appStart = () => {
    console.log('server is running', PORT);
    // console.log(`.env.${process.env.NODE_ENV}`);
};
app.get('/', (req, res) => {
    res.json({ messsage: 'hello' });
});

app.use('/auth', authRouters);
app.use('/location', locationRouters);
app.use('/user', userRouters);
app.use('/toilet', toiletRouters);
app.use('/search', searchRouters);
app.use('/comment', commentRouters);

app.listen(PORT, appStart);

console.log('Hello worlddddd');
