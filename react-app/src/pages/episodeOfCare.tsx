import { Box, Divider, Typography, Stack, Button, CircularProgress } from "@mui/material"
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Patient } from "../components/Patient";
import { Consents } from "../components/Consents";
import { useGetEpisodeOfCareQuery, useUpdateEpisodeOfCareMutation, useGetConsentsForEpisodeOfCareQuery } from "../feature/api/episodeOfCares";
import UpdateEpisodeOfCare from "../models/UpdateEpisodeOfCare";
import { t } from "i18next";

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
    const { data: consents, isLoading: consentsLoading } = useGetConsentsForEpisodeOfCareQuery(eocId);
    console.log("consents", consents)
    
    const patientId = episodeOfCare?.patientId || "";

    const [
        updateEpisodeOfCare, // This is the mutation trigger
        { isLoading: isUpdating }, // This is the destructured mutation result
      ] = useUpdateEpisodeOfCareMutation();
      
    const [mode, setMode] = useState(Mode.NORMAL);

    if (isLoading) {
        return <p>Loading...</p>;
    } else return (
        <>
            <Stack spacing={2}>
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
            <Consents episodeOfCareId={eocId} consents={consents} isLoading={consentsLoading} />
            <Stack spacing={2} direction={"row"}>
                <Button
                    variant="contained"
                    disabled={(isLoading || episodeOfCare!.status === 'active') || (consentsLoading || !consents || consents!.length == 0)}
                    fullWidth={true}
                    onClick={() => {
                        let data: UpdateEpisodeOfCare = {
                            episodeOfCareId: eocId,
                            status: "active",
                        };
                        updateEpisodeOfCare(data);
                    }}
                >
                    {isLoading ? <CircularProgress color={"inherit"} size={"1.5em"}></CircularProgress> : <>{t("Activate Episode Of Care")}</>}
                </Button>
            </Stack>   
            </Stack>         
        </>
    )
}
