import {SocotraVehicle} from "@/app/common/types/socotra-vehicle";
import {SocotraDriver} from "@/app/common/types/socotra-driver.";

export type SocotaForm = {
    name: string;
    dob: string;
    vehicles: SocotraVehicle[];
    drivers: SocotraDriver[];
    accidents: Number;
    convictions: Number;
    suspensions: Number;
}