// Import Data API
import { getAllSensors } from "@/app/repositories/sensor.repo";

import { Sensor } from "@/app/models/sensor.model";
import SensorGrid from "@/app/components/sensors/SensorGrid";

export default async function AllSensorPage() {
    const rows: Sensor[] = await getAllSensors();

    return (
        <SensorGrid rowData={rows} />
    );
}