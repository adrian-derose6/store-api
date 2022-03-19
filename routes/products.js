import express from 'express';
import {
	getAllProducts,
	getAllProductsStatic,
} from '../controllers/products.js';

const productsRouter = express.Router();

productsRouter.route('/').get(getAllProducts);
productsRouter.route('/static').get(getAllProductsStatic);

export default productsRouter;
