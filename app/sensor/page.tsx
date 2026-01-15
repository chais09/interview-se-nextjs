import SensorPageClient from '@/app/components/sensors/SensorPage';
import type { Sensor } from '@/app/models/sensor.model';
import { getAllSensors, getSensors } from "@/app/repositories/sensor.repo";

export default async function SensorPage() {
    // const allSensor: Sensor[] = await getAllSensors();
    // const selec

    return (
        <>
            <div>
                <div className="selected-grid">
                    <SensorPageClient />
                </div>
            </div>
        </>
    );
}