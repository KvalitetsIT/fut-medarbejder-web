import { Divider, List, ListItem, ListItemText, Typography } from "@mui/material"
import { useGetPatientsQuery } from "../feature/api/patients"

export function Patients() {
    const { data: patients, isLoading: fetchingPatients } = useGetPatientsQuery(undefined);

    return (
        <>
            <Typography variant="h4">Patients</Typography>

            <Divider />

            <List>
                {   
                    fetchingPatients ? <p>Loading...</p> : 
                    patients && patients.map((patient) =>
                        <ListItem sx={{
                            padding: 1,
                            border: 2,
                            borderColor: "#EEEEEE",
                            textAlign: "left",
                            display: "list-item",
                            backgroundColor: "#d5e6f7"
                        }}>
                            <ListItemText
                                primary={patient.firstName + ' ' + patient.lastName}
                                secondary={patient.cpr}
                            />
                        
                        </ListItem>)
                }
            </List>

        </>
    )
}