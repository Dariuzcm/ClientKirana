
export function isPhoneNumber (value: string) {
  const reg = new RegExp(/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\./]{0,1}[0-9]{3}[-\s\./]{0,1}[0-9]{4}$/)
  return reg.test(value)
}

export function isEmail (value: string) {
  const reg = new RegExp(/^\\w+([\.-]?\\w+)*@\\w+([\.-]?\\w+)*(\\.\\w{2,3})+$/)
  return reg.test(value);
}