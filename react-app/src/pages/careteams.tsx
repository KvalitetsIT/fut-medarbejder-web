import { Link } from "react-router-dom";
import { Divider, List, ListItem, ListItemText, Typography } from "@mui/material"
import { useGetCareTeamsQuery } from "../feature/api/careteams";


export function CareTeams() {
    const { data: careteams, isLoading } = useGetCareTeamsQuery(undefined);

    return (
        <>
            <Typography variant="h4">CareTeams</Typography>

            <Divider />

            <List>
                {   
                    isLoading ? <p>Loading...</p> : 
                    careteams && careteams.map((careteam) =>
                        <ListItem component={Link} to={`/careteams/${careteam.uuid}`} sx={{
                            padding: 1,
                            border: 2,
                            borderColor: "#EEEEEE",
                            textAlign: "left",
                            display: "list-item",
                            backgroundColor: "#d5e6f7"
                        }}>
                            <ListItemText
                                primary={careteam.name}
                                secondary={careteam.reasonCode[0].code + " " + careteam.reasonCode[0].display}
                            />
                        
                        </ListItem>)
                }
            </List>
            
        </>
    )
}