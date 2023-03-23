import { Box, Divider, List, ListItem, ListItemText, Typography, Button, CircularProgress, ListItemSecondaryAction } from "@mui/material";
import { useGetCarePlansOnEpisodeOfCareForCareTeamQuery, useUpdateCarePlanMutation } from "../feature/api/careplans";
import UpdateCarePlan from '../models/UpdateCarePlan';
import { t } from "i18next";

interface CarePlansProps {
    careTeamId: string,
    episodeOfCareId: string
}

export function CarePlans(props: CarePlansProps) {
    const teamId = props.careTeamId;
    const eocId = props.episodeOfCareId
    //console.log("henter", teamId, eocId)
    const { data, isLoading } = useGetCarePlansOnEpisodeOfCareForCareTeamQuery({careTeamId: teamId, episodeOfCareId: eocId});
    const [
        updateCarePlan, // This is the mutation trigger
        { isLoading: isUpdating }, // This is the destructured mutation result
      ] = useUpdateCarePlanMutation();

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
                            <ListItem sx={{
                                padding: 1,
                                border: 2,
                                borderColor: "#EEEEEE",
                                textAlign: "left",
                                display: "list-item",
                                backgroundColor: "#d5e6f7"
                            }}>
                                <ListItemText
                                    primary={careplan.id}
                                    secondary={careplan.status + " (patientId:" + careplan.patientId + ")"}
                                />
                                <ListItemSecondaryAction>
                                <Button
                                    variant="contained"
                                    disabled={isLoading || careplan.status === 'completed'}
                                    fullWidth={false}
                                    onClick={() => {
                                        const newStatus = (careplan.status !== "active" ? 'active' : 'completed');

                                        let data : UpdateCarePlan = {
                                        status: newStatus
                                        };
                                        updateCarePlan({episodeOfCareId: eocId, carePlanId: careplan.id, updateCarePlan: data});
                                    }}
                                >
                                    {isLoading ? 
                                        <CircularProgress color={"inherit"} size={"1.5em"}></CircularProgress> 
                                        :
                                        <>
                                            {careplan.status === 'draft' ? t("Activate") : t("Complete")}
                                        </>}
                                </Button>
                                    
                                </ListItemSecondaryAction>
                            </ListItem>
                        )
                    }
                </List>
            </Box>
        </>
    )
}