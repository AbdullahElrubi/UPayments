import { createContext, useState, useEffect, ReactNode } from "react";
import api from "../services/api";
import { ICategoryData } from "../types/categories";

interface ICategoryContextProps {
    categories: ICategoryData[] | null;
    selectedCategory: string;
    setSelectedCategory: (id: string) => void;
}
interface CategoryContextProviderProps {
    children: ReactNode;
}

export const CategoryContext = createContext<ICategoryContextProps>({} as ICategoryContextProps);

export const CategoryContextProvider = (props: CategoryContextProviderProps) => {
    const [categories, setCategories] = useState<ICategoryData[] | null>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('-1');

    useEffect(() => {
        api.categories.getAllCategories().then((data) => {
            setCategories(data);
        })
    }, []);

    return (
        <CategoryContext.Provider value={{
            categories,
            selectedCategory, setSelectedCategory,
        }}>
            {props.children}
        </CategoryContext.Provider>

    );
};