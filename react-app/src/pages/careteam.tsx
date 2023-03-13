import { Box, Divider, List, ListItem, ListItemText, Typography } from "@mui/material"
import { EpisodesOfCares } from "../components/EpisodeOfCares";
import { useGetCareTeamQuery } from "../feature/api/careteams";

interface CareTeamProps {
    id: string
}

export function CareTeam(props : CareTeamProps) {
    const id : number = parseInt(props.id);
    const { data: careteam, isLoading } = useGetCareTeamQuery(id);

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
                    <p>Id: {careteam?.uuid}</p>
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
                            
                    <EpisodesOfCares careTeamId={careteam ? careteam.uuid : ""} />
                </>
            }
            </Box>
            
        </>
    )
}