import Product from '../models/product.js';

export const getAllProductsStatic = async (req, res) => {
	const search = 'a';
	const products = await Product.find({})
		.sort('name')
		.select('name price')
		.limit(10)
		.skip(5);
	res.status(200).json({ products, nbHits: products.length });
};

export const getAllProducts = async (req, res) => {
	const { featured, company, name, sort, fields } = req.query;
	const queryObject = {};

	if (featured) {
		queryObject.featured = featured === 'true';
	}

	if (company) {
		queryObject.company = company;
	}

	if (name) {
		queryObject.name = { $regex: name, $options: 'i' };
	}

	//console.log(queryObject);

	let result = Product.find(queryObject);
	// sort
	if (sort) {
		const sortList = sort.split(',').join(' ');
		result = result.sort(sortList);
	} else {
		result = result.sort('createdAt');
	}

	// fields
	if (fields) {
		const fieldsList = fields.split(',').join(' ');
		result = result.select(fieldsList);
	}

	// pagination
	const page = Number(req.query.page) || 1;
	const limit = Number(req.query.limit) || 10;
	const skip = (page - 1) * limit;
	result = result.skip(skip).limit(limit);

	const products = await result;

	res.status(200).json({ products, nbHits: products.length });
};
