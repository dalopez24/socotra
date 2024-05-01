import {Dispatch, SetStateAction} from "react";
import {SocotraVehicle} from "@/app/common/types/socotra-vehicle";
import {SocotraDriver} from "@/app/common/types/socotra-driver.";

export interface ISideBarProps {
    item: SocotraVehicle;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    onSubmit: (values: SocotraVehicle) => void;
}

export interface ISideBarDriverProps {
    item: SocotraDriver;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    onSubmit: (values: SocotraDriver) => void;
}