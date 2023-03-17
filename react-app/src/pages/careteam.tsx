import { Box, Divider, Typography } from "@mui/material"
import { useState } from "react";
import { useParams } from "react-router-dom";
import { EpisodesOfCares } from "../components/EpisodeOfCares";
import { CreateEpisodeOfCareForm } from "../components/forms/CreateEpisodeOfCareForm";
import { PatientForm } from "../components/forms/PatientForm";
import { useGetCareTeamQuery } from "../feature/api/careteams";
import { usePostCreateEpisodeOfCareMutation } from "../feature/api/episodeOfCares";
import CreateEpisodeOfCare from "../models/CreateEpisodeOfCare";
import Patient from "../models/Patient";

enum Mode {
    NORMAL = "normal",
    ADD = "add",
    DELETE = "delete",
    UPDATE = "update",
}

export function CareTeam() {
    const { id } = useParams(); 
    const careTeamId : number = parseInt(id ? id : "");
    const { data: careteam, isLoading } = useGetCareTeamQuery(careTeamId);
    const [
        createEOC, // This is the mutation trigger
        { isLoading: isUpdating }, // This is the destructured mutation result
      ] = usePostCreateEpisodeOfCareMutation();

    const [mode, setMode] = useState(Mode.NORMAL);

    return (
        <>
            <Typography variant="h4">{isLoading ? <p>Loading...</p> : careteam?.name}</Typography>
            
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
                    <p>Id: {careteam?.id}</p>
                    <p>Resource: {careteam?.resource}</p>
                    <p>Name: {careteam?.name}</p>
                    <p>Status: {careteam?.status}</p>
                    <p>Organizationer:
                        <ol>
                            {careteam?.managingOrganization.map(org =>
                                <li>
                                    {org}
                                </li>
                            )}
                        </ol>            
                            </p>
                            
                    <Divider />
                    <br/>
                    <Typography variant="h5">Opret ny Episode of Care</Typography>
                    <br/>
                    <CreateEpisodeOfCareForm 
                        careTeamId={careTeamId}   
                        onSubmit={async (submission: CreateEpisodeOfCare) => {
                            createEOC(submission);
                            setMode(Mode.NORMAL);
                        } }
                        onCancel={() => {
                            setMode(Mode.NORMAL);
                        }} />
                    <br />
                    {/*
                    <PatientForm 
                    onSubmit={async (submission: Patient) => {
                        //postPatient(submission)
                        setMode(Mode.NORMAL)
                    }} onCancel={() => {
                        setMode(Mode.NORMAL)
                    }} />
                    */}
                            
                    <EpisodesOfCares careTeamId={careteam ? careteam.id : ""} />
                </>
            }
            </Box>
            
        </>
    )
}

