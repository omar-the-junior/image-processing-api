import { writeFile } from 'node:fs/promises';
import sharp from 'sharp';
import CustomError from '../utilities/customErrors';

const resizeImage = async (
  imageName: string,
  width: number,
  height: number
): Promise<string> => {
  try {
    const [plainName] = String(imageName).split('.');

    const newImageName = `${plainName}${width}x${height}.jpg`;

    const imageBuffer = await sharp(`./public/images/${imageName}`)
      .resize(Number(width), Number(height))
      .jpeg()
      .toBuffer();

    await writeFile(`./public/thumb/${newImageName}`, imageBuffer);

    return `\n <div style="display:flex; justify-content: center; margin-top: 30px;"><img src="/thumb/${newImageName}"></div>`;
  } catch (error) {
    throw new CustomError(500, 'Something went wrong with Image resize');
  }
};

export default resizeImage;
