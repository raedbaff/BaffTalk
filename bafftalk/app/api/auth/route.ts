import { NextRequest, NextResponse } from "next/server";

export const GET = (req: NextRequest, res: NextResponse) => {
  try {
    const authToken = {
      token: "tokenString",
      username: "raed",
      // other properties as needed
    };

    const authTokenString = JSON.stringify(authToken);

    // Calculate maxAge properly in seconds (60 seconds * 60 minutes * 24 hours = 86400 seconds)
    const maxAgeSeconds = 60 * 60 * 24; // 24 hours

    // Create a new NextResponse with proper parameters
    return new NextResponse(null, {
      status: 200,
      headers: {
        "Set-Cookie": `authToken=${authTokenString}; SameSite=Strict;Path=/; HttpOnly; Max-Age=${maxAgeSeconds}`,
      },
    });
  } catch (error) {
    console.log("Something went wrong and here is the error:");
    console.error(error);

    return NextResponse.json({ error });
  }
};
