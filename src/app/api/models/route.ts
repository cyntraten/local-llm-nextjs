import { NextResponse } from "next/server";

export async function GET() {
  try {
    const LLM_HOST = process.env.LLM_HOST;
    if (!LLM_HOST) {
      return NextResponse.json(
        { error: "LLM HOST is not defined" },
        { status: 500 }
      );
    }

    const res = await fetch(`${LLM_HOST}/v1/models`);
    if (!res.ok) {
      return NextResponse.json(
        { error: "FETCH MODELS DATA Error" },
        { status: 500 }
      );
    }

    const data = await res.json();

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
