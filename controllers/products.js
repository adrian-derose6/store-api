export const getAllProductsStatic = async (req, res) => {
	throw new Error('Testing async errors');
	res.status(200).json({ msg: 'Products testing route' });
};

export const getAllProducts = async (req, res) => {
	res.status(200).json({ msg: 'Products route' });
};
