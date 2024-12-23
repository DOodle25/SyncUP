import { Stack, Typography } from "@mui/material";


export default function Huddles()
{
    return (
        <>
            <Stack width={"100%"} justifyContent={"center"} alignItems={"center"} height={"100%"} sx={{backgroundColor:"white"}}>
                <Typography variant="h1" sx={{fontFamily:"lato",color:"rgba(255,255,255,0.5"}}> Huddles</Typography>
            </Stack>
        </>
    )
}