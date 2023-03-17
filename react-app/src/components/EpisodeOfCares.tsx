import { Box, Divider, List, ListItem, ListItemText, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useGetEpisodeOfCaresQuery } from "../feature/api/episodeOfCares";

interface EpisodesOfCaresProps {
    careTeamId: string
}

export function EpisodesOfCares(props: EpisodesOfCaresProps) {
    const { id } = useParams(); 
    
    const careTeamId = parseInt(id || "0");
    const { data, isLoading } = useGetEpisodeOfCaresQuery(careTeamId);

    const episodeOfCares = data?.slice();
    episodeOfCares?.sort((a, b) => parseInt(b.uuid) - parseInt(a.uuid));

    if (isLoading) {
        return <p>Is loading...</p>
    } else return (
        <>
            <Divider />
            <br/>
            <Typography variant="h5">Episodes of Care</Typography>
                   
            <Box sx={{ width: 1 / 2 }}>
                <List>
                    {
                        episodeOfCares && episodeOfCares.map((eoc) =>
                            <ListItem component={Link} to={`/careteams/${careTeamId}/episodeofcare/${eoc.uuid}`} sx={{

                                margin: 1,
                                border: 0,
                                textAlign: "left",
                                display: "list-item",
                                backgroundColor: "#c0d7ed"
                            }}>
                                <ListItemText
                                    primary={eoc.uuid}
                                    secondary={eoc.status}
                                />
                        
                            </ListItem>)
                    }
                </List>
            </Box>
                
        </>

    )
}