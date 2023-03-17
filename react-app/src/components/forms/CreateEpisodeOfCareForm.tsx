import { FormControl, Stack, Button, CircularProgress, Box } from "@mui/material";
import { Formik, Form, FormikErrors } from "formik";
import { t } from "i18next";
import * as yup from 'yup';
import 'dayjs/locale/fr';
import 'dayjs/locale/ru';
import 'dayjs/locale/de';
import 'dayjs/locale/ar-sa';
import 'dayjs/locale/da';
import { ValidatedTextField } from "../input/validatedTextField";
import CreateEpisodeOfCare from "../../models/CreateEpisodeOfCare";

export interface FormProps<T> {
    onSubmit: (submission: T) => Promise<void>
    onCancel: () => void,
    isLoading?: boolean
}

interface CreateEpisodeOfCareFormProps extends FormProps<CreateEpisodeOfCare> {
    createEOC?: CreateEpisodeOfCare,
    loading?: boolean, 
    careTeamId: number
}

export function CreateEpisodeOfCareForm(props: CreateEpisodeOfCareFormProps) {

    const validationSchema = yup.object().shape({
        createEOC: yup.object().shape({
            patientId: yup.string().required(t("Patient med cpr nr findes ikke i systemet.")),
            patientCpr: yup.string().required(t("Man skal angive patient cpr."))
                .length(10, t("CPR skal være på 10 cifre"))
        }),
    })

    const defaultValues: CreateEpisodeOfCare = {
        patientCpr: "1110109996",
        patientId: -1,
        careTeamId: props.careTeamId,
        provenance: "http://ehealth.sundhed.dk/policy/dk/sundhedsloven"
    }

    function errorHandler(errors : FormikErrors<{
        createEOC: CreateEpisodeOfCare;
        checked: boolean;
    }>) {
        if (errors.createEOC?.patientCpr) return errors.createEOC?.patientCpr;
        return undefined;
    }

    if (props.isLoading) return (<p>Loading...</p>)
    return (
        <Box sx={{width: '50%'}}>
        <FormControl fullWidth>
            <Formik
                initialValues={{
                    createEOC: props.createEOC ?? defaultValues,
                    checked: false
                }}
                onSubmit={(values) => props.onSubmit(values.createEOC)}
                validationSchema={validationSchema}
                enableReinitialize
            >
                
                {({ errors, touched, values, handleChange, setFieldValue }) => (
                    <Form>
                        <Stack spacing={2}>
                            <ValidatedTextField
                                type={"text"}
                                name="createEOC.patientCpr"
                                label={t("Patient CPR nr")}
                                value={values.createEOC?.patientCpr}
                                error={errorHandler(errors)}
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
        </Box>
    )
}