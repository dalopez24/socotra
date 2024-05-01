import {IStepFormProps} from "@/app/common/interfaces/IStepFormProps";
import {Avatar, Button, Card, CardHeader, Grid, Stack, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import AddIcon from '@mui/icons-material/Add';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import {v4 as uuidv4} from 'uuid';
import {SocotraDriver} from "@/app/common/types/socotra-driver.";
import RightDrawerDriver from "@/app/shared/sidebar/driver";
import PersonIcon from "@mui/icons-material/Person";


const driverInitialState = {
    id: '',
    name: '',
    lastName: '',
    license: '',
}
export const StepThree = ({setIsValid, onSubmit}: IStepFormProps) => {
    const [currentDriver, setCurrenDriver] = useState<SocotraDriver>(driverInitialState)
    const [drivers, setDrivers] = useState<SocotraDriver[]>([])
    const [isOpen, setIsOpen] = useState(false);


    const onDriverSubmit = (driver: SocotraDriver) => {

        if (driver.id !== '') {

        } else {
            driver.id = uuidv4()
            setDrivers(prevDrivers => [...prevDrivers, driver])

        }

    }

    useEffect(() => {
        if (drivers.length > 0) {
            setIsValid(true)
            onSubmit({
                drivers
            })
        }
    }, [drivers])


    return (
        <>
            <Typography variant="h4" align='center'>Tell us about your driver(s)</Typography>
            <Stack mt={5} spacing={2} alignItems="center">
                {drivers.map((driver: SocotraDriver) => (
                    <Card key={driver.id} sx={{
                        display: 'flex',
                        width: '40%',
                        height: '5vw',
                        background: '#23476B',
                        color: '#fff'
                    }} onClick={() => {
                        setCurrenDriver(driver)
                        setIsOpen(true)
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

            <Grid mt={4} container justifyContent={"center"}>
                <Button startIcon={<AddIcon/>} variant={"outlined"} onClick={() => {
                    setIsOpen(true);
                }}> Add driver</Button>

            </Grid>


            <RightDrawerDriver item={currentDriver} isOpen={isOpen} setIsOpen={setIsOpen} onSubmit={onDriverSubmit}/>
        </>
    )
}