import sql from "@/app/lib/db";
import type { Sensor } from "@/app/models/sensor.model";

export async function getSensors(limit = 10): Promise<Sensor[]> {
  const row: any[] = await sql`
        SELECT
        id AS "id",
        sensor_id AS "sensorId",
        device_type AS "deviceType",
        device_id AS "deviceId",
        device_label AS "deviceLabel",
        ip_address AS "ipAddress",
        sensor_label AS "sensorLabel",
        sensor_type AS "sensorType",
        sensor_unit AS "sensorUnit",
        is_selected AS "is_selected"
        FROM sensor_table
        LIMIT ${limit}
    `;

  return row as Sensor[];
}


export async function getAllSensors(): Promise<Sensor[]> {
  const row: any[] = await sql`
        SELECT
        id AS "id",
        sensor_id AS "sensorId",
        device_type AS "deviceType",
        device_id AS "deviceId",
        device_label AS "deviceLabel",
        ip_address AS "ipAddress",
        sensor_label AS "sensorLabel",
        sensor_type AS "sensorType",
        sensor_unit AS "sensorUnit",
        is_selected AS "is_selected"
        FROM sensor_table
    `;

  return row as Sensor[];
}

export async function searchSensors(
  query: string,
  limit = 10
): Promise<Sensor[]> {
  const row: any[] = await sql`
    SELECT
    id AS "id",
    sensor_id AS "sensorId",
    device_type AS "deviceType",
    device_id AS "deviceId",
    device_label AS "deviceLabel",
    ip_address AS "ipAddress",
    sensor_label AS "sensorLabel",
    sensor_type AS "sensorType",
    sensor_unit AS "sensorUnit",
    is_selected AS "isSelected"
    FROM sensor_table
    WHERE (
      sensor_label ILIKE ${"%" + query + "%"}
      OR device_label ILIKE ${"%" + query + "%"}
      OR device_type ILIKE ${"%" + query + "%"}
      OR device_id ILIKE ${"%" + query + "%"}
      OR sensor_id ILIKE ${"%" + query + "%"}
      OR ip_address ILIKE ${"%" + query + "%"}
    )
    ORDER BY id
    LIMIT ${limit};
  `;
  return row as Sensor[];
}


export async function getSelectedSensors(): Promise<Sensor[]> {
  const rows = await sql`
    SELECT  
    id AS "id",
    sensor_id AS "sensorId",
    device_type AS "deviceType",
    device_id AS "deviceId",
    device_label AS "deviceLabel",
    ip_address AS "ipAddress",
    sensor_label AS "sensorLabel",
    sensor_type AS "sensorType",
    sensor_unit AS "sensorUnit",
    is_selected AS "isSelected"
    FROM sensor_table
    WHERE is_selected = true`;

  return rows as Sensor[];
}


export async function updateSensorSelection(addSensorIds: string[], removeSensorIds: string[]) {
  const normalizedAddIds = addSensorIds.map(String);
  const normalizedRemoveIds = removeSensorIds.map(String);

  await sql`
    UPDATE sensor_table
    SET is_selected = true
    WHERE sensor_id = ANY(${normalizedAddIds})
  `;

  await sql`
    UPDATE sensor_table
    SET is_selected = false
    WHERE sensor_id = ANY(${normalizedRemoveIds})
  `;
}