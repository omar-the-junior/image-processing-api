const cachedResize = (
  f: (imageName: string, width: number, height: number) => Promise<string>
): ((imageName: string, width: number, height: number) => Promise<string>) => {
  interface cacheObject {
    [key: string]: string;
  }

  const cache: cacheObject = {};

  return async (imageName: string, width: number, height: number) => {
    const [plainName] = imageName.split('.');
    const resizedImageName = `${plainName}${width}x${height}.jpg`;

    let status =
      '\n <h2 style="text-align:center;">Your Image was already resized. Here is the saved thumbnail 😄</h2>';

    if (!Object.keys(cache).includes(resizedImageName)) {
      status = '';
      cache[resizedImageName] = await f(imageName, width, height);
    }

    // console.log(status);

    // console.log(
    //   '-------------------------------------- cache ------------------------------------'
    // );
    // console.table(cache);

    return status + cache[resizedImageName];
  };
};

export default cachedResize;
