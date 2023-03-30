import { Divider, Typography, Stack, Button, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
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
    careplans?.sort((a, b) => new Date(b.start).getTime() - new Date(a.start).getTime());

    return (
        <>
            <Divider />
            <br/>
            <Typography variant="h5">Careplans</Typography>
            {
                isLoading ? <p>Loading...</p> 
                : 
                <TableContainer component={Paper}>
                    <Table sx={{ width: 1/2 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>id</TableCell>
                                <TableCell>{t<string>("Status")}</TableCell>

                                <TableCell>{t<string>("Start")}</TableCell>
                                <TableCell>{t<string>("End")}</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {careplans && careplans.map((careplan) => (
                            <TableRow key={careplan.id}
                              //component={Link}
                              //to={`/episodeofcares/${episodeOfCare.uuid}`}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 }, textDecoration: 'none' }}
                            >
                                <TableCell component="th" scope="row">{careplan.id}</TableCell>
                                <TableCell>{careplan.status}</TableCell>
                                <TableCell>{new Date(careplan.start).toLocaleString()}</TableCell>
                                <TableCell>{(careplan.end) ? new Date(careplan.end).toLocaleString(): ''}</TableCell>
                                <TableCell>
                                    <Stack direction="row" justifyContent="end" spacing={1}>
                                        <Button
                                            variant="contained"
                                            disabled={isLoading || ["completed", "revoked", "entered-in-error"].some(item => item === careplan.status)}
                                            fullWidth={false}
                                            onClick={() => {
                                                const newStatus = (careplan.status !== "active" ? 'active' : 'completed');
                                                const end = (newStatus === "completed" ? new Date() : undefined);
                                            
                                                let data : UpdateCarePlan = {
                                                    status: newStatus,
                                                    end: end
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
                                            </>
                                        }
                                        </Button>                                
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>  
            }
        </>
    )
}