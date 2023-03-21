import { Box, Divider, Typography } from "@mui/material"
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Patient } from "../components/Patient";
import { Consents } from "../components/Consents";
import { useGetEpisodeOfCareQuery } from "../feature/api/episodeOfCares";

enum Mode {
    NORMAL = "normal",
    ADD = "add",
    DELETE = "delete",
    UPDATE = "update",
}

export function EpisodeOfCare() {
    const { id, careTeamId } = useParams();
    const eocId = parseInt(id || "0");
    const { data: episodeOfCare, isLoading } = useGetEpisodeOfCareQuery(eocId);
    
    const patientId = episodeOfCare?.patientId || "";

      
    const [mode, setMode] = useState(Mode.NORMAL);

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
                    
                    <Consents episodeOfCareId={eocId} />
                </>
            }
            </Box>
            
        </>
    )
}
