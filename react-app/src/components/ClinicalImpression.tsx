import { Box, Typography } from "@mui/material";
import { useGetClinicalImpressionForEpisodeOfCareQuery } from "../feature/api/clinicalimpressions";

interface ClinicalImpressionProps {
    episodeOfCareId?: string,
    clinicalImpressionId?: string
}

export function ClinicalImpression(props: ClinicalImpressionProps) {
    
    const { data: clinicalImpression, isLoading } = useGetClinicalImpressionForEpisodeOfCareQuery({episodeOfCareId: props.episodeOfCareId, clinicalImpressionId: props.clinicalImpressionId});
    
    return (
        <>
            <Typography variant="h5">Clinical Impression</Typography>
                        
            {
                isLoading ? <p>Loading...</p> 
                : 
                <Box sx={{
                  width: '100%',
                  bgcolor: "#d5e6f7",
                  paddingTop: "0.1em",
                  paddingLeft: "0.5em"
                }}>
                    <p>Id: {clinicalImpression?.id}</p>
                    <p>Type: {clinicalImpression?.type}</p> 
                    <p>Result: {clinicalImpression?.finding}</p>
                    <p>QuestionnaireResponseId: {clinicalImpression?.questionnaireResponseId}</p>
                </Box>
            }
        </>
    )
}