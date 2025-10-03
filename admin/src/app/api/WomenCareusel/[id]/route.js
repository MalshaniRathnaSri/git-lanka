import connectDb from "@/libs/mongodb";
import WomanCareusel from "@/models/WomenCareusel";
import fs from "fs";
import path from "path";

export async function GET(req, { params }) {
  try {
    await connectDb();
    const item = await WomanCareusel.findById(params.id);
    if (!item) return Response.json({ success: false, error: "Not found" }, { status: 404 });
    return Response.json({ success: true, data: item });
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}

export const config = { api: { bodyParser: false } };

export async function PUT(req, { params }) {
  try {
    await connectDb();

    const formData = await req.formData();
    const file = formData.get("file");
    const topHeading = formData.get("topHeading");
    const subHeading = formData.get("subHeading");
    const description = formData.get("description");

    let updateData = { topHeading, subHeading, description };

    if (file && file.name) {
      const uploadsDir = path.join(process.cwd(), "/public/uploads/womanCareusel");
      if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

      const fileName = `${Date.now()}-${file.name}`;
      const buffer = Buffer.from(await file.arrayBuffer());
      fs.writeFileSync(path.join(uploadsDir, fileName), buffer);

      updateData.image = "/uploads/womanCareusel/" + fileName;
    }

    const updated = await WomanCareusel.findByIdAndUpdate(params.id, updateData, { new: true });
    return Response.json({ success: true, data: updated });
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDb();
    await WomanCareusel.findByIdAndDelete(params.id);
    return Response.json({ success: true, message: "Deleted" });
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}
