import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import NumberFormat from 'react-number-format';
import { IProductData } from "../../types/products";
import Link from '../../Link';

interface ProductItemProps {
    product: IProductData;
}

export default function ProductItem(props: ProductItemProps) {
    const { product } = props;
    return (
        <Grid item xs={3}>
            <Card component={Link} href={`/product/${product.id}`} sx={{ maxWidth: 345, textDecoration: 'none' }}>
                <CardMedia
                    component="img"
                    height="300"
                    image={product.avatar}
                    alt={product.name}
                    sx={{
                        bgcolor: '#FFFFFF',
                        height: 300,
                        width: 250,
                        borderRadius: 3,
                        objectFit: 'contain',
                    }}
                />
                <CardContent>
                    <Typography variant="h6" color="text.secondary">
                        {product.name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        <NumberFormat
                            value={product.price}
                            prefix='$'
                            displayType='text'
                            thousandsGroupStyle="thousand"
                            decimalSeparator="."
                            thousandSeparator={true}
                            isNumericString={true}
                            fixedDecimalScale={true}
                            decimalScale={2}
                        />
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}