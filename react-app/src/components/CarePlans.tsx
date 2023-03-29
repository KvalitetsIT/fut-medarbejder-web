import { Box, Divider, List, ListItem, ListItemText, Typography, Stack, ButtonGroup, Button, CircularProgress, ListItemSecondaryAction } from "@mui/material";
import { useGetCarePlansOnEpisodeOfCareForCareTeamQuery, useUpdateCarePlanOnEpisodeOfCareMutation, useDeleteCarePlanOnEpisodeOfCareMutation } from "../feature/api/careplans";
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
      ] = useUpdateCarePlanOnEpisodeOfCareMutation();
    const [
        deleteCarePlan, // This is the mutation trigger
        { isLoading: isDeleting }, // This is the destructured mutation result
      ] = useDeleteCarePlanOnEpisodeOfCareMutation();

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
                                    <Stack direction="row" spacing={1}>

                                    
                                <Button
                                    variant="contained"
                                    disabled={isLoading || ["completed", "revoked", "entered-in-error"].some(item => item === careplan.status)}
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

                                <Button
                                    variant="contained"
                                    disabled={isLoading || ["completed", "revoked", "entered-in-error"].some(item => item === careplan.status)}
                                    fullWidth={false}
                                    color="error"
                                    onClick={() => {
                                        deleteCarePlan({episodeOfCareId: eocId, carePlanId: careplan.id});
                                    }}
                                >
                                    {isLoading ? 
                                        <CircularProgress color={"inherit"} size={"1.5em"}></CircularProgress> 
                                        :
                                        <>
                                            {t("Delete")}
                                        </>}
                                </Button>

                                </Stack>
                                    
                                </ListItemSecondaryAction>
                            </ListItem>
                        )
                    }
                </List>
            </Box>
        </>
    )
}