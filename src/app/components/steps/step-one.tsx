import {useFormik} from "formik";
import * as yup from "yup";
import {Grid, TextField, Typography} from "@mui/material";
import * as React from "react";
import {IStepFormProps} from "@/app/common/interfaces/IStepFormProps";
import {SocotaForm} from "@/app/common/types/socotra-form.type";

const validateSchema = yup.object({
    name: yup.string().required('Name is required'),
    dob: yup.string().required('Dof is required'),
});


export const StepOne = ({setIsValid, onSubmit}: IStepFormProps) => {
    const firstStepForm = useFormik({
            initialValues: {
                name: '',
                dob: '',
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

    return (<>
            <Typography variant="h4" align='center'>Tell us about yourself</Typography>
            <form>
                <Grid item mt={3}>
                    <TextField value={firstStepForm.values["name"]} id={"name"} label="Name"
                               onChange={firstStepForm.handleChange}
                               onBlur={firstStepForm.handleBlur}
                               error={firstStepForm.touched["name"] && Boolean(firstStepForm.errors["name"])}
                               helperText={firstStepForm.touched["name"] && firstStepForm.errors["name"]}
                               fullWidth/>
                </Grid>
                <Grid item mt={3}>
                    <TextField id={"dob"} value={firstStepForm.values["dob"]} label="Date of Birth" name="dob"
                               onChange={firstStepForm.handleChange}
                               onBlur={firstStepForm.handleBlur}
                               type="date"
                               error={firstStepForm.touched["dob"] && Boolean(firstStepForm.errors["dob"])}
                               helperText={firstStepForm.touched["dob"] && firstStepForm.errors["dob"]}
                               InputLabelProps={{shrink: true}} fullWidth
                    />
                </Grid>
            </form>
        </>
    )

}