"use client";

import { AgGridReact } from "ag-grid-react";
import type { ColDef } from "ag-grid-community";
import type { Sensor } from "@/app/models/sensor.model";
import { useMemo, useRef } from "react";

import { AllCommunityModule, ModuleRegistry, RowSelectionModule, } from "ag-grid-community";
ModuleRegistry.registerModules([AllCommunityModule, RowSelectionModule]);

interface SensorGridProps {
    rowData: Sensor[];
}

export default function SensorGrid({
    rowData
}: SensorGridProps) {
    const gridRef = useRef<AgGridReact<Sensor>>(null);

    const defaultColDef = useMemo<ColDef>(() => ({
        sortable: true,
        filter: true,
        resizable: true,
        floatingFilter: true,
    }), []);

    const columnDefs = useMemo<ColDef<Sensor>[]>(() => [
        { field: "sensorId" },
        { field: "deviceType", width: 110 },
        { field: "deviceId" },
        { field: "deviceLabel" },
        { field: "ipAddress" },
        { field: "sensorLabel" },
        { field: "sensorType" },
        { field: "sensorUnit", width: 110 },
    ], []);

    return (
        <div className="ag-theme-quartz" style={{
            height: "calc(100vh - 120px)",
            margin: "20px"
        }}>
            {/* <div>Selected Sensors</div> */}
            <AgGridReact
                ref={gridRef}
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                pagination
                paginationPageSize={100}
                animateRows
            />
        </div>
    );
}
