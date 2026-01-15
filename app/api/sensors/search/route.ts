// app/api/sensors/search/route.ts
import { searchSensors } from "@/app/repositories/sensor.repo";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query") ?? "";
    // if (!query) {
    //     return new Response(
    //         JSON.stringify({ error: "query is required" }),
    //         { status: 400 }
    //     );
    // }

    const sensors = await searchSensors(
        query
    );


    return Response.json(sensors);
}
