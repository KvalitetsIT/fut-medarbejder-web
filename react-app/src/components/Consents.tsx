import { Box, Typography, Stack, Button, CircularProgress } from "@mui/material";
import { usePostCreateConsentForEpisodeOfCareMutation } from "../feature/api/episodeOfCares";
import CreateConsent from "../models/CreateConsent";
import Consent from "../models/Consent";
import { t } from "i18next";

interface ConsentProps {
    episodeOfCareId: number,
    consents?: Consent[],
    isLoading: boolean    
}

export function Consents(props: ConsentProps) {
    const consent = props.consents?.find(c => c.type === 'PITEOC');
    const [
        createConsent, // This is the mutation trigger
        { isLoading: isUpdating }, // This is the destructured mutation result
      ] = usePostCreateConsentForEpisodeOfCareMutation();

    if (props.isLoading) {
        return <p>Loading...</p>;
    } else return (
        <Box sx={{
            width: '100%',
            bgcolor: "#d5e6f7",
            paddingTop: "0.1em",
            paddingLeft: "0.5em"
        }}>
            <Typography variant="h5">Samtykke</Typography>
            {
                (consent) ? 
                <>
                    <p>Type: </p>
                    <p>Status: {consent?.status}</p>
                    <p>Start: {consent?.start.toString()}</p>
                </> 
                :
                <>
                    <Stack spacing={2} direction={"row"}>
                        <Button
                            variant="contained"
                            disabled={props.isLoading || consent}
                            fullWidth={false}
                            onClick={() => {
                                let data: CreateConsent = {
                                    episodeOfCareId: props.episodeOfCareId,
                                    status: "active",
                                    category: "PITEOC",
                                };
                                createConsent(data);
                            }}
                        >
                            {props.isLoading ? <CircularProgress color={"inherit"} size={"1.5em"}></CircularProgress> : <>{t("Create Consent")}</>}
                        </Button>
                    </Stack>
                </>
            }
        </Box>        
    )
}