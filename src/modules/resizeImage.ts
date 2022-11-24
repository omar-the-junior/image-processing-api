import { writeFile, mkdir, readdir } from 'node:fs/promises';
import sharp from 'sharp';

const resizeImage = async (
  imageName: string,
  width: number,
  height: number
): Promise<string> => {
  const [plainName] = String(imageName).split('.');

  const newImageName = `${plainName}${width}x${height}.jpg`;

  const publicFolders: string[] = await readdir('./public');

  if (!publicFolders.includes('thumb')) {
    await mkdir('./public/thumb');
  }

  const imageBuffer = await sharp(`./public/images/${imageName}`)
    .resize(Number(width), Number(height))
    .jpeg()
    .toBuffer();

  await writeFile(`./public/thumb/${newImageName}`, imageBuffer);

  return `\n <div style="display:flex; justify-content: center; margin-top: 30px;"><img src="/thumb/${newImageName}"></div>`;
};

export default resizeImage;
