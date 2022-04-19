import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import TopBar from '../src/components/TopBar';
import { IProductData } from '../src/types/products';
import { CategoryContext } from '../src/contexts/CategoryContext';
import { ProductContext } from '../src/contexts/ProductContext';

const initialState = {
    name: '',
    avatar: '',
    developerEmail: 'elroby2015@gmail.com',
    price: '',
    description: '',
    category: '',
};
const initialFormErrors = {
    name: false,
    avatar: false,
    developerEmail: false,
    price: false,
    description: false,
    category: false,
};

export default function CreateProduct() {
    const { categories } = useContext(CategoryContext);
    const { addProduct } = useContext(ProductContext);
    const [formState, setFormState] = useState<IProductData>(initialState);
    const [formErrors, setFormErrors] = useState(initialFormErrors);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedCategory, setSelectedCategory] = useState('-1');
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (categoryId: string) => {
        setAnchorEl(null);
        setSelectedCategory(categoryId);
        setFormState((prev) => ({ ...prev, category: categoryId }))
    };

    const onValueChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, itemName: string) => {
        setFormState((prev) => ({ ...prev, [itemName]: event.target.value }));
    };

    const validateProductData = (): boolean => {
        let errors = { ...initialFormErrors };
        if (formState.name === '') errors.name = true;
        if (formState.description === '') errors.description = true;
        if (formState.avatar === '') errors.avatar = true;
        if (formState.category === '-1') errors.category = true;
        setFormErrors(errors);
        return !Object.values(errors).includes(true);
    }
    const addNewProduct = () => {
        if (validateProductData()) {
            addProduct(formState);
        }
    }
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
                <Box
                    component="form"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        '& .MuiTextField-root': { m: 1, width: '65ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Typography variant="h4" color="#000" mb={3}>Create Product</Typography>
                    <TextField
                        sx={{
                            bgcolor: '#FFF'
                        }}
                        required
                        value={formState.name}
                        error={formErrors.name}
                        onChange={(e) => onValueChange(e, 'name')}
                        variant="outlined"
                        id="name"
                        placeholder="Product name"
                    />
                    <TextField
                        sx={{
                            bgcolor: '#FFF'
                        }}
                        required
                        value={formState.description}
                        error={formErrors.description}
                        onChange={(e) => onValueChange(e, 'description')}
                        variant="outlined"
                        id="description"
                        placeholder="Description"
                        multiline
                        rows={4}
                    />
                    <TextField
                        sx={{
                            bgcolor: '#FFF'
                        }}
                        required
                        value={formState.avatar}
                        error={formErrors.avatar}
                        onChange={(e) => onValueChange(e, 'avatar')}
                        variant="outlined"
                        id="imageUrl"
                        placeholder="Image URL"
                    />
                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        variant="outlined"
                        endIcon={<ArrowDropDownIcon />}
                        color={formErrors.category ? 'error' : 'inherit'}
                        sx={{
                            bgcolor: '#FFF',
                            width: '97%',
                        }}
                    >
                        {selectedCategory !== '-1' ? categories?.find(item => item.id === selectedCategory)?.name : 'Categories'}
                    </Button>
                    {categories && categories.length > 0 && (
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={() => handleClose(selectedCategory)}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                        >
                            {categories.map((category) => (
                                <MenuItem
                                    selected={category.id === selectedCategory}
                                    key={category.id}
                                    onClick={() => handleClose(category.id)}
                                    sx={{
                                        '&.Mui-selected': {
                                            backgroundColor: '#ececec',
                                            ':hover': {
                                                backgroundColor: '#ececec',
                                            },
                                        },
                                    }}
                                >
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Menu>
                    )}
                    <TextField
                        sx={{
                            bgcolor: '#FFF'
                        }}
                        required
                        value={formState.price}
                        error={formErrors.price}
                        onChange={(e) => onValueChange(e, 'price')}
                        variant="outlined"
                        id="price"
                        placeholder="Price"
                    />
                    <Button onClick={addNewProduct} sx={{ textTransform: 'none' }} variant="contained">
                        Submit
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}