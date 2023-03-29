import { useParams } from "react-router-dom";
import { Divider, Box, Stack, Button, CircularProgress, Typography } from "@mui/material"
import { useContext } from "react";
import { useGetTaskByIdForCareTeamQuery, useUpdateTaskMutation } from "../feature/api/tasks";
import { UserContext } from "../feature/authentication/logic/FetchUser";
import { t } from "i18next";
import { ClinicalImpression } from "../components/ClinicalImpression";
import UpdateTask from "../models/UpdateTask";


export function Task() {
    const { id } = useParams();
    const careTeamId = useContext(UserContext)?.careTeamId;
    console.log("ksjhfskjdfh", careTeamId, id)
    
    const { data: task, isLoading } = useGetTaskByIdForCareTeamQuery({careTeamId, taskId: id});
    const [
      updateTask, // This is the mutation trigger
      { isLoading: isUpdating }, // This is the destructured mutation result
    ] = useUpdateTaskMutation();

    
    return (
        <>
            <Typography variant="h4">Task</Typography>
    
            <Divider />
            {
                isLoading ? <p>Loading...</p> : 
                <Stack spacing={2}>
                  <Box sx={{
                    width: '100%',
                    bgcolor: "#d5e6f7",
                    paddingTop: "0.1em",
                    paddingLeft: "0.5em"
                  }}>
                    <p>Id: {task?.id}</p>
                    <p>Status: {task?.status}</p> 
                    <p>Priority: {task?.priority}</p>
                    <p>Description: {task?.description}</p>
                    <p>Category: {task?.category}</p>

                    <Stack spacing={2} direction={"row"}>
                      <Button
                        variant="contained"
                        disabled={isLoading || task?.status === 'completed' }
                        fullWidth={false}
                        onClick={() => {
                            let data: UpdateTask = {
                              id: task!.id,
                              episodeOfCareId: task!.episodeOfCareId,
                              status: "completed",
                            };
                            updateTask(data);
                        }}
                      >
                        {isLoading ? <CircularProgress color={"inherit"} size={"1.5em"}></CircularProgress> : <>{t("Complete")}</>}
                      </Button>
                    </Stack>
                  </Box>

                  <Divider />
            
                  <ClinicalImpression episodeOfCareId={task?.episodeOfCareId} clinicalImpressionId={task?.clinicalImpressionId} />
              </Stack>
            }

        </>
    )
}