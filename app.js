import express from 'express';
import errorMiddleware from './middleware/error-handler.js';
import notFoundMiddleware from './middleware/not-found.js';
import 'express-async-errors';
import connectDB from './db/connect.js';
import productsRouter from './routes/products.js';
import dotenv from 'dotenv';

dotenv.config();

// async errors

const app = express();

// middleware
app.use(express.json());

// routes
app.get('/', (req, res) => {
	res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
});

// products route
app.use('/api/v1/products', productsRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 4000;

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);

		app.listen(port, console.log(`Server is listening on port ${port}...`));
	} catch (error) {
		console.log(error);
	}
};

start();
