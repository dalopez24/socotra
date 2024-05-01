import {IStepFormProps} from "@/app/common/interfaces/IStepFormProps";
import {Avatar, Button, Card, CardHeader, Grid, Stack, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import RightDrawerVehicle from "@/app/shared/sidebar/vehicle";
import AddIcon from '@mui/icons-material/Add';
import {SocotraVehicle} from "@/app/common/types/socotra-vehicle";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import {v4 as uuidv4} from 'uuid';


const vehicleInitialState = {
    id: '',
    make: '',
    model: '',
    year: '',
    value: ''
}
export const StepTwo = ({setIsValid, onSubmit}: IStepFormProps) => {
    const [currentVehicle, setCurrentVehicle] = useState<SocotraVehicle>(vehicleInitialState)
    const [vehicles, setVehicles] = useState<SocotraVehicle[]>([])
    const [isOpen, setIsOpen] = useState(false);


    const onVehicleSubmit = (vehicle: SocotraVehicle) => {

        if (vehicle.id !== '') {

        } else {
            vehicle.id = uuidv4()
            setVehicles(prevVehicles => [...prevVehicles, vehicle])

        }

    }

    useEffect(() => {
        if (vehicles.length > 0) {
            setIsValid(true)
            onSubmit({
                vehicles
            })
        }
    }, [vehicles])


    return (
        <>
            <Typography variant="h4" align='center'>Tell us about your vehicles(s)</Typography>
            <Stack mt={5} spacing={2} alignItems="center">
                {vehicles.map((vehicle: SocotraVehicle) => (
                    <Card key={vehicle.id} sx={{
                        display: 'flex',
                        width: '40%',
                        height: '5vw',
                        background: '#23476B',
                        color: '#fff'
                    }} onClick={() => {
                        setCurrentVehicle(vehicle)
                        setIsOpen(true)
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
            </Stack>

            <Grid mt={4} container justifyContent={"center"}>
                <Button startIcon={<AddIcon/>} variant={"outlined"} onClick={() => {
                    setIsOpen(true);
                }}> Add vehicle</Button>

            </Grid>


            <RightDrawerVehicle item={currentVehicle} isOpen={isOpen} setIsOpen={setIsOpen} onSubmit={onVehicleSubmit}/>
        </>
    )
}