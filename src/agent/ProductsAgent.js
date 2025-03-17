import { requests } from './agent';

const ProductsAgent = {
  getProducts: () => requests.get('/getProducts'),
};

export default ProductsAgent;
