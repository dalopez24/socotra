import {useFormik} from "formik";
import * as yup from "yup";
import {Grid, MenuItem, TextField, Typography} from "@mui/material";
import * as React from "react";
import {IStepFormProps} from "@/app/common/interfaces/IStepFormProps";
import {SocotaForm} from "@/app/common/types/socotra-form.type";
import CustomFormLabel from "@/app/shared/components/CustomFormLabel";


const validateSchema = yup.object({
    accidents: yup.number().required('Field is required'),
    convictions: yup.number().required('Field is required'),
    suspensions: yup.number().required('Field is required'),
});


export const StepFour = ({setIsValid, onSubmit}: IStepFormProps) => {
    const fourStepForm = useFormik({
            initialValues: {
                accidents: 0,
                convictions: 0,
                suspensions: 0
            },
            validate: async (values: Partial<SocotaForm>) => {
                setIsValid(await validateSchema.isValid(values))
                onSubmit(values)
            },
            onSubmit: (values: Partial<SocotaForm>) => {
                setIsValid(true);
                onSubmit(values)
            }
        }
    )

    return <>
        <Typography variant="h4" align='center'>Tell us about yourself</Typography>
        <form>
            <Grid item mt={3}>
                <CustomFormLabel sx={{mt: 0}}>
                    Has any driver had any at-fault accidents in the past 6 years?
                </CustomFormLabel>
                <TextField
                    fullWidth
                    id="accidents"
                    name="accidents"
                    value={fourStepForm.values["accidents"]}
                    onChange={fourStepForm.handleChange}
                    onBlur={fourStepForm.handleBlur}
                    error={fourStepForm.touched["accidents"] && Boolean(fourStepForm.errors["accidents"])}
                    helperText={fourStepForm.touched["accidents"] && fourStepForm.errors["accidents"]}
                    select={true}
                >
                    <MenuItem value={1}>Yes</MenuItem>
                    <MenuItem value={0}>No</MenuItem>
                </TextField>
            </Grid>

            <Grid item mt={3}>
                <CustomFormLabel sx={{mt: 0}}>
                    Has any driver had any minor or major convictions in the past 6 years?
                </CustomFormLabel>
                <TextField
                    fullWidth
                    id="convictions"
                    name="convictions"
                    value={fourStepForm.values["convictions"]}
                    onChange={fourStepForm.handleChange}
                    onBlur={fourStepForm.handleBlur}
                    error={fourStepForm.touched["convictions"] && Boolean(fourStepForm.errors["convictions"])}
                    helperText={fourStepForm.touched["convictions"] && fourStepForm.errors["convictions"]}
                    select={true}
                >
                    <MenuItem value={1}>Yes</MenuItem>
                    <MenuItem value={0}>No</MenuItem>
                </TextField>
            </Grid>

            <Grid item mt={3}>
                <CustomFormLabel sx={{mt: 0}}>
                    Has any driver had any license suspensions/revocations?
                </CustomFormLabel>
                <TextField
                    fullWidth
                    id="suspensions"
                    name="suspensions"
                    value={fourStepForm.values["suspensions"]}
                    onChange={fourStepForm.handleChange}
                    onBlur={fourStepForm.handleBlur}
                    error={fourStepForm.touched["suspensions"] && Boolean(fourStepForm.errors["suspensions"])}
                    helperText={fourStepForm.touched["suspensions"] && fourStepForm.errors["suspensions"]}
                    select={true}
                >
                    <MenuItem value={1}>Yes</MenuItem>
                    <MenuItem value={0}>No</MenuItem>
                </TextField>
            </Grid>
        </form>
    </>

}