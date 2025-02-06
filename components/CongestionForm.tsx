import { RoadCongestionDto } from "@/modules/vehicle/dtos/road-congestion.dto";
import { VehicleAmountDto } from "@/modules/vehicle/dtos/vehicle-amount.dto";
import { useRoadStore } from "@/state/road/road-store";
import { Button, Form, Input, Select, Skeleton } from "antd";

export default function CongestionForm() {
  /* ----------------------------- STATE HOOK -------------------------------- */

  const roads = useRoadStore((state) => state.roads);
  const congestions = useRoadStore((state) => state.congestions);
  const setCongestions = useRoadStore((state) => state.setCongestions);
  const vehicles = useRoadStore((state) => state.vehicles);
  const isLoading = useRoadStore((state) => state.isLoading);
  const isAddCongestionLoading = useRoadStore(
    (state) => state.isAddCongestionLoading
  );

  /* ----------------------------- FUNCTION -------------------------------- */

  const handleAddRoad = () => {
    setCongestions([...congestions, { road_id: null, vehicles: [] }]);
  };

  const handleAddVehicle = (roadIndex: number) => {
    const updatedCongestions = [...congestions];
    updatedCongestions[roadIndex].vehicles.push({
      vehicle_id: null,
      amount: 1,
    });
    setCongestions(updatedCongestions);
  };

  const handleUpdateRoad = (index: number, id: number) => {
    const updatedCongestions = [...congestions];
    updatedCongestions[index].road_id = id;
    setCongestions(updatedCongestions);
  };

  const handleUpdateVehicle = (
    roadIndex: number,
    vehicleIndex: number,
    field: keyof VehicleAmountDto,
    value: number
  ) => {
    const updatedCongestions = [...congestions];
    updatedCongestions[roadIndex].vehicles[vehicleIndex][field] = value;
    setCongestions(updatedCongestions);
  };

  const handleRemoveCongestion = async (index: number) => {
    const updatedCongestions = [...congestions];
    updatedCongestions.splice(index, 1);
    setCongestions(updatedCongestions);
  };

  /* ----------------------------- RENDER -------------------------------- */

  const renderCongestionList = (road: RoadCongestionDto, roadIndex: number) => {
    const roadVehicles = road.vehicles;
    if (roadVehicles.length) {
      return (
        <div>
          {road.vehicles.map((vehicle, vehicleIndex) => (
            <div
              key={vehicleIndex}
              style={{
                display: "flex",
                gap: "10px",
                marginBottom: "5px",
              }}
            >
              <Select
                loading={isLoading}
                style={{
                  flex: 1,
                }}
                value={vehicle.vehicle_id}
                disabled={!vehicles.length}
                labelRender={(props) =>
                  vehicles.find((v) => v.id === props.value)?.name || null
                }
                onChange={(value) =>
                  handleUpdateVehicle(
                    roadIndex,
                    vehicleIndex,
                    "vehicle_id",
                    value
                  )
                }
                options={vehicles.map((vehicle) => ({
                  value: vehicle.id,
                  label: vehicle.name,
                }))}
              />
              <Input
                style={{
                  flex: 1,
                }}
                type="number"
                min={1}
                value={vehicle.amount}
                onChange={(e) =>
                  handleUpdateVehicle(
                    roadIndex,
                    vehicleIndex,
                    "amount",
                    parseInt(e.target.value, 10)
                  )
                }
              />
            </div>
          ))}
        </div>
      );
    } else {
      return <></>;
    }
  };

  return (
    <Form layout="vertical">
      <h3>Congestion</h3>
      {congestions.map((road, roadIndex) => (
        <div
          key={roadIndex}
          style={{
            marginBottom: 20,
            display: "flex",
            gap: "10px",
          }}
        >
          <Select
            loading={isLoading}
            style={{ flex: 1 }}
            value={road.road_id?.toString()}
            labelRender={(props) =>
              roads.find((r) => r.id.toString() === props.value.toString())
                ?.name || null
            }
            disabled={!roads.length}
            onChange={(value) => handleUpdateRoad(roadIndex, Number(value))}
            options={roads.map((road) => ({
              value: road.id,
              label: road.name,
            }))}
          />
          <div style={{ flex: 1, flexDirection: "column" }}>
            {renderCongestionList(road, roadIndex)}
            <Button
              type="dashed"
              onClick={() => handleAddVehicle(roadIndex)}
              loading={isLoading}
            >
              Add Vehicle
            </Button>
          </div>
          <Button
            type="primary"
            danger
            onClick={() => handleRemoveCongestion(roadIndex)}
            loading={isLoading}
          >
            Remove Congestion
          </Button>
        </div>
      ))}
      {isLoading && isAddCongestionLoading && <Skeleton active />}
      <Button type="dashed" onClick={handleAddRoad} loading={isLoading}>
        Add Road Congestion
      </Button>
    </Form>
  );
}
