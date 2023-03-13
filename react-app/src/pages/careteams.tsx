import { Divider, List, ListItem, ListItemText, Typography } from "@mui/material"
import Box from '@mui/material/Box';
import { useState } from "react";
import { useGetCareTeamsQuery } from "../feature/api/careteams";

enum Mode {
    NORMAL = "normal",
    ADD = "add",
    DELETE = "delete",
    UPDATE = "update",
}

export function CareTeams() {
    const { data: careteams, isLoading } = useGetCareTeamsQuery(undefined);
    console.log(careteams);
    const [mode, setMode] = useState(Mode.NORMAL);

    return (
        <>
            <Typography variant="h4">CareTeams</Typography>

            <Divider />

            <List>
                {   
                    isLoading ? <p>Loading...</p> : 
                    careteams && careteams.map((careteam) =>
                        <ListItem sx={{
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