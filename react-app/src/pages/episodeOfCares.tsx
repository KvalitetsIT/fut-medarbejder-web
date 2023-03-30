import { Link } from "react-router-dom";
import { Divider, Typography, List, ListItem, ListItemText } from "@mui/material"
import { useState, useContext } from "react";
import { useGetEpisodeOfCaresQuery, usePostCreateEpisodeOfCareMutation } from "../feature/api/episodeOfCares";
import { UserContext } from "../feature/authentication/logic/FetchUser";
import { CreateEpisodeOfCareForm } from "../components/forms/CreateEpisodeOfCareForm";
import CreateEpisodeOfCare from "../models/CreateEpisodeOfCare";
import { useGetPatientsQuery } from "../feature/api/patients";

enum Mode {
    NORMAL = "normal",
    ADD = "add",
    DELETE = "delete",
    UPDATE = "update",
}

export function EpisodeOfCares() {
    const user = useContext(UserContext);
    const teamId = parseInt(user!.careTeamId!);
    const { data: episodeOfCares, isLoading } = useGetEpisodeOfCaresQuery(teamId);
    const { data: patients, isLoading: fetchingPatients } = useGetPatientsQuery(undefined);
    const [
        createEOC, // This is the mutation trigger
        { isLoading: isUpdating }, // This is the destructured mutation result
      ] = usePostCreateEpisodeOfCareMutation();
     
    const [mode, setMode] = useState(Mode.NORMAL);

    return (
        <>
            <Typography variant="h4">Episodes Of Care</Typography>
            <Typography variant="h5">Opret ny Episode of Care</Typography>
                    <br/>
                    <CreateEpisodeOfCareForm 
                        careTeamId={teamId}   
                            onSubmit={async (submission: CreateEpisodeOfCare) => {
                                
                            const patientId = patients?.find(p => p.cpr === submission.patientCpr)?.id;
                            const newEoc = {
                                patientCpr: submission.patientCpr,
                                patientId: parseInt(patientId ? patientId : "-1"),
                                careTeamId: submission.careTeamId,
                                provenance: submission.provenance
                            };
                                
                            // TODO: Error handling on patientId!
                            createEOC(newEoc);
                            setMode(Mode.NORMAL);
                        } }
                        onCancel={() => {
                            setMode(Mode.NORMAL);
                        }} />
                    <br />

            <Divider />
            {
                isLoading ? <p>Loading...</p> : 
                <List>
                    {   
                        episodeOfCares && episodeOfCares.map((episodeOfCare) =>
                            <ListItem component={Link} to={`/episodeofcares/${episodeOfCare.uuid}`} sx={{
                                padding: 1,
                                border: 2,
                                borderColor: "#EEEEEE",
                                textAlign: "left",
                                display: "list-item",
                                backgroundColor: "#d5e6f7"
                            }}>
                                <ListItemText
                                    primary={episodeOfCare.uuid}
                                    secondary={episodeOfCare.status + " (patientId:" + episodeOfCare.patientId + ")"}
                                />
                            
                            </ListItem>)
                    }
                </List>
            }
        </>
    )
}
