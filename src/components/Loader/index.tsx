import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
export default function Loader() {
    return (
        <Box sx={{
            my: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }}
        >
            <CircularProgress size={100} thickness={4} color="success" />
        </Box>
    )
}