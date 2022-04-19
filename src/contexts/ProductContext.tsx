import { createContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from 'next/router';
import api from "../services/api";
import { IProductData } from "../types/products";
import { useContext } from "react";
import { CategoryContext } from "./CategoryContext";

interface IProductContextProps {
    products: IProductData[] | null;
    isLoading: boolean;
    addProduct: (product: IProductData) => void;
}
interface ProductContextProviderProps {
    children: ReactNode;
}

const initialProductsState: IProductData[] = [];

export const ProductContext = createContext<IProductContextProps>({} as IProductContextProps);

export const ProductContextProvider = (props: ProductContextProviderProps) => {
    const { selectedCategory } = useContext(CategoryContext);
    const [products, setProducts] = useState<IProductData[] | null>(initialProductsState);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isNewProduct, setIsNewProduct] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsLoading(true);
        api.product.getAllProducts().then((data) => {
            let productsData = data;
            if (selectedCategory !== '-1') {
                productsData = data.filter((item) => item.category === selectedCategory);
            }
            setProducts(productsData);
            setIsLoading(false);
        }).catch(() => {
            setIsLoading(false);
        });
        setIsNewProduct(false);
    }, [isNewProduct, selectedCategory]);

    const addProduct = (product: IProductData) => {
        setIsLoading(true);
        api.product.addProduct(product).then((data) => {
            if (data.id !== '') {
                setIsNewProduct(true);
                router.push('/');
            }
            setIsLoading(false);
        })
    }

    return (
        <ProductContext.Provider value={{
            products,
            isLoading,
            addProduct,
        }}>
            {props.children}
        </ProductContext.Provider>

    );
};