import { useRoadStore } from "@/state/road/road-store";

export default function RouteDirection() {
  /* ----------------------------- STATE HOOK -------------------------------- */

  const { routes } = useRoadStore();

  /* ----------------------------- RENDER -------------------------------- */

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Route</h3>
      {routes.length > 0 ? (
        <div style={{ fontSize: 18, fontWeight: 600 }}>
          {routes.map((route, index) => (
            <span key={index}>
              {route}
              {index < routes.length - 1 && " → "}
            </span>
          ))}
        </div>
      ) : (
        <p>No route available. Please select start and end locations.</p>
      )}
    </div>
  );
}
