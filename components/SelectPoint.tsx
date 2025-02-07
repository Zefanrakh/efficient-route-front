import { useRoadStore } from "@/state/road/road-store";
import { Form, Select } from "antd";

export default function SelectPoint({
  handleChange,
  label,
  name,
}: {
  handleChange: (id: string) => void;
  label: string;
  name: string;
}) {
  /* ----------------------------- STATE HOOK -------------------------------- */

  const { roads, isLoading } = useRoadStore(({ roads, isLoading }) => ({
    roads,
    isLoading,
  }));

  /* ----------------------------- RENDER -------------------------------- */

  return (
    <Form.Item label={label} name={name}>
      <Select
        labelRender={(props) => {
          return (
            roads.find((road) => road.id.toString() === props.value)?.name ||
            null
          );
        }}
        onChange={handleChange}
        options={roads.map((road) => ({
          value: road.id,
          label: road.name,
        }))}
        loading={isLoading}
      />
    </Form.Item>
  );
}
