import { Link } from "react-router-dom";
import { Divider, FormGroup, FormControlLabel, Switch, Typography, Paper, Table, TableContainer, TableHead, TableRow, TableBody, TableCell } from "@mui/material"
import { useState, useContext } from "react";
import { useGetTasksForCareTeamQuery } from "../feature/api/tasks";
import { UserContext } from "../feature/authentication/logic/FetchUser";
import { t } from "i18next";


export function Tasks() {
    const careTeamId = useContext(UserContext)?.careTeamId;
    const [taskStatus, setTaskStatus] = useState('requested');
    const { data: tasks, isLoading } = useGetTasksForCareTeamQuery({careTeamId, taskStatus});

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setTaskStatus('completed');
        }
        else {
            setTaskStatus('requested');
        }
      };

    return (
        <>
            <Typography variant="h4">Tasks</Typography>
            <FormGroup>
                <FormControlLabel control={<Switch onChange={handleChange} />} label={t<string>("completed")} />
            </FormGroup>            

            <Divider />
            {
                isLoading ? <p>Loading...</p> : 
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>id</TableCell>
                        <TableCell>{t<string>("Status")}</TableCell>
                        <TableCell>{t<string>("Priority")}</TableCell>
                        <TableCell>{t<string>("Description")}</TableCell>
                        <TableCell>{t<string>("Category")}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {tasks && tasks.map((task) => (
                        <TableRow
                          key={task.id}
                          component={Link}
                          to={`/episodeofcares/${task.episodeOfCareId}/clinicalimpressions/${task.clinicalImpressionId}`}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 }, textDecoration: 'none' }}
                        >
                          <TableCell component="th" scope="row">
                            {task.id}
                          </TableCell>
                          <TableCell>{task.status}</TableCell>
                          <TableCell>{task.priority}</TableCell>
                          <TableCell>{task.description}</TableCell>
                          <TableCell>{task.category}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>   
            }
        </>
    )
}