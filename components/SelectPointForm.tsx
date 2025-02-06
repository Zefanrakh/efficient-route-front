import { Form } from "antd";
import SelectPoint from "./SelectPoint";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";
import { useRoadStore } from "@/state/road/road-store";

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
  }, [start, end]);

  useEffect(() => {
    if (start && end) {
      getEfficientRoutes({ start, end });
    }
  }, [start, end, congestions]);

  /* ----------------------------- FUNCTION -------------------------------- */

  const updateQueryParam = (param: string, id: string) => {
    const currentParams = new URLSearchParams(window.location.search);
    if (id) {
      currentParams.set(param, id);
    } else {
      currentParams.delete(param);
    }
    router.push(`?${currentParams.toString()}`);
  };

  const handleStartChange = (id: string) => {
    updateQueryParam("start", id);
  };

  const handleEndChange = (id: string) => {
    updateQueryParam("end", id);
  };

  /* ----------------------------- RENDER -------------------------------- */

  return (
    <Form form={form} layout="vertical">
      <SelectPoint
        label="Start Location"
        name="start"
        handleChange={handleStartChange}
      />
      <SelectPoint
        label="End Location"
        name="end"
        handleChange={handleEndChange}
      />
    </Form>
  );
}
