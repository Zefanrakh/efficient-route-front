import { CongestionVehicleDto } from "./congestion-vehicle.dto";

export interface RoadCongestionDto {
  road_id: number;
  vehicles: CongestionVehicleDto[];
}
