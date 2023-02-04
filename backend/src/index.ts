import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/user_routes';
// import { initDB } from './dbconfig';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
/**MIDDLEWARES */
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/health-check', (req: Request, res: Response) => {
	res.send('Rupi Backend, STATUS : OK');
});

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
})
app.use('/user', userRouter)

/**ROUTES */
// app.use('/account-details', userRouter)

// initDB().then(() => {
//     console.log("⚡️[database]: Sucessful connection initiated.")
//     app.listen(port, () => {
//         console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
//     })
// }).catch((err) => {
//     console.error(err)
// })