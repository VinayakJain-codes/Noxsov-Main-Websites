import { NextRequest, NextResponse } from "next/server";
import { STORE_CATALOG } from "@/lib/store/catalog";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const status = searchParams.get("status");
    const search = searchParams.get("search")?.toLowerCase().trim();
    const sort = searchParams.get("sort") || "featured";

    let results = [...STORE_CATALOG];

    if (category && category !== "all") {
      results = results.filter((p) => p.categoryId === category);
    }

    if (status && status !== "all") {
      results = results.filter((p) => p.status === status);
    }

    if (search) {
      results = results.filter(
        (p) =>
          p.name.toLowerCase().includes(search) ||
          p.tagline.toLowerCase().includes(search) ||
          p.shortDescription.toLowerCase().includes(search) ||
          p.platforms.some((pl) => pl.toLowerCase().includes(search))
      );
    }

    if (sort === "price-low") {
      results.sort((a, b) => a.startingAnnualPrice - b.startingAnnualPrice);
    } else if (sort === "price-high") {
      results.sort((a, b) => b.startingAnnualPrice - a.startingAnnualPrice);
    } else if (sort === "name") {
      results.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "rating") {
      results.sort((a, b) => b.rating - a.rating);
    }

    return NextResponse.json({
      success: true,
      count: results.length,
      products: results,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to retrieve store products",
      },
      { status: 500 }
    );
  }
}
