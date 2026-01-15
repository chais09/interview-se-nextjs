"use client";

import { useEffect, useState } from "react";
import { Modal, Input, Select, List, Button, Space, Spin } from "antd";
import type { Sensor } from "@/app/models/sensor.model";

const { Search } = Input;

interface Props {
    open: boolean;
    onClose: () => void;
    onSaved: () => void;
}

export default function SensorSearchModal({
    open,
    onClose,
    onSaved,
}: Props) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Sensor[]>([]);
    const [selectedAddIds, setselectedAddIds] = useState<Set<string>>(new Set());
    const [selectedRemoveIds, setselectedRemoveIds] = useState<Set<string>>(new Set());
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [location, setLocation] = useState("San Diego"); // hard-coded it for now

    // search
    const searchSensors = async (searchText: string) => {
        setLoading(true);

        const params = new URLSearchParams({
            query: searchText.trim(),
        });

        try {
            const res = await fetch(`/api/sensors/search?${params}`);
            if (!res.ok) {
                throw new Error(`HTTP error: ${res.status}`);
            }
            const data: Sensor[] = await res.json();
            setResults(data);
        } catch (error) {
            console.error("Error searching sensors:", error);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (open) {
            setQuery("");
            setResults([]);
            setselectedAddIds(new Set());
            setselectedRemoveIds(new Set());
            searchSensors("");
        }
    }, [open]);


    const toggleSelect = (sensor: Sensor) => {
        const id = sensor.sensorId;

        if (sensor.isSelected) {
            // originally selected → toggle REMOVE intent
            setselectedRemoveIds((prev) => {
                const next = new Set(prev);
                next.has(id) ? next.delete(id) : next.add(id);
                return next;
            });
        } else {
            // originally not selected → toggle ADD intent
            setselectedAddIds((prev) => {
                const next = new Set(prev);
                next.has(id) ? next.delete(id) : next.add(id);
                return next;
            });
        }
    };



    const handleSave = async () => {
        setSaving(true);
        try {
            await fetch("/api/sensors/selection", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    addSensorIds: Array.from(selectedAddIds),
                    removeSensorIds: Array.from(selectedRemoveIds),
                }),
            });
        } catch (error) {
            console.error("Error searching sensors:", error);
        }
        setSaving(false);
        onSaved();
    };

    return (
        <Modal
            title="Cooling Sensors Settings"
            open={open}
            onCancel={onClose}
            width={720}
            destroyOnHidden
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Cancel
                </Button>,
                <Button
                    key="save"
                    type="primary"
                    loading={saving}
                    disabled={selectedAddIds.size === 0 && selectedRemoveIds.size === 0}
                    onClick={handleSave}
                >
                    Save Changes
                </Button>,
            ]}
        >
            <Space orientation="vertical" style={{ width: "100%" }}>
                {/* Location */}
                <div>
                    <strong>Location</strong>
                    <br />
                    <Select value={location} disabled style={{ width: 220 }}>
                        <Select.Option value={location}>
                            {location}
                        </Select.Option>
                    </Select>
                </div>

                <Search
                    placeholder="Search sensor by name, device type, device label, device_id, sensor_id, or ip_address"
                    allowClear
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onSearch={searchSensors}
                />

                {loading ? (
                    <div style={{ textAlign: "center", padding: 24 }}>
                        <Spin />
                    </div>
                ) : (
                    <List
                        bordered
                        locale={{ emptyText: "No sensors found" }}
                        dataSource={results}
                        renderItem={(sensor) => {
                            const originallySelected = sensor.isSelected;
                            const willAdd = selectedAddIds.has(sensor.sensorId);
                            const willRemove = selectedRemoveIds.has(sensor.sensorId);

                            const selected =
                                (originallySelected && !willRemove) ||
                                (!originallySelected && willAdd);

                            return (
                                <List.Item
                                    actions={[
                                        <Button
                                            type={selected ? "default" : "primary"}
                                            danger={selected}
                                            onClick={() => toggleSelect(sensor)}
                                        >
                                            {selected ? "Remove" : "Add"}
                                        </Button>,
                                    ]}
                                >
                                    <List.Item.Meta
                                        title={sensor.deviceLabel}
                                        description={sensor.sensorLabel}
                                    />
                                </List.Item>
                            );
                        }}
                    />
                )}
            </Space>
        </Modal>
    );
}
