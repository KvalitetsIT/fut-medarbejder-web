import { Divider, List, ListItem, ToggleButton, Typography } from "@mui/material"
import { useState } from "react"
import { PatientForm } from "../components/forms/PatientForm"
import { Patient, useGetPatientsQuery, usePostPatientMutation, usePutPatientMutation } from "../feature/api/patients"


enum Mode {
    NORMAL = "normal",
    ADD = "add",
    DELETE = "delete",
    UPDATE = "update",
}

export function Patients() {

    const postPatient = usePostPatientMutation()[0]
    const { data: patient, isLoading: postingPatient } = usePostPatientMutation()[1]
    const { data: patients, isLoading: fetchingPatients } = useGetPatientsQuery(undefined)
    const putPatient = usePutPatientMutation()[0]

    const [mode, setMode] = useState(Mode.NORMAL)


    return (
        <>
            <Typography variant="h4">Patients</Typography>
            <Divider    />
            <Typography>Further CRUD operations has been added both to the backend and the patient-slice</Typography>
            <Typography>example: UseDeletePatientMutation() or UsePutPatientMutation() ...  </Typography>
            <Divider    />
            <PatientForm
                onSubmit={async (submission: Patient) => {
                    postPatient(submission)
                    setMode(Mode.NORMAL)
                }}
                onCancel={() => {
                    setMode(Mode.NORMAL)
                }} />

            <List>

                {
                    patients && patients.map((patient) => <ListItem>{patient.firstName + " " + patient.lastName}</ListItem>)
                }

            </List>

        </>

    )
}