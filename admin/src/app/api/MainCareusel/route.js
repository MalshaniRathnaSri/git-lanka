import connectDb from "@/libs/mongodb";
import MainCareusel from "@/models/MainCareusel";
import { NextResponse } from 'next/server'
import fs from "fs";
import path from "path";

export const config = { api: { bodyParser: false } };

export async function POST(req) {
  try {
    await connectDb();

    const formData = await req.formData(); 
    const file = formData.get("file");
    const topHeading = formData.get("topHeading");
    const subHeading = formData.get("subHeading");
    const description = formData.get("description");

    let filePath = "";
    if (file) {
      const uploadsDir = path.join(process.cwd(), "/public/uploads/mainCareusel");
      if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

      const fileName = `${Date.now()}-${file.name}`;
      const buffer = Buffer.from(await file.arrayBuffer());
      fs.writeFileSync(path.join(uploadsDir, fileName), buffer);

      filePath = "/uploads/mainCareusel/" + fileName;
    }

    const mainCareusel = new MainCareusel({
      image: filePath,
      topHeading,
      subHeading,
      description,
    });

    await mainCareusel.save();

    return new Response(JSON.stringify({ success: true, data: mainCareusel }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function GET() {
  try {
    await connectDb();
    const data = await MainCareusel.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
