import { Stack, Typography, CircularProgress} from "@mui/material";

export default function LoadingScreen()
{
    return (
        <>
            <Stack width={"100vw"} direction={"row"} height={"100vh"} justifyContent={"center"} alignItems={"center"} boxSizing={"border-box"}>
                <Stack direction={"column"} justifyContent={"center"} alignItems={"center"} gap={5}>
                    <CircularProgress size={"80px"}/>
                    <Typography variant="h2" fontFamily={"lato"}>Launching your workspace</Typography>
                </Stack>
            </Stack>
        </>
    )
}