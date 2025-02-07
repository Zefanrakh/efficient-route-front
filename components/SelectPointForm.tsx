import { Button, Flex, Form, Tooltip } from "antd";
import SelectPoint from "./SelectPoint";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";
import { useRoadStore } from "@/state/road/road-store";
import { ArrowsAltOutlined } from "@ant-design/icons";

export default function SelectPointForm() {
  /* ----------------------------- STATE HOOK -------------------------------- */

  const congestions = useRoadStore((state) => state.congestions);
  const getEfficientRoutes = useRoadStore((state) => state.getEfficientRoutes);

  /* ----------------------------- HOOK -------------------------------- */

  const searchParams = useSearchParams();
  const start = searchParams.get("start") || "";
  const end = searchParams.get("end") || "";
  const router = useRouter();
  const [form] = useForm<{
    start: string;
    end: string;
  }>();
  useEffect(() => {
    form.setFieldsValue({
      start,
      end,
    });
    if (start && end) {
      getEfficientRoutes({ start, end });
    }
  }, [start, end, congestions]);

  /* ----------------------------- FUNCTION -------------------------------- */

  const updateQueryParam = (params: { param: string; id: string }[]) => {
    const currentParams = new URLSearchParams(window.location.search);
    params.forEach(({ param, id }) => {
      if (id) {
        currentParams.set(param, id);
      } else {
        currentParams.delete(param);
      }
    });
    router.push(`?${currentParams.toString()}`);
  };

  const handleStartChange = (id: string) => {
    updateQueryParam([{ param: "start", id }]);
  };

  const handleEndChange = (id: string) => {
    updateQueryParam([{ param: "end", id }]);
  };

  const handleReverse = () => {
    updateQueryParam([
      { param: "start", id: end },
      { param: "end", id: start },
    ]);
  };

  /* ----------------------------- RENDER -------------------------------- */

  return (
    <Form form={form} layout="vertical">
      <SelectPoint
        label="Start Location"
        name="start"
        handleChange={handleStartChange}
      />
      <Flex justify="center">
        <Tooltip
          placement="right"
          title="Reverse starting point and destination"
        >
          <Button
            onClick={handleReverse}
            color="default"
            variant="outlined"
            style={{
              paddingLeft: 0,
              paddingRight: 0,
              paddingTop: "2%",
              paddingBottom: "2%",
            }}
          >
            <ArrowsAltOutlined style={{ fontSize: "22px" }} rotate={-45} />
          </Button>
        </Tooltip>
      </Flex>
      <SelectPoint
        label="End Location"
        name="end"
        handleChange={handleEndChange}
      />
    </Form>
  );
}
