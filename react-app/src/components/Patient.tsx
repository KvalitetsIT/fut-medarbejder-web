import { Divider, Typography } from "@mui/material";
import { useGetPatientQuery } from "../feature/api/patients";

interface PatientProps {
    patientId: string,
    careTeamId: string
}

export function Patient(props: PatientProps) {
    
    const { data: patient, isLoading } = useGetPatientQuery({ patientId: props.patientId, careTeamId: props.careTeamId });
    console.log(patient);
    if (isLoading) {
        return <p>Loading...</p>;
    } else return (
        <>
            <Divider />
            <Typography variant="h5">Patient</Typography>
            
            <p>Navn: {patient?.firstName} {patient?.lastName}</p>
            <p>CPR: {patient?.cpr}</p>
            <p>Id: {patient?.id}</p>
        </>
    )
}