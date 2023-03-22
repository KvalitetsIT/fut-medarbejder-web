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
import CreateCarePlan from "../../models/CreateCarePlan";

export interface FormProps<T> {
    onSubmit: (submission: T) => Promise<void>
    onCancel: () => void,
    isLoading?: boolean
}

interface CreateCarePlanFormProps extends FormProps<CreateCarePlan> {
    createCarePlan?: CreateCarePlan,
    loading?: boolean, 
    episodeOfCareId: number
}

export function CreateCarePlanForm(props: CreateCarePlanFormProps) {

    const validationSchema = yup.object().shape({
        createCarePlan: yup.object().shape({
            planDefinitionId: yup.string().required(t("Man skal angive en plan."))
        }),
    })

    const defaultValues: CreateCarePlan = {
        episodeOfCareId: props.episodeOfCareId,
        planDefinitionId: "16857",
    }

    function errorHandler(errors : FormikErrors<{
        createCarePlan: CreateCarePlan;
        checked: boolean;
    }>) {
        if (errors.createCarePlan?.planDefinitionId) return errors.createCarePlan?.planDefinitionId;
        return undefined;
    }

    if (props.isLoading) return (<p>Loading...</p>)
    return (
        <Box sx={{width: '50%'}}>
        <FormControl fullWidth>
            <Formik
                initialValues={{
                    createCarePlan: props.createCarePlan ?? defaultValues,
                    checked: false
                }}
                onSubmit={(values) => props.onSubmit(values.createCarePlan)}
                validationSchema={validationSchema}
                enableReinitialize
            >
                
                {({ errors, touched, values, handleChange, setFieldValue }) => (
                    <Form>
                        <Stack spacing={2}>
                            <ValidatedTextField
                                type={"text"}
                                name="createCarePlan.planDefinitionId"
                                label={t("Plan id")}
                                value={values.createCarePlan?.planDefinitionId}
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