import {SocotaForm} from "@/app/common/types/socotra-form.type";
import {Dispatch, SetStateAction} from "react";
import {SocotraVehicle} from "@/app/common/types/socotra-vehicle";

export interface IStepFormProps {
    setIsValid: Dispatch<SetStateAction<boolean>>;
    onSubmit: (values: Partial<SocotaForm>) => void;
}