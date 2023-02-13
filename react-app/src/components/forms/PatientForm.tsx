import { FormControl, Stack, Button, CircularProgress, Box } from "@mui/material";
import { Formik, Form } from "formik";
import { t } from "i18next";
import * as yup from 'yup';
import 'dayjs/locale/fr';
import 'dayjs/locale/ru';
import 'dayjs/locale/de';
import 'dayjs/locale/ar-sa';
import 'dayjs/locale/da';
import { Patient } from "../../feature/api/patients";
import { ValidatedTextField } from "../input/validatedTextField";



export interface FormProps<T> {
    onSubmit: (submission: T) => Promise<void>
    onCancel: () => void,
    isLoading?: boolean

}

interface PatientFormProps extends FormProps<Patient> {
    patient?: Patient
    loading?: boolean
}

export function PatientForm(props: PatientFormProps) {

    const validationSchema = yup.object().shape({
        patient: yup.object().shape({
            lastName: yup.string().required(t("Subject") +" "+ t("is required")),
            firstName: yup.string().required(t("Message") +" "+ t("is required")),
        }),
    })

    const defaultValues: Patient = {
        
        firstName: "",
        lastName: "",
    }

    if (props.isLoading) return (<></>)
    return (
        <FormControl fullWidth>
            <Formik
                initialValues={{
                    patient: props.patient ?? defaultValues,
                    checked: false
                }}
                onSubmit={(values) => props.onSubmit(values.patient)}
                validationSchema={validationSchema}
                enableReinitialize

            >
                {({ errors, touched, values, handleChange, setFieldValue }) => (
                    <Form>
                        <Stack spacing={2}>
                            <ValidatedTextField
                                type={"text"}
                                error={errors.patient?.firstName && touched.patient?.firstName ? errors.patient.firstName : undefined}
                                label={t("First Name")}
                                name="patient.firstName"
                                value={values.patient?.firstName}
                                onChange={handleChange}
                            />

                            <ValidatedTextField
                                type={"text"}
                                error={errors.patient?.lastName && touched.patient?.lastName ? errors.patient.lastName : undefined}
                                label={t("Last Name")}
                                name="patient.lastName"
                                value={values.patient?.lastName}
                                onChange={handleChange}
                            />


                            <Stack spacing={2} direction={"row"}>
                                <Button
                                    type={"submit"}
                                    variant="contained"
                                    disabled={props.loading}
                                    fullWidth={true}
                                >
                                    {props.loading ? <CircularProgress color={"inherit"} size={"1.5em"}></CircularProgress> : <>{t("Submit")}</>}
                                </Button>

                                <Button fullWidth={true} onClick={props.onCancel} variant="outlined">{t("Cancel")+""}</Button>
                            </Stack>
                        </Stack>
                    </Form>
                )}

            </Formik>
        </FormControl >
    )
}