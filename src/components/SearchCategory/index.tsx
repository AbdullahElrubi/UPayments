import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import theme from '../../theme';
import { CategoryContext } from '../../contexts/CategoryContext';

export default function SearchCategory() {
    const { categories, selectedCategory, setSelectedCategory } = useContext(CategoryContext);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (categoryId: string) => {
        setAnchorEl(null);
        setSelectedCategory(categoryId);
    };
    return (
        <Box
            sx={{
                my: 4,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <Paper sx={{ bgcolor: theme.palette.secondary.main, height: 36, display: 'flex', alignItems: 'center' }}>Apple Watch,Samsung S21, Macbook Pro, ...</Paper>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                color="inherit"
                variant="outlined"
                endIcon={<ArrowDropDownIcon />}
                sx={{ bgcolor: theme.palette.secondary.main }}
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
                >
                    <MenuItem
                        selected={selectedCategory === '-1'}
                        onClick={() => handleClose('-1')}
                        sx={{
                            '&.Mui-selected': {
                                backgroundColor: '#ececec',
                                ':hover': {
                                    backgroundColor: '#ececec',
                                },
                            },
                        }}
                    >
                        Categories
                    </MenuItem>
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
        </Box>
    )
}