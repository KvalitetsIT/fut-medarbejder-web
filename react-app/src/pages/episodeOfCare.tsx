import { Box, Divider, Typography, Stack, Button, CircularProgress, List, ListItem, ListItemText } from "@mui/material"
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Patient } from "../components/Patient";
import { useGetEpisodeOfCareQuery } from "../feature/api/episodeOfCares";
import { useGetPatientQuery } from "../feature/api/patients";
import { useGetConsentsForEpisodeOfCareQuery, usePostCreateConsentForEpisodeOfCareMutation } from "../feature/api/episodeOfCares";
import { t } from "i18next";
import CreateConsent from "../models/CreateConsent";

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
    const { data: consents, isLoading: consentLoading } = useGetConsentsForEpisodeOfCareQuery(eocId);
    //const consentsx = consentdata?.slice();

    const patientId = episodeOfCare?.patientId || "";

    const [
        createConsent, // This is the mutation trigger
        { isLoading: isUpdating }, // This is the destructured mutation result
      ] = usePostCreateConsentForEpisodeOfCareMutation();
      
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
                    
                    {
                        consentLoading ? <p>Loading...</p> :
                        <>
                        <Divider />
            
                        <List subheader={<Typography variant="h5">Samtykke</Typography>}>
                            {   
                                consents && consents.map((consent) => 
                                    <ListItem>
                                        <ListItemText
                                            primary={<p>Id: {consent?.id}</p>}
                                            secondary={"status:" + consent.status + ", start-tid:" + consent?.start + ", slut-tid:" + consent?.end}
                                        />
                                    </ListItem>
                                )
                            }
                        </List>
                        </>
                    }
                </>
            }
            {
                isLoading ? <></> :
                <>
                    <Stack spacing={2} direction={"row"}>
                        <Button
                            variant="contained"
                            disabled={isLoading}
                            fullWidth={true}
                            onClick={() => {
                                let blah: CreateConsent = {
                                    episodeOfCareId: episodeOfCare!.uuid,
                                    status: "active",
                                    category: "PITEOC",
                                };
                                createConsent(blah);
                                console.log("hello" + JSON.stringify(blah));
                            }}
                            
                        >
                            {isLoading ? <CircularProgress color={"inherit"} size={"1.5em"}></CircularProgress> : <>{t("Create Consent")}</>}
                        </Button>

            
                    </Stack>
                </>
            }
            </Box>
            
        </>
    )
}
