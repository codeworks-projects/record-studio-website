export const sleep = (ms: number): Promise<boolean> => {
  return new Promise((resolve) => setTimeout(() => resolve(true), ms))
}

export const deleteTypename = (item: any) => {
  delete item.__typename
  return item
}

export const isAnyKeyEmpty = (obj: any, except = [] as Array<string>) => {
  return Object.entries(obj).some(([key, value]) => {
    if (except.includes(key)) {
      return false
    }

    return Array.isArray(value) ? value.length === 0 : !value && value !== false
  })
}

export const isObjectEmpty = (obj: any) => {
  return !Object.keys(obj)?.length
}

export const capitalizeFLetter = (value: string) => {
  return value.replace(/^./, value[0].toUpperCase())
}

export const getTestImage = (width: number, height: number) => {
  return `https://picsum.photos/${width}/${height}`
}

export const vh = (coeff: number, multiplier: number = 1) =>
  window.innerHeight * (coeff / 100) * multiplier

export const vw = (coeff: number, multiplier: number = 1) =>
  window.innerWidth * (coeff / 100) * multiplier

export const markdownParser = (text: string) => {
  return text
    .replaceAll('\n', '<br/>')
    .split('__') // italic
    .map((v, i) => {
      if (i % 2 !== 0) {
        return `<span class="parser-italic-custom">${v}</span>`
      }
      return v
    })
    .join('')
}
