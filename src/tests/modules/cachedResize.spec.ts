import { readdir, unlink } from 'fs/promises';
import cachedResize from '../../modules/cachedResize';
import resizeImage from '../../modules/resizeImage';

describe('caching and resize modules Check', () => {
  const resize = cachedResize(resizeImage);
  it('Should return a function', async () => {
    expect(typeof resize).toBe('function');
  });

  it('Should return the desired value after correct Image input', async () => {
    expect(await resize('fjord.jpg', 200, 300)).toBe(
      `\n <div style="display:flex; justify-content: center; margin-top: 30px;"><img src="/thumb/fjord200x300.jpg"></div>`
    );
  });

  afterAll(async () => {
    const images = await readdir('./public/thumb');
    for (const image of images) {
      await unlink(`./public/thumb/${image}`);
    }
  });
});
