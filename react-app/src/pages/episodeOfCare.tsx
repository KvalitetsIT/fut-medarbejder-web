import { Box, Divider, Typography } from "@mui/material"
import { useParams } from "react-router-dom";
import { Patient } from "../components/Patient";
import { useGetEpisodeOfCareQuery } from "../feature/api/episodeOfCares";
import { useGetPatientQuery } from "../feature/api/patients";

export function EpisodeOfCare() {
    const { id, careTeamId } = useParams();
    const eocId = parseInt(id || "0");
    const { data: episodeOfCare, isLoading } = useGetEpisodeOfCareQuery(eocId);

    const patientId = episodeOfCare?.patientId || "";
    

    if (isLoading) {
        return <p>Loading...</p>;
    } else return (
        <>
            <Typography variant="h4">Episode of Care</Typography>

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
                    
                    <Patient patientId={patientId} careTeamId={careTeamId || ""}></Patient>
                </>
            }
            </Box>
            
        </>
    )
}
