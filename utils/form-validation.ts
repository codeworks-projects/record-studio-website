export const isEmail = (email: string) => {
  const regex = /^[\w\-\.+]+@([\w-]+\.)+[\w-]{2,4}$/

  if (!regex.test(email)) {
    return 'form.error.invalid-email'
  }
}

export const isPhone = (value: string) => {
  const regex = /^\+?[0-9\s\-()]+$/

  if (!regex.test(value)) {
    return 'form.error.invalid-phone'
  }
}

export const isObjectEmpty = (obj: any) => {
  return !Object.keys(obj)?.length
}

export const isAnyKeyEmpty = <T extends Record<string, string>>(
  obj: T,
  except = [] as (keyof T)[]
) => {
  return Object.entries(obj)
    .map(([key, value]) => {
      const name = key

      if (except.includes(key)) {
        return undefined
      }

      if (Array.isArray(value)) {
        return value.length === 0 ? name : undefined
      }

      if (typeof value === 'string') {
        return value === '' ? name : undefined
      }

      return !!value ? name : undefined
    })
    .filter((v) => v !== undefined) as string[]
}
