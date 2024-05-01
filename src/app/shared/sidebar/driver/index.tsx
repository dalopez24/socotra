import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import {ISideBarDriverProps, ISideBarProps} from "@/app/common/interfaces/ISideBarProps";
import {useFormik} from "formik";
import * as yup from "yup";
import {Box, Grid, Stack, TextField, Typography} from "@mui/material";
import {useEffect} from "react";
import {SocotraDriver} from "@/app/common/types/socotra-driver.";

const validateSchema = yup.object({
    name: yup.string().required('Make is required'),
    lastName: yup.string().required('Model is required'),
    license: yup.string().required('Year is required'),
});


export default function RightDrawerDriver({item, isOpen, setIsOpen, onSubmit}: ISideBarDriverProps) {

    const toggleDrawer = (open: boolean) => (event: any) => {
        setIsOpen(open);
    };

    const formik = useFormik({
            initialValues: item,
            validationSchema: validateSchema,
            onSubmit: (values: SocotraDriver) => {
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
                                id="name"
                                name="name"
                                label="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                            />
                        </Grid>
                        <Grid item mt={3}>
                            <TextField
                                id="lastName"
                                name="lastName"
                                label="lastName"
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                helperText={formik.touched.lastName && formik.errors.lastName}
                            />
                        </Grid>
                        <Grid item mt={3}>
                            <TextField
                                id="license"
                                name="license"
                                label="license number"
                                value={formik.values.license}
                                onChange={formik.handleChange}
                                error={formik.touched.license && Boolean(formik.errors.license)}
                                helperText={formik.touched.license && formik.errors.license}
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