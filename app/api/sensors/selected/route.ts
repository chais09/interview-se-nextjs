import { getSelectedSensors } from "@/app/repositories/sensor.repo";

export async function GET() {
    const sensors = await getSelectedSensors();
    return Response.json(sensors);
}