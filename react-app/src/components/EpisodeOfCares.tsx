import { Divider, List, ListItem, ListItemText, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useGetEpisodeOfCaresQuery } from "../feature/api/episodeOfCares";
import EpisodeOfCare from "../models/EpisodeOfCare"

interface EpisodesOfCaresProps {
    careTeamId: string
}

export function EpisodesOfCares(props: EpisodesOfCaresProps) {
    const careTeamId = parseInt(props.careTeamId);
    const { data: episodeOfCares, isLoading } = useGetEpisodeOfCaresQuery(careTeamId);
    console.log(episodeOfCares);

    return (
        <>
            <Divider />
            <Typography variant="h5">Episodes of Care</Typography>
            
            {
                isLoading ? <p>Loading...</p> : 
                <List>
                    {   
                        episodeOfCares && episodeOfCares.map((eoc) =>
                            <ListItem sx={{
                                padding: 1,
                                border: 2,
                                borderColor: "#EEEEEE",
                                textAlign: "left",
                                display: "list-item",
                                backgroundColor: "#d5e6f7"
                            }}>
                                <ListItemText
                                    primary={eoc.uuid}
                                    secondary={eoc.status}
                                />
                            
                            </ListItem>)
                    }
                </List>
            }
        </>

    )
}