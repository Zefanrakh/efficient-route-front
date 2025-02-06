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

  const { roads } = useRoadStore();

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
        disabled={!roads.length}
        onChange={handleChange}
        options={roads.map((road) => ({
          value: road.id,
          label: road.name,
        }))}
      />
    </Form.Item>
  );
}
