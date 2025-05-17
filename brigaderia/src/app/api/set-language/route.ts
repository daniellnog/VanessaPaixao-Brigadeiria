import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { language } = await request.json();

    const response = NextResponse.json({ success: true });

    response.cookies.set("language", language, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 dias
      httpOnly: false,
      sameSite: "lax",
    });

    return response;
  } catch (error: unknown) {
    let message = "Unknown error";

    if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
