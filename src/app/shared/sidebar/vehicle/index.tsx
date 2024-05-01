import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import {ISideBarProps} from "@/app/common/interfaces/ISideBarProps";
import {useFormik} from "formik";
import * as yup from "yup";
import {SocotraVehicle} from "@/app/common/types/socotra-vehicle";
import {Box, Grid, Stack, TextField, Typography} from "@mui/material";
import {useEffect} from "react";

const validateSchema = yup.object({
    make: yup.string().required('Make is required'),
    model: yup.string().required('Model is required'),
    year: yup.string().required('Year is required'),
    value: yup.number().required('Value is required'),
});


export default function RightDrawerVehicle({item, isOpen, setIsOpen, onSubmit}: ISideBarProps) {

    const toggleDrawer = (open: boolean) => (event: any) => {
        setIsOpen(open);
    };

    const formik = useFormik({
            initialValues: item,
            validationSchema: validateSchema,
            onSubmit: (values: SocotraVehicle) => {
                onSubmit(values)
                setIsOpen(false)
                formik.resetForm()
            }
        }
    )

    useEffect(() => {
        formik.setValues(item)
    }, [item])


    return (
        <>
            <Drawer variant={"temporary"} anchor={'right'} PaperProps={{
                sx: {width: "30%"},
            }} open={isOpen} onClose={toggleDrawer(false)}>
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    style={{minHeight: "50px"}}
                >
                    <Typography variant="h6">Add Vehicle</Typography>
                </Box>

                <form onSubmit={formik.handleSubmit}>
                    <Grid container justifyContent="center" spacing={1}>
                        <Grid item mt={3}>
                            <TextField
                                id="make"
                                name="make"
                                label="Make"
                                value={formik.values.make}
                                onChange={formik.handleChange}
                                error={formik.touched.make && Boolean(formik.errors.make)}
                                helperText={formik.touched.make && formik.errors.make}
                            />
                        </Grid>
                        <Grid item mt={3}>
                            <TextField
                                id="model"
                                name="model"
                                label="Model"
                                value={formik.values.model}
                                onChange={formik.handleChange}
                                error={formik.touched.model && Boolean(formik.errors.model)}
                                helperText={formik.touched.model && formik.errors.model}
                            />
                        </Grid>
                        <Grid item mt={3}>
                            <TextField
                                id="year"
                                name="year"
                                label="Year"
                                value={formik.values.year}
                                onChange={formik.handleChange}
                                error={formik.touched.year && Boolean(formik.errors.year)}
                                helperText={formik.touched.year && formik.errors.year}
                            />
                        </Grid>
                        <Grid item mt={3}>
                            <TextField
                                id="value"
                                name="value"
                                label="Value"
                                type="number"
                                value={formik.values.value}
                                onChange={formik.handleChange}
                                error={formik.touched.value && Boolean(formik.errors.value)}
                                helperText={formik.touched.value && formik.errors.value}
                            />
                        </Grid>
                    </Grid>
                    <Grid item mt={3}>
                        <Stack justifyContent="flex-end" direction="row" spacing={2} pr={2}>
                            <Button onClick={() => {
                                setIsOpen(false)
                            }}>
                                Cancel
                            </Button>
                            <Button disabled={!formik.isValid} color="primary" variant="contained" type="submit">
                                Submit
                            </Button>
                        </Stack>
                    </Grid>
                </form>
            </Drawer>
        </>
    );
}