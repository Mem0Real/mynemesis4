import { NextResponse } from "next/server";
import mime from "mime";
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import * as dateFn from "date-fns";
import prisma from "@/db";

export async function POST(request, response) {
  let { searchParams } = new URL(request.url);
  const cat = searchParams.get("cat");

  let formData = await request.formData();
  let file = formData.get("image");
  let entry = formData.get("entry");

  if (!entry) entry = cat;

  let categoryId = formData.get("categories");
  let parentId = formData.get("parents");
  let childId = formData.get("children");
  let name = formData.get("name");

  let brand = formData.get("brand");
  let model = formData.get("model");
  let quantity = formData.get("quantity");
  let price = formData.get("price");

  if (brand === null) brand = undefined;
  if (model === null) model = undefined;
  if (quantity === null) {
    quantity = undefined;
  } else {
    quantity = parseInt(quantity, 10);
  }
  if (price === null) {
    price = undefined;
  } else {
    price = parseFloat(price);
  }

  let id = formData.get("id");
  let description = formData.get("description");
  let image = formData.get("image");

  let category = { name: undefined, val: undefined };

  //   Write to databse
  const writeToDb = async (dir) => {
    formData.set("image", dir);
    image = formData.get("image");

    if (id === null) {
      let idName = name.toLowerCase();
      let array = idName.split(/ and| &|, /);
      idName = array[0];
      idName = idName.replace(/\s/g, "-");
      formData.set("id", idName);
      id = formData.get("id");
    }

    if (description === null) {
      formData.set("description", name);
      description = formData.get("description");
    }

    if (childId !== null) {
      category = { name: "ChildId", val: childId };
    } else if (parentId !== null) {
      category = { name: "ParentId", val: parentId };
    } else if (categoryId !== null) {
      category = { name: "CategoryId", val: categoryId };
    } else {
      category.name = undefined;
      category.val = undefined;
    }

    const exist = await checkExistence(id);

    try {
      if (!exist) {
        const res = await prisma[entry].create({
          data: {
            id: id,
            name: name,
            brand: brand,
            model: model,
            quantity: quantity,
            price: price,
            description: description,
            image: image,
            [category.name]: category.val,
          },
        });
        let json_response = {
          status: "success",
          results: res.length,
          res,
        };
        return new NextResponse.json(res, { status: 200 });
        // return new NextResponse(
        //   JSON.stringify(res, {
        //     status: 200,
        //     statusText: "Category Created Successfully!",
        //     headers: {
        //       "Content-Type": "application/json",
        //       "Access-Control-Allow-Origin": "*",
        //     },
        //   })
        // );

        // return NextResponse.json(json_response);

        return res.json();
      } else {
        return NextResponse(
          JSON.stringify({ status: 500, message: `Category already exists.` })
        );
      }
    } catch (error) {
      let error_response = {
        status: "fail",
        message: error.message,
      };
      return new NextResponse(JSON.stringify(error_response), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  };

  const checkExistence = async (id, name) => {
    const result = await prisma[entry].findUnique({
      where: { id: id },
    });

    return result;
  };

  if (!file) {
    writeToDb("").then((data) =>
      NextResponse.json({ data: data, message: "Created Db Successfully." })
    );
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
      await writeFile(`${uploadDir}/${filename}`, buffer);
      let imageUrl = `${relativeUploadDir}/${filename}`;
      writeToDb(imageUrl);
      // return new NextResponse(dbStat, {
      //   headers: {
      //     "Content-Type": "application/json",
      //     "Access-Control-Allow-Origin": "*",
      //   },
      // });
      // return NextResponse.json({ imgUrl: `${relativeUploadDir}/${filename}` });
    } catch (e) {
      console.error("Error while trying to upload a file\n", e);
      return NextResponse.json(
        { error: "Something went wrong." },
        { status: 500 }
      );
    }
  }
}
