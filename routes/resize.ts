import { Router } from 'express';
import createFormResponse from '../modules/createFormResponse';
import resizeImage from '../modules/resizeImage';
import cachedResize from '../modules/cachedResize';
import CustomError from '../utilities/customErrors';

const resize = Router();

const resizeImageFunction = cachedResize(resizeImage);

resize.get('/resize', async (req, res, next): Promise<void> => {
  try {
    const { imageName, width, height } = req.query;

    let response = await createFormResponse(
      imageName as string,
      Number(width),
      Number(height)
    );

    if (imageName) {
      response += await resizeImageFunction(
        imageName as string,
        Number(width),
        Number(height)
      );
    }

    res.status(200).send(response);
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).send(error.message);
    } else {
      next(error);
    }
  }
});

export default resize;
