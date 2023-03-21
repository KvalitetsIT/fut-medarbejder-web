import { Divider, Typography, Stack, Button, CircularProgress } from "@mui/material";
import { useGetConsentsForEpisodeOfCareQuery, usePostCreateConsentForEpisodeOfCareMutation } from "../feature/api/episodeOfCares";
import CreateConsent from "../models/CreateConsent";
import { t } from "i18next";

interface ConsentProps {
    episodeOfCareId: number
}

export function Consents(props: ConsentProps) {
    
    const { data: consents, isLoading } = useGetConsentsForEpisodeOfCareQuery(props.episodeOfCareId);
    console.log("samtykke for eocId:"+props.episodeOfCareId, consents);
    const consent = consents && consents.find(c => c.start != null);
    console.log("1", consent);
    console.log("2", consent?.status);
    const [
        createConsent, // This is the mutation trigger
        { isLoading: isUpdating }, // This is the destructured mutation result
      ] = usePostCreateConsentForEpisodeOfCareMutation();

    if (isLoading) {
        return <p>Loading...</p>;
    } else return (
        <>
            <Divider />
            <Typography variant="h5">Samtykke</Typography>
            {
                (consents && consents?.length>0) ? 
                <>
                    <p>Type: </p>
                    <p>Status: {consent?.status}</p>
                    <p>Start: {consent?.start.toString()}</p>
                </> :
                <>
                    <Stack spacing={2} direction={"row"}>
                        <Button
                            variant="contained"
                            disabled={isLoading}
                            fullWidth={true}
                            onClick={() => {
                                let blah: CreateConsent = {
                                    episodeOfCareId: props.episodeOfCareId,
                                    status: "active",
                                    category: "PITEOC",
                                };
                                createConsent(blah);
                                console.log("hello" + JSON.stringify(blah));
                            }}
                            
                        >
                            {isLoading ? <CircularProgress color={"inherit"} size={"1.5em"}></CircularProgress> : <>{t("Create Consent")}</>}
                        </Button>

            
                    </Stack>
                </>
            }
            
        </>
    )
}