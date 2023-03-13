import { Divider, List, ListItem, ListItemText, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useGetEpisodeOfCaresQuery } from "../feature/api/episodeOfCares";

interface EpisodesOfCaresProps {
    careTeamId: string
}

export function EpisodesOfCares(props: EpisodesOfCaresProps) {
    const { id } = useParams(); 
    // TODO: Fix hardkodet id senere, fejl på BFF
    const careTeamId = 135884;  //parseInt(id || "0");
    console.log("careTeamId", careTeamId);
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
                            <ListItem component={Link} to={`/episodeofcare/${eoc.uuid}`} sx={{
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