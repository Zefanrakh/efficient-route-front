import { RoadDto } from "@/modules/road/dtos/road.dto";
import { RoadCongestionDto } from "@/modules/vehicle/dtos/road-congestion.dto";
import axios from "@/utils/axiosInstance";
import { create } from "zustand";
import qs from "qs";
import { CongestionDto } from "@/modules/vehicle/dtos/congestion.dto";
import { VehicleDto } from "@/modules/vehicle/dtos/vehicle.dto";

export type RoadStore = {
  routes: string[];
  congestions: RoadCongestionDto[];
  roads: RoadDto[];
  isLoading: boolean;
  isAddCongestionLoading: boolean;
  vehicles: VehicleDto[];
  setCongestions: (congestion: RoadCongestionDto[]) => void;
  fetchRoads: () => Promise<void>;
  fetchCongestions: () => Promise<void>;
  fetchVehicles: () => Promise<void>;
  getEfficientRoutes: (params: { start: string; end: string }) => Promise<void>;
};

export const useRoadStore = create<RoadStore>((set, get) => ({
  routes: [],
  congestions: [],
  roads: [],
  isLoading: false,
  isAddCongestionLoading: false,
  vehicles: [],
  setCongestions: async (congestions: RoadCongestionDto[]) => {
    try {
      const currentCongestions = get().congestions;
      if (congestions.length > currentCongestions.length) {
        set({ isAddCongestionLoading: true });
      }
      set({ isLoading: true });
      const congestionPayload: CongestionDto = {
        congestions: congestions.flatMap(({ road_id, vehicles }) =>
          road_id
            ? [
                {
                  road_id,
                  vehicles: vehicles.flatMap(({ amount, vehicle_id }) =>
                    amount && vehicle_id ? [{ amount, vehicle_id }] : []
                  ),
                },
              ]
            : []
        ),
      };
      if (congestions.length) {
        await axios.post("/vehicle/congestion", congestionPayload);
        await get().fetchCongestions();
      }
      set({
        congestions,
      });
    } catch (e: any) {
      console.error("Failed to update congestions:", e);
    } finally {
      set({ isLoading: false, isAddCongestionLoading: false });
    }
  },
  fetchRoads: async () => {
    try {
      set({ isLoading: true });
      const response = await axios.get("/road");
      const roads = response.data;

      set({
        roads,
      });
    } catch (e: any) {
      console.error("Failed to fetch roads:", e);
    } finally {
      set({ isLoading: false });
    }
  },
  fetchCongestions: async () => {
    try {
      set({ isLoading: true });
      const response = await axios.get("/vehicle/congestion");
      const congestions = response.data;

      set({
        congestions,
      });
    } catch (e: any) {
      console.error("Failed to fetch congestions:", e);
    } finally {
      set({ isLoading: false });
    }
  },
  fetchVehicles: async () => {
    try {
      set({ isLoading: true });
      const response = await axios.get("/vehicle");
      const vehicles = response.data;

      set({
        vehicles,
      });
    } catch (e: any) {
      console.error("Failed to fetch vehicles:", e);
    } finally {
      set({ isLoading: false });
    }
  },
  getEfficientRoutes: async (params: { start: string; end: string }) => {
    try {
      set({ isLoading: true });
      const response = await axios.get(`/road/route?${qs.stringify(params)}`);
      const routes = response.data;
      set({
        routes,
      });
    } catch (e: any) {
      console.error("Failed to fetch routes:", e);
    } finally {
      set({ isLoading: false });
    }
  },
}));
