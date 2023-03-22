import { Box, Divider, List, ListItem, ListItemText, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useGetCarePlansOnEpisodeOfCareForCareTeamQuery } from "../feature/api/careplans";

interface CarePlansProps {
    careTeamId: string,
    episodeOfCareId: string
}

export function CarePlans(props: CarePlansProps) {
    //const { careTeamId, episodeOfCareId } = useParams(); 
    
    //const careTeamId = parseInt(id");
    //const episodeOfCareId = parseInt(props.episodeOfCareId);
    const teamId = props.careTeamId;
    const eocId = props.episodeOfCareId
    console.log("henter", teamId, eocId)
    const { data, isLoading } = useGetCarePlansOnEpisodeOfCareForCareTeamQuery({careTeamId: teamId, episodeOfCareId: eocId});

    const careplans = data?.slice();
    //episodeOfCares?.sort((a, b) => parseInt(b.uuid) - parseInt(a.uuid));

    if (isLoading) {
        return <p>Is loading...</p>
    } else return (
        <>
            <Divider />
            <br/>
            <Typography variant="h5">Careplans</Typography>
                   
            <Box sx={{ width: 1 / 2 }}>
                <List>
                    {
                        careplans && careplans.map((careplan) =>
                            <ListItem component={Link} to={`/careteams/${teamId}/episodeofcare/${careplan.id}`} sx={{

                                margin: 1,
                                border: 0,
                                textAlign: "left",
                                display: "list-item",
                                backgroundColor: "#c0d7ed"
                            }}>
                                <ListItemText
                                    primary={careplan.id}
                                    secondary={careplan.status}
                                />
                        
                            </ListItem>)
                    }
                </List>
            </Box>
                
        </>

    )
}