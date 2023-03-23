import { Box, Divider, Typography, Stack, Button, CircularProgress } from "@mui/material"
import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Patient } from "../components/Patient";
import { Consents } from "../components/Consents";
import { useGetEpisodeOfCareQuery, useUpdateEpisodeOfCareMutation, useGetConsentsForEpisodeOfCareQuery } from "../feature/api/episodeOfCares";
import { usePostCreateCarePlanMutation } from "../feature/api/careplans";
import UpdateEpisodeOfCare from "../models/UpdateEpisodeOfCare";
import { t } from "i18next";
import { CreateCarePlanForm } from "../components/forms/CreateCarePlanForm";
import CreateCarePlan from "../models/CreateCarePlan";
import { CarePlans } from "../components/CarePlans";
import { UserContext } from "../feature/authentication/logic/FetchUser";

enum Mode {
    NORMAL = "normal",
    ADD = "add",
    DELETE = "delete",
    UPDATE = "update",
}

export function EpisodeOfCare() {
    const { id } = useParams();
    const eocId = parseInt(id || "0");
    const { data: episodeOfCare, isLoading } = useGetEpisodeOfCareQuery(eocId);
    const { data: consents, isLoading: consentsLoading } = useGetConsentsForEpisodeOfCareQuery(eocId);
    console.log("consents", consents)
    
    const patientId = episodeOfCare?.patientId || "";

    const [
        updateEpisodeOfCare, // This is the mutation trigger
        { isLoading: isUpdating }, // This is the destructured mutation result
      ] = useUpdateEpisodeOfCareMutation();
    const [
        createCarePlan, // This is the mutation trigger
        { isLoading: carePlanUpdating }, // This is the destructured mutation result
      ] = usePostCreateCarePlanMutation();
      
    const [mode, setMode] = useState(Mode.NORMAL);

    const careTeamId = useContext(UserContext)?.careTeamId;

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
                    
            <Stack spacing={2} direction={"row"}>
                <Button
                    variant="contained"
                    disabled={(isLoading || episodeOfCare!.status === 'active') || (consentsLoading || !consents || consents!.length == 0)}
                    fullWidth={false}
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
                    </>
                }
                </Box>
                <Patient patientId={patientId} careTeamId={careTeamId || ""}></Patient>
                <Divider />
            <Consents episodeOfCareId={eocId} consents={consents} isLoading={consentsLoading} />
            </Stack>

            <Divider />
                    <br/>
                    <Typography variant="h5">Opret ny CarePlan</Typography>
                    <br/>
                    <CreateCarePlanForm 
                        episodeOfCareId={eocId}
                        onSubmit={async (submission: CreateCarePlan) => {
                            console.log("hello")
                                
                            //const patientId = patients?.find(p => p.cpr === submission.patientCpr)?.id;
                            const newCarePlan = {
                                episodeOfCareId: submission.episodeOfCareId,
                                planDefinitionId: submission.planDefinitionId
                            };
                                
                            // TODO: Error handling on patientId!
                            createCarePlan(newCarePlan);
                            setMode(Mode.NORMAL);
                        } }
                        onCancel={() => {
                            setMode(Mode.NORMAL);
                        }} />
                    <br />
                    <CarePlans careTeamId={careTeamId!} episodeOfCareId={id!} />
        </>
    )
}
