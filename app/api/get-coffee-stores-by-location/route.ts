import { fetchCoffeeStores } from "@/lib/coffee-stores";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const latLong = searchParams.get("latLong") || "";
    const limit = searchParams.get("limit") || "";

    if (!latLong) {
      return NextResponse.json(
        { message: "Missing required query parameter 'latLong'" },
        { status: 400 }
      );
    }

    const response = await fetchCoffeeStores(latLong, parseInt(limit));
    return NextResponse.json(response);
  } catch (err) {
    console.error("Error while fetching coffee stores", err);
    return NextResponse.json(
      { message: "Error while fetching coffee stores" },
      { status: 500 }
    );
  }
}
