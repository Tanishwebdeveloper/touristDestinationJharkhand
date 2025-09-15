import MuiButton from '@mui/material/Button';


export default function CustomButton({icon, message}){
    return (
        <MuiButton 
            variant="outlined" 
            startIcon={icon}
            sx = {{
                borderColor: 'black', 
                color: 'black', 
                backgroundColor: 'white',
                borderRadius: '10px',
                '&:hover': {
                borderColor: 'black',      
                backgroundColor: 'rgba(255,255,255,0.7)',
        },
            }}
        >
            {message}
        </MuiButton>
    )
}