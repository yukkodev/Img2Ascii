// app/api/upload/route.js
import { NextResponse } from 'next/server';
import formidable from 'formidable';
import fs from 'fs';
import Jimp from 'jimp';

export const dynamic = 'force-dynamic';

async function parseForm(request) {
  const form = new formidable.IncomingForm();
  return new Promise((resolve, reject) => {
    form.parse(request, (err, fields, files) => {
      if (err) {
        reject(err);
      } else {
        resolve({ fields, files });
      }
    });
  });
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    if (!file) {
      return NextResponse.json({ error: 'File is missing' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const tempPath = '/tmp';
    const filePath =`${tempPath}/${file.name}`
    fs.writeFileSync(filePath, buffer);

    const image = await Jimp.read(filePath);
    const ascii = await imageToAscii(image);
    fs.unlinkSync(filePath);   

    return new Response(JSON.stringify({ ascii }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error processing the image:', error);
    return new Response(JSON.stringify({ error: 'Failed to process image' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

const imageToAscii = async (image) => {
  const width = 80;
  const height = Jimp.AUTO;
  image.resize(width, height).greyscale();

  let ascii = '';
  for (let y = 0; y < image.bitmap.height; y++) {
    for (let x = 0; x < image.bitmap.width; x++) {
      const pixel = Jimp.intToRGBA(image.getPixelColor(x, y));
      const gray = (pixel.r + pixel.g + pixel.b) / 3;
      const char = gray > 128 ? ' ' : '#';
      ascii += char;
    }
    ascii += '\n';
  }
  return ascii;
};
