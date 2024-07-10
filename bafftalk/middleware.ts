import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  try {
    var backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const cookies = request.headers.get("cookie") || "";

    const response = await fetch(`${backendUrl}/user`, {
      credentials: "include",
      headers: {
        Cookie: cookies,
      },
    });

    if (response.status === 401) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } catch (error) {
    console.log("middleware error");
    console.log(error);
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/profile", "/createPost", "/createGroup", "/group/:id*"],
};
