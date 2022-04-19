import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Link from '../../Link';

export default function TopBar() {
    return (
        <Box
            sx={{
                my: 4,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <AppBar position="static" sx={{ borderRadius: 1, fontStyle: 'italic' }} color="secondary">
                <Toolbar>
                    <Typography variant="h6" component={Link} href="/" color="#000" sx={{ flexGrow: 1, textDecoration: 'none' }}>
                        UPayments Store
                    </Typography>
                    <Button color="inherit" sx={{ fontStyle: 'italic' }}>Register</Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}