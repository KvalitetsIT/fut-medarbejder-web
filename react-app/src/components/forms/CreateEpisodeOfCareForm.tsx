import { FormControl, Stack, Button, CircularProgress } from "@mui/material";
import { Formik, Form } from "formik";
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
            patientId: yup.string().required(t("Man skal angive patientId.")),
        }),
    })

    const defaultValues: CreateEpisodeOfCare = {
        patientId: 258981,
        careTeamId: props.careTeamId,
        provenance: "http://ehealth.sundhed.dk/policy/dk/sundhedsloven"
    }

    if (props.isLoading) return (<></>)
    return (
        <FormControl>
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
                                name="createEOC.patientId"
                                label={t("PatientId på patient der skal oprettes for")}
                                value={values.createEOC.patientId}
                                error={errors.createEOC?.patientId && touched.createEOC?.patientId ? errors.createEOC.patientId : undefined}
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