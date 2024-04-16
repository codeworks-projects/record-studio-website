export const sleep = (ms: number): Promise<boolean> => {
  return new Promise((resolve) => setTimeout(() => resolve(true), ms));
};

export const deleteTypename = (item: any) => {
  delete item.__typename;
  return item;
};

export const isAnyKeyEmpty = (obj: any, except = [] as Array<string>) => {
  return Object.entries(obj).some(([key, value]) => {
    if (except.includes(key)) {
      return false;
    }

    return Array.isArray(value)
      ? value.length === 0
      : !value && value !== false;
  });
};

export const isObjectEmpty = (obj: any) => {
  return !Object.keys(obj)?.length;
};

export const capitalizeFLetter = (value: string) => {
  return value.replace(/^./, value[0].toUpperCase());
};

export const getTestImage = (width: number, height: number) => {
  return `https://picsum.photos/${width}/${height}`;
};

export const markdownParser = (text: string) => {
  return text
    .split('**') // bold
    .map((v, i) => {
      if (i % 2 !== 0) {
        return `<b>${v}</b>`
      }
      return v
    })
    .join('')
    .split('__') // italic
    .map((v, i) => {
      if (i % 2 !== 0) {
        return `<i>${v}</i>`
      }
      return v
    })
    .join('')
}
