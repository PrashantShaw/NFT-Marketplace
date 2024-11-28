import { NextResponse, type NextRequest } from "next/server";
import { pinata } from "@/lib/pinata";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("nftImage") as unknown as File;
    const uploadData = await pinata.upload.file(file);
    const url = await pinata.gateways.convert(uploadData.IpfsHash);
    return NextResponse.json(url, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export const config = {
  api: {
    responseLimit: "10mb",
  },
};