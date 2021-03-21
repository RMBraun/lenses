const { get, set } = require('../lenses')

const TITLE = 'Lenses Test'

const TEXT_BREAK = '-----------------'

const COLORS = {
  RED: 'RED',
  GREEN: 'GREEN',
  BLUE: 'BLUE',
  YELLOW: 'YELLOW',
  RESET: 'RESET',
}

const COLOR_ANSI = {
  [COLORS.RED]: '\u001b[31;1m',
  [COLORS.GREEN]: '\u001b[32;1m',
  [COLORS.BLUE]: '\u001b[34;1m',
  [COLORS.YELLOW]: '\u001b[33;1m',
  [COLORS.RESET]: '\u001b[0m',
}

const color = (colorId, text) => {
  if (colorId && COLOR_ANSI[colorId]) {
    return `${COLOR_ANSI[colorId]}${text}${COLOR_ANSI.RESET}`
  } else {
    return text
  }
}

console.log(color(COLORS.YELLOW, `${TEXT_BREAK}\n${TITLE}\n${TEXT_BREAK}`))

const failedTests = []
const runTest = (testFunc) => {
  const result = testFunc()
  console.log(`${testFunc.name}: ${color(result ? COLORS.GREEN : COLORS.RED, result)}`)

  if (!result) {
    failedTests.push(testFunc)
  }
}

const tests = [
  function testOne() {
    const input = {}
    return JSON.stringify(set(input, '0', 2, 'two', true))
  },
]

tests.forEach(runTest)

console.log('\n')
if (failedTests.length) {
  console.log(`${TEXT_BREAK}\nTest Failures:\n`)
  console.log(failedTests.map((func) => func.name).join('\n'))
  console.log(TEXT_BREAK)
} else {
  console.log(color(COLORS.GREEN, 'All passed!'))
}
console.log('\n')
