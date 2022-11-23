import { readdir } from 'fs/promises';
import CustomError from '../utilities/customErrors';
const createFormResponse = async (
  selectedImageName: string,
  width: number,
  height: number
) => {
  const imagesNames = await readdir('public/images');

  if (selectedImageName && !imagesNames.includes(selectedImageName)) {
    throw new CustomError(
      400,
      '<h1 style="text-align: center;"><span style="color: red;">Error:</span> Invalid Image name, Please insert a correct Image name</h1> \n <h2 style="text-align: center;"><a href="/resize" >Click Here</a> to go back</h2>'
    );
  } else if (selectedImageName && (width <= 0 || height <= 0)) {
    throw new CustomError(
      400,
      '<h1 style="text-align: center;"><span style="color: red;">Error:</span> Invalid Image dimensions, Please insert valid dimensions (More than 0)</h1> \n <h2 style="text-align: center;"><a href="/resize">Click Here</a> to go back</h2>'
    );
  }

  let selectOptions = '';

  for (const image of imagesNames) {
    const [imageName] = image.split('.');

    if (image === selectedImageName) {
      selectOptions += `\n <option value="${image}" selected>${imageName}</option>`;
    } else {
      selectOptions += `\n <option value="${image}">${imageName}</option>`;
    }
  }

  return `
        <h2 style="text-align:center;">Image resize API</h2>
        <form method="get" action="/resize" style="text-align:center;display: flex; flex-direction: column; gap: 15px; align-items: center;">
          <div style="display: flex; flex-direction: column; gap: 20px; align-items: center;">
            <label for="imageName">Choose an Image:</label>
            <select id="imageName" name="imageName">${selectOptions}</select> 
          </div>
          <div>
            <h3>Image resolution</h3>
            <label>Width</label>
            <input type="number" placeholder="width" name="width" value="${
              width || 0
            }">
            <label>height</label>
            <input type="number" placeholder="height" name="height" value="${
              height || 0
            }">
          </div>
          <input type="submit" value="Resize">
        </form>`;
};

export default createFormResponse;
