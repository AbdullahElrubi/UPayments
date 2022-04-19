import type { NextPage } from 'next';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import TopBar from '../src/components/TopBar';
import SearchCategory from '../src/components/SearchCategory';
import Products from '../src/components/Products';
import Link from '../src/Link';

const Home: NextPage = () => {
  return (
    <Container maxWidth="lg">
      <TopBar />
      <SearchCategory />
      <Products />
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          bgcolor: 'transparent',
          boxShadow: 'none',
        }}
        LinkComponent={Link}
        href="/createproduct"
      >
        <AddCircleSharpIcon sx={{ fontSize: 70 }} />
      </Fab>
    </Container>
  );
};

export default Home;
