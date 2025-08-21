const A = 'A'.charCodeAt()
const Z = 'Z'.charCodeAt()
const a = 'a'.charCodeAt()
const z = 'z'.charCodeAt()

const validateArgs = (...args) => {
  const INVALID_INPUT_ERROR = 'caesarCipher expects (string, integer)'
  if (args.length !== 2) throw new TypeError(INVALID_INPUT_ERROR)
  const [str, shift] = [...args]
  if (typeof str !== 'string' || !Number.isInteger(shift)) {
    throw new TypeError(INVALID_INPUT_ERROR)
  }
  return [str, shift]
}

const normalize = (shift) => ((shift % 26) + 26) % 26

const isUpper = (char) => {
  const code = char.charCodeAt()
  if (code >= A && code <= Z) return true
}

const isLower = (char) => {
  const code = char.charCodeAt()
  if (code >= a && code <= z) return true
}

const shiftLetter = (char, shift) => {
  let charCode = char.charCodeAt() + normalize(shift)

  if (isUpper(char)) {
    if (charCode > Z) charCode -= Z - A + 1
  } else if (isLower(char)) {
    if (charCode > z) charCode -= z - a + 1
  } else {
    return char
  }
  return String.fromCharCode(charCode)
}

export default function caesarCipher(...args) {
  const [str, shift] = validateArgs(...args)
  return str.split('').map(char => shiftLetter(char, shift)).join('')
}
