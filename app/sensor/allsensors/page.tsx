// Import Data API
import { getAllSensors } from "@/app/repositories/sensor.repo";
import SensorGrid from "@/components/sensors/_SensorGrid";
import { Sensor } from "@/app/models/sensor.model";

export default async function AllSensorPage() {
    const rows: Sensor[] = await getAllSensors();

    return (
        <SensorGrid rowData={rows} />
    );
}