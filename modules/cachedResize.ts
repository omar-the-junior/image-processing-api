const cachedResize = (
  f: (imageName: string, width: number, height: number) => Promise<string>
) => {
  interface cacheObject {
    [key: string]: string;
  }
  const cache: cacheObject = {};

  return async (imageName: string, width: number, height: number) => {
    const [plainName] = imageName.split('.');
    const resizedImageName = `${plainName}${width}x${height}.jpg`;

    if (!Object.keys(cache).includes(resizedImageName)) {
      cache[resizedImageName] = await f(imageName, width, height);
    }

    return cache[resizedImageName];
  };
};

export default cachedResize;
