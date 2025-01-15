export function isValidCNPJ(cnpj: string): boolean {
  if (typeof cnpj !== 'string') return false
  cnpj = cnpj.replace(/[^\d]+/g, '')
  if (cnpj.length !== 14 || !!cnpj.match(/(\d)\1{13}/)) return false
  const cnpjDigits = cnpj.split('').map(el => +el)
  const calc = (x: number) => {
    const slice = cnpjDigits.slice(0, x)
    let factor = x - 7
    let sum = 0
    for (let i = x; i >= 1; i--) {
      sum += slice[x - i] * factor--
      if (factor < 2) factor = 9
    }
    const result = 11 - (sum % 11)
    return result > 9 ? 0 : result
  }
  return calc(12) === cnpjDigits[12] && calc(13) === cnpjDigits[13]
}

