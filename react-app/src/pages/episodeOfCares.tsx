import { Link } from "react-router-dom";
import { Divider, Typography, List, ListItem, ListItemText } from "@mui/material"
import { useState, useContext } from "react";
import { useGetEpisodeOfCaresQuery } from "../feature/api/episodeOfCares";
import { UserContext } from "../feature/authentication/logic/FetchUser";

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
     
    const [mode, setMode] = useState(Mode.NORMAL);

    return (
        <>
            <Typography variant="h4">Episodes Of Care</Typography>

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
