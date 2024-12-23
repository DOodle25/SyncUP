import { Stack, Typography } from "@mui/material";

export default function Threads()
{
    return <>
        <Stack direction={"row"} justifyContent={"center"} alignItems={"center"}>
            <Typography sx={{fontFamily:"lato",fontSize:"30px",fontWeight:700}}>
                Threads
            </Typography>
        </Stack>
    </>
}