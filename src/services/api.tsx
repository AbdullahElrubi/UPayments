import Axios from './axios';
import {
  ADD_PRODUCT, DELETE_PRODUCT, GET_ALL_CATEGORIES, GET_ALL_PRODUCTS, GET_CATEGORY_BY_ID, GET_PRODUCT_BY_ID,
} from '../constants';
import { IProductData } from '../types/products';
import { ICategoryData } from '../types/categories';


const api = {
  categories: {
    getAllCategories: (): Promise<ICategoryData[]> => Axios.get(GET_ALL_CATEGORIES),
    getCategoryById: (id: string): Promise<ICategoryData> => Axios.get(GET_CATEGORY_BY_ID + id),
  },
  product: {
    getAllProducts: (): Promise<IProductData[]> => Axios.get(GET_ALL_PRODUCTS),
    getProductById: (id: string): Promise<IProductData> => Axios.get(GET_PRODUCT_BY_ID + id),
    addProduct: (product: IProductData): Promise<IProductData> => Axios.post(ADD_PRODUCT, product),
    deleteProduct: (id: string): Promise<IProductData> => Axios.delete(DELETE_PRODUCT + id),
  }
};

export default api;
