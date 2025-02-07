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
      <h2 style={{ fontSize: "24px" }}>Get Route</h2>
      <Flex gap={10} wrap>
        <div style={{ flex: 1, minWidth: "250px", maxWidth: "600px" }}>
          <Map />
        </div>
        <div style={{ flex: 1, width: "100%" }}>
          <SelectPointForm />
          <CongestionForm />
          <RouteDirection />
        </div>
      </Flex>
    </div>
  );
}
