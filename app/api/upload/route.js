import { NextResponse } from "next/server";
import mime from "mime";
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import * as dateFn from "date-fns";
import { prisma } from "@/db";

export async function POST(request, response) {
  //   const data = await request.json();
  //   console.log(data);
  //   try {
  //     let data = await request.formData();
  //     return NextResponse.json({ data, message: "Success" });
  //   } catch (e) {
  //     console.log(e);
  //     return NextResponse.json({ message: "Fail" });
  //   }
  //   const file = await request.formData();
  //   console.log(file);

  const formData = await request.formData();
  const file = formData.get("image");
  const entry = formData.get("entry");
  const name = formData.get("name");
  const shortName = formData.get("shortName");
  const description = formData.get("description");

  //   Write to databse
  const writeToDb = async (dir) => {
    let shortname, desc;

    if (shortName === "") {
      shortname = name.toLowerCase();
      let array = shortname.split(/ and| &|, /);
      shortname = array[0];
      shortname = shortname.replace(/\s/g, "-");
    } else {
      shortname = shortName;
    }

    if (description === "") {
      desc = name;
    } else {
      desc = description;
    }

    const res = await prisma[entry].create({
      data: {
        name: name,
        shortName: shortname,
        image: dir,
        description: desc,
      },
    });

    // return NextResponse.json(res);
  };

  if (!file) {
    writeToDb("").then((data) =>
      NextResponse.json({ data: data, message: "Created Db Successfully." })
    );
    // return NextResponse.json(
    //   { error: "File blob is required." },
    //   { status: 400 }
    // );
  } else {
    const buffer = Buffer.from(await file.arrayBuffer());
    const relativeUploadDir = `/uploads/${dateFn.format(
      Date.now(),
      "dd-MM-Y"
    )}`;
    const uploadDir = join(process.cwd(), "public", relativeUploadDir);

    try {
      await stat(uploadDir);
    } catch (e) {
      if (e.code === "ENOENT") {
        await mkdir(uploadDir, { recursive: true });
      } else {
        console.error(
          "Error while trying to create directory when uploading a file\n",
          e
        );
        return NextResponse.json(
          { error: "Something went wrong." },
          { status: 500 }
        );
      }
    }

    try {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const filename = `${file.name.replace(
        /\.[^/.]+$/,
        ""
      )}-${uniqueSuffix}.${mime.getExtension(file.type)}`;
      // let dir = `${uploadDir}/${filename}`;
      await writeFile(`${uploadDir}/${filename}`, buffer);
      let imageUrl = `${relativeUploadDir}/${filename}`;
      let dbStat = writeToDb(imageUrl);
      //   return NextResponse.json(dbStat);
      return NextResponse.json({ imgUrl: `${relativeUploadDir}/${filename}` });
    } catch (e) {
      console.error("Error while trying to upload a file\n", e);
      return NextResponse.json(
        { error: "Something went wrong." },
        { status: 500 }
      );
    }
  }
}
