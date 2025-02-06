"use client";

import CongestionForm from "@/components/CongestionForm";
import Map from "@/components/Map";
import RouteDirection from "@/components/RouteDirection";
import SelectPointForm from "@/components/SelectPointForm";
import { useRoadStore } from "@/state/road/road-store";
import { Flex } from "antd";
import { useEffect } from "react";

export default function Home() {
  /* ----------------------------- STATE HOOK -------------------------------- */

  const fetchRoads = useRoadStore((state) => state.fetchRoads);
  const fetchVehicles = useRoadStore((state) => state.fetchVehicles);
  const fetchCongestions = useRoadStore((state) => state.fetchCongestions);

  /* ----------------------------- HOOK -------------------------------- */

  useEffect(() => {
    fetchRoads();
    fetchVehicles();
    fetchCongestions();
  }, []);

  /* ----------------------------- RENDER -------------------------------- */

  return (
    <div style={{ padding: 20 }}>
      <h2>Route Finder</h2>
      <Flex gap={10} wrap>
        <div style={{ flex: 1, minWidth: "500px", maxWidth: "600px" }}>
          <Map />
        </div>
        <div style={{ flex: 1 }}>
          <SelectPointForm />
          <CongestionForm />
          <RouteDirection />
        </div>
      </Flex>
    </div>
  );
}
