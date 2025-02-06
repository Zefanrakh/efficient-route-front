import { VehicleAmountDto } from "@/modules/vehicle/dtos/vehicle-amount.dto";
import { ConnectionDto } from "./connection.dto";

export interface RoadDto {
    id: number;
    name: string;
    connections: ConnectionDto[];
    vehicles: VehicleAmountDto[];
}