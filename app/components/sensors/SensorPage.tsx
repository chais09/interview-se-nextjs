"use client";

import { useEffect, useState } from "react";
import { Button, Space, Typography, Tag } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import SensorGrid from "@/app/components/sensors/SensorGrid";
import SensorSearchModal from "@/app/components/sensors/SensorSearchModal";
import type { Sensor } from "@/app/models/sensor.model";

const { Title, Text } = Typography;

export default function SensorPageClient() {
    const [sensors, setSensors] = useState<Sensor[]>([]);
    const [open, setOpen] = useState(false);

    const loadSelectedSensors = async () => {
        const res = await fetch("/api/sensors/selected");
        const data = await res.json();
        setSensors(data);
    };

    useEffect(() => {
        loadSelectedSensors();
    }, []);

    return (
        <div className="page-container">
            {/* ===== GRID HEADER ===== */}
            <div className="grid-header">
                <div>
                    <div className="text-lg font-semibold mb-1 m" style={{ marginBottom: 4 }}>
                        Selected Sensors
                    </div>
                    <div>
                        <Text type="secondary">Data Center:</Text>
                        <Tag color="blue">San Diego</Tag>
                        <Tag color="green">{sensors.length} Selected</Tag>
                    </div>
                </div>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setOpen(true)}
                >
                    Search / Add Sensors
                </Button>
            </div>

            <SensorGrid rowData={sensors} />

            <SensorSearchModal
                open={open}
                onClose={() => setOpen(false)}
                onSaved={() => {
                    setOpen(false);
                    loadSelectedSensors();
                }}
            />
        </div>
    );
}
