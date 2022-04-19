import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import NumberFormat from 'react-number-format';
import Custom404 from '../404';
import { IProductData } from '../../src/types/products';
import api from '../../src/services/api';
import TopBar from '../../src/components/TopBar';
import Loader from '../../src/components/Loader';

const Product: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<IProductData | null>(null);
  const [isLoading, setIsloading] = useState(true);
  useEffect(() => {
    setIsloading(true);
    if (id) {
      api.product.getProductById(id as string).then((data) => {
        if (data) {
          setIsloading(false);
          setProduct(data);
        } else setIsloading(false);
      })
    }
  }, [id]);
  if (isLoading) return <Loader />;
  if (!product) return <Custom404 />;
  return (
    <Container maxWidth="lg">
      <TopBar />
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Card
          sx={{
            width: '100%',
            maxWidth: 'md',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            bgcolor: 'transparent',
            boxShadow: 'none',
          }}>
          <CardMedia
            component="img"
            image={product.avatar}
            alt={product.name}
            sx={{
              borderRadius: 3,
              backgroundSize: '',
              objectFit: 'contain',
              bgcolor: '#FFFFFF',
              height: 375,
              width: 275
            }}
          />
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              ml: 2
            }}
          >
            <Typography variant="h4" color="#000" fontWeight={700}>
              {product.name}
            </Typography>
            <Typography variant="h5" color="#000" fontWeight={700}>
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
        <Divider
          sx={{
            my: 3,
            maxWidth: 'md',
            width: '100%',
            height: 2,
            borderWidth: 2,
            borderColor: '#9b9c99'
          }}
        />
        <Box sx={{ maxWidth: 'md', width: '100%' }}>
          <Typography variant="h4" mt={2} color="#000" maxWidth="md">
            Description
          </Typography>
          <Typography variant="body2" color="#000" maxWidth="md">
            {product.description}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Product;
