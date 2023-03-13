import { Divider, List, ListItem, ListItemText, Typography } from "@mui/material"
import Box from '@mui/material/Box';
import { theme } from "../config/theme";
import { useState } from "react"
import { useGetPatientsQuery } from "../feature/api/patients"

enum Mode {
    NORMAL = "normal",
    ADD = "add",
    DELETE = "delete",
    UPDATE = "update",
}

export function Patients() {
    const { data: patients, isLoading: fetchingPatients } = useGetPatientsQuery(undefined);
    console.log(patients);
    const [mode, setMode] = useState(Mode.NORMAL);

    return (
        <>
            <Typography variant="h4">Patients</Typography>

            <Divider />
            <Box sx={{
                width: '100%',
                maxWidth: 360,
                bgcolor: "#c7caeb"
            }}>
            <List>
                {   
                    fetchingPatients ? <p>Loading...</p> : 
                    patients && patients.map((patient) =>
                        <ListItem>
                            <ListItemText
                                primary={patient.firstName + ' ' + patient.lastName}
                                secondary={patient.cpr}
                            />
                        
                        </ListItem>)
                }
            </List>
            </Box>
        </>
    )
}