import { Link } from "react-router-dom";
import { Divider, Typography, List, ListItem, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, FormControlLabel, FormGroup, Switch } from "@mui/material"
import { useState, useContext } from "react";
import { useGetEpisodeOfCaresQuery, usePostCreateEpisodeOfCareMutation } from "../feature/api/episodeOfCares";
import { UserContext } from "../feature/authentication/logic/FetchUser";
import { CreateEpisodeOfCareForm } from "../components/forms/CreateEpisodeOfCareForm";
import CreateEpisodeOfCare from "../models/CreateEpisodeOfCare";
import { useGetPatientsQuery } from "../feature/api/patients";
import { t } from "i18next";

enum Mode {
    NORMAL = "normal",
    ADD = "add",
    DELETE = "delete",
    UPDATE = "update",
}

export function EpisodeOfCares() {
    const user = useContext(UserContext);
    const teamId = parseInt(user!.careTeamId!);

    const [episodeOfCareStatus, setEpisodeOfCareStatus] = useState('planned,active');

    const { data, isLoading } = useGetEpisodeOfCaresQuery({careTeamId: teamId, episodeOfCareStatus: episodeOfCareStatus});
    const { data: patients, isLoading: fetchingPatients } = useGetPatientsQuery(undefined);
    const [
        createEOC, // This is the mutation trigger
        { isLoading: isUpdating }, // This is the destructured mutation result
      ] = usePostCreateEpisodeOfCareMutation();
     
    const [mode, setMode] = useState(Mode.NORMAL);

    const episodeOfCares = data?.slice();
    //episodeOfCares?.sort((a, b) => new Date(b.start).getTime() - new Date(a.start).getTime());

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setEpisodeOfCareStatus('finished');
        }
        else {
            setEpisodeOfCareStatus("planned,active");
        }
    };

    return (
        <>
            <Typography variant="h4">Episodes Of Care</Typography>
            <Typography variant="h5">Opret ny Episode of Care</Typography>
                    <br/>
                    <CreateEpisodeOfCareForm 
                        careTeamId={teamId}   
                            onSubmit={async (submission: CreateEpisodeOfCare) => {
                                
                            const patientId = patients?.find(p => p.cpr === submission.patientCpr)?.id;
                            const newEoc = {
                                patientCpr: submission.patientCpr,
                                patientId: parseInt(patientId ? patientId : "-1"),
                                careTeamId: submission.careTeamId,
                                provenance: submission.provenance
                            };
                                
                            // TODO: Error handling on patientId!
                            createEOC(newEoc);
                            setMode(Mode.NORMAL);
                        } }
                        onCancel={() => {
                            setMode(Mode.NORMAL);
                        }} />
                    <br />

            <Divider />
            <FormGroup>
                <FormControlLabel control={<Switch onChange={handleChange} />} label={t<string>("completed")} />
            </FormGroup>
            {
                isLoading ? <p>Loading...</p> : 
                
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>id</TableCell>
                        <TableCell>{t<string>("Status")}</TableCell>
                        <TableCell>{t<string>("Patient")}</TableCell>
                        <TableCell>{t<string>("Start")}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {episodeOfCares && episodeOfCares.map((episodeOfCare) => (
                        <TableRow
                          key={episodeOfCare.uuid}
                          component={Link}
                          to={`/episodeofcares/${episodeOfCare.uuid}`}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 }, textDecoration: 'none' }}
                        >
                          <TableCell component="th" scope="row">
                            {episodeOfCare.uuid}
                          </TableCell>
                          <TableCell>{episodeOfCare.status}</TableCell>
                          <TableCell>{episodeOfCare.patientId}</TableCell>
                          <TableCell>{episodeOfCare.start.toString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>  
            }
        </>
    )
}
