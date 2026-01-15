// app/api/sensors/selection/route.ts
import { updateSensorSelection } from "@/app/repositories/sensor.repo";

export async function POST(req: Request) {
    const { addSensorIds, removeSensorIds } = await req.json();

    await updateSensorSelection(addSensorIds, removeSensorIds);

    return Response.json({ success: true });
}