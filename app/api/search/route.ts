import { NextRequest, NextResponse } from "next/server";
import { searchMovies } from "@/lib/omdb";
import { isOMDbError } from "@/types/movie";


export async function GET(request:NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q")?.trim();
    const page = Number(searchParams.get("page") ?? "1");

    if (!query) {
        return NextResponse.json(
            {error: "Missing required query parameter 'q'."},
            { status: 400}
        );
    }

    if (!Number.isInteger(page) || page < 1) {
        return NextResponse.json(
            {error: "'page' must be a positive integer." },
            {status: 400}
        );
    }

    try{
        const result = await searchMovies(query, page);

        if (isOMDbError(result)) {

            // OMDb returns Response: "False" for things like "no results found"
      // or a bad API key — treat these as normal (non-500) responses.
        const status = result.Error.toLowerCase().includes("api key")
        ? 401
        : 404;
        return NextResponse.json({error: result.Error }, { status });
        }

        return NextResponse.json(result);
    } catch (err) {
        console.error("OMDb search failed:", err);
        return NextResponse.json({ error: "Something went wrong while searching. Please try again." },
            { status: 500 }
        );
    }
}