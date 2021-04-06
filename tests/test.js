const TEXT_BREAK = '-----------------'

const RESULT_TEXT = {
  PASSED: 'PASSED',
  FAILED: 'FAILED',
}

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

module.exports = {
  FALSEY_VALUES: [null, undefined, 0, '', false],
  expect: (a) => ({
    toEqual: (b) => {
      if (a !== b) {
        throw new Error(`Expected ${JSON.stringify(a)} to equal ${JSON.stringify(b)}`)
      }
    },
    toSoftEqual: (b) => {
      if (JSON.stringify(a, null, 1) != JSON.stringify(b, null, 1)) {
        throw new Error(`Expected ${JSON.stringify(a)} to equal ${JSON.stringify(b)}`)
      }
    },
    toFail: (message) => {
      try {
        a()
      } catch {
        return
      }
      throw new Error(message ? message : `Expected to fail but passed`)
    },
    toPass: (message) => {
      try {
        a()
      } catch (e) {
        throw new Error(message ? message : `Expected to pass but failed: ${e}`)
      }
    },
  }),
  runTests: (title, tests = []) => {
    console.log(color(COLORS.YELLOW, `${TEXT_BREAK}\n${title} : ${tests.length} tests\n${TEXT_BREAK}`))

    const failedTests = tests.reduce((acc, testFunc) => {
      try {
        testFunc()

        console.log(`${testFunc.name}: ${color(COLORS.GREEN, RESULT_TEXT.PASSED)}`)
      } catch (e) {
        console.log(`${testFunc.name}: ${color(COLORS.RED, RESULT_TEXT.FAILED)}`)
        const errorMessage = `${e.stack.split('\n')[2].trim()}\n${e.message}`
        acc.push({ func: testFunc, error: errorMessage })
      }

      return acc
    }, [])

    console.log('\n')
    if (failedTests.length) {
      console.log(`${TEXT_BREAK}\nTest Failures: ${failedTests.length}/${tests.length}\n`)
      console.log(failedTests.map(({ func, error }) => `${func.name}\n${color(COLORS.RED, error)}\n`).join('\n'))
      console.log(TEXT_BREAK)
    } else {
      console.log(color(COLORS.GREEN, 'All passed!'))
    }
    console.log('\n')
  },
}
