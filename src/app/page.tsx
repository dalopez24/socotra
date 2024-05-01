'use client'
import * as React from 'react';
import {
    Button,
    Step,
    StepLabel,
    Stepper,
    Grid,
    Container,
    Box, Stack, Card, CardHeader, Avatar, Typography, CardContent,
} from '@mui/material';
import {StepOne} from "@/app/components/steps/step-one";
import {SocotaForm} from "@/app/common/types/socotra-form.type";
import {useEffect, useState} from "react";
import {StepTwo} from "@/app/components/steps/step-two";
import {StepThree} from "@/app/components/steps/step-three";
import {StepFour} from "@/app/components/steps/step-fiour";
import {SocotraVehicle} from "@/app/common/types/socotra-vehicle";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import {SocotraDriver} from "@/app/common/types/socotra-driver.";
import PersonIcon from '@mui/icons-material/Person';

const steps = ['1', '2', '3', '4'];
const initialState: SocotaForm = {
    name: '',
    dob: '',
    vehicles: [],
    drivers: [],
    accidents: 0,
    convictions: 0,
    suspensions: 0,
};


const FormWithSteps = () => {
    const [formValues, setFormValues] = useState<SocotaForm>(initialState)
    const [activeStep, setActiveStep] = React.useState(0);
    const [isValid, setIsValid] = React.useState(false);


    const onStepFinish = (values: Partial<SocotaForm>) => {
        setFormValues(prevState => ({...prevState, ...values}))
    }


    useEffect(() => {
    }, [formValues])


    return (
        <Container maxWidth="md">
            <Grid container direction="column" spacing={2}>
                <Grid item mt={4}>
                    <Stepper activeStep={activeStep}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel/>
                            </Step>
                        ))}
                    </Stepper>
                </Grid>

                <Grid item flexGrow={1}>
                    {activeStep === 0 && (
                        <StepOne setIsValid={setIsValid} onSubmit={onStepFinish}/>
                    )}


                    {activeStep === 1 && (
                        <StepTwo setIsValid={setIsValid} onSubmit={onStepFinish}/>
                    )}

                    {activeStep === 2 && (
                        <StepThree setIsValid={setIsValid} onSubmit={onStepFinish}/>
                    )}

                    {activeStep === 3 && (
                        <StepFour setIsValid={setIsValid} onSubmit={onStepFinish}/>
                    )}
                </Grid>


                {activeStep === steps.length ? (
                    <>
                        <Stack mt={5} spacing={2} alignItems="center">

                            <Card sx={{
                                display: 'flex',
                                width: '40%',
                                background: '#23476B',
                                color: '#fff'
                            }}>
                                <CardContent>
                                    <Stack>
                                        <Typography>Auto Quote</Typography>
                                        <Typography variant={"h4"}>$150</Typography>
                                        <Typography variant={"caption"}>per month</Typography>
                                    </Stack>
                                </CardContent>
                            </Card>


                            <Typography variant="h5"> Vehicles </Typography>
                            {formValues.vehicles.map((vehicle: SocotraVehicle) => (
                                <Card key={vehicle.id} sx={{
                                    display: 'flex',
                                    width: '40%',
                                    height: '5vw',
                                    background: '#23476B',
                                    color: '#fff'
                                }}>

                                    <CardHeader
                                        avatar={
                                            <Avatar sx={{bgcolor: "transparent", border: "2px solid"}}>
                                                <DirectionsCarIcon sx={{fontSize: 30}}/>
                                            </Avatar>
                                        }
                                        title={<Typography
                                            variant="subtitle2">{`${vehicle.year} ${vehicle.make} ${vehicle.model}`}</Typography>}
                                        subheader={<Typography variant="subtitle2">${vehicle.value}</Typography>}
                                    />

                                </Card>
                            ))}

                            <Typography mt={4} variant="h5"> Drivers </Typography>
                            {formValues.drivers.map((driver: SocotraDriver) => (
                                <Card key={driver.id} sx={{
                                    display: 'flex',
                                    width: '40%',
                                    height: '5vw',
                                    background: '#23476B',
                                    color: '#fff'
                                }}>

                                    <CardHeader
                                        avatar={
                                            <Avatar sx={{bgcolor: "transparent", border: "2px solid"}}>
                                                <PersonIcon sx={{fontSize: 30}}/>
                                            </Avatar>
                                        }
                                        title={<Typography
                                            variant="subtitle2">{`${driver.name} ${driver.lastName}`}</Typography>}
                                        subheader={<Typography variant="subtitle2">${driver.license}</Typography>}
                                    />

                                </Card>
                            ))}
                        </Stack>
                    </>
                ) : (
                    <Grid item container justifyContent="flex-end">
                        <Box mt={2}>

                            <Button variant="contained" color="primary" disabled={!isValid}
                                    onClick={async () => {
                                        setIsValid(false);
                                        setActiveStep((prev) => prev + 1)
                                    }}>
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </Box>
                    </Grid>
                )}


            </Grid>
        </Container>
    )
};

export default FormWithSteps;