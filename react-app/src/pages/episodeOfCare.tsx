import { Box, Divider, Typography } from "@mui/material"
import { useGetEpisodeOfCareQuery } from "../feature/api/episodeOfCares";

export function EpisodeOfCare() {
    // TODO: Fix hardkodet id, få den fra params i stedet
    const id : number = 118337;
    const { data: episodeOfCare, isLoading } = useGetEpisodeOfCareQuery(id);

    console.log(episodeOfCare);

    return (
        <>
            <Typography variant="h4">{isLoading ? <p>Loading...</p> : episodeOfCare?.uuid}</Typography>

            <Divider />

            <Box sx={{
                width: '100%',
                bgcolor: "#d5e6f7",
                paddingTop: "0.1em",
                paddingLeft: "0.5em"
            }}>
            {
                isLoading ? <></> :
                <>
                    <p>Id: {episodeOfCare?.uuid}</p>
                    <p>Status: {episodeOfCare?.status}</p>
                    <p>Patient id: {episodeOfCare?.patientId}</p>
                </>
            }
            </Box>
            
        </>
    )
}
