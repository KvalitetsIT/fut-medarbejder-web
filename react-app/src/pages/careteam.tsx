import { Box, Divider, Typography } from "@mui/material"
import { useParams } from "react-router-dom";
import { EpisodesOfCares } from "../components/EpisodeOfCares";
import { useGetCareTeamQuery } from "../feature/api/careteams";


export function CareTeam() {
    const { id } = useParams(); 
    const careTeamId : number = parseInt(id ? id : "");
    const { data: careteam, isLoading } = useGetCareTeamQuery(careTeamId);

    console.log(careteam);

    return (
        <>
            <Typography variant="h4">{isLoading ? <p>Loading...</p> : careteam?.name}</Typography>

            <Divider />

            <Box sx={{
                width: '100%',
                bgcolor: "#d5e6f7",
                paddingTop: "0.1em",
                paddingLeft: "0.5em"
            }}>
            {
                isLoading ? <></> :
                <>
                    <p>Id: {careteam?.id}</p>
                    <p>Resource: {careteam?.resource}</p>
                    <p>Name: {careteam?.name}</p>
                    <p>Status: {careteam?.status}</p>
                    <p>Organizationer:
                        <ol>
                            {careteam?.managingOrganization.map(org =>
                                <li>
                                    {org}
                                </li>
                            )}
                        </ol>            
                    </p>
                            
                    <EpisodesOfCares careTeamId={careteam ? careteam.id : ""} />
                </>
            }
            </Box>
            
        </>
    )
}