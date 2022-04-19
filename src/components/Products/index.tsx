import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { ProductContext } from '../../contexts/ProductContext';
import ProductItem from '../ProductItem';

export default function Products() {
    const { products } = useContext(ProductContext);
    return (
        <Box
            sx={{
                flexGrow: 1,
                my: 4,
            }}
        >
            <Grid container spacing={2}>
                {products && products.length > 0 && products.map((product) => (
                    <ProductItem key={product.id} product={product} />
                ))}
            </Grid>
        </Box>
    )
}