const TEXT_BREAK = '-----------------'
const LONG_TEXT_BREAK = '---------------------------------------------------'

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

class Test {
  constructor() {
    this.total = 0
    this.failed = 0
    this.passed = 0
  }

  static getInstance() {
    if (Test.instance == null) {
      Test.instance = new Test()
    }

    return Test.instance
  }

  static runTests(title, tests = []) {
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
    }

    //update global stats
    Test.getInstance().failed = (Test.getInstance().failed || 0) + failedTests.length
    Test.getInstance().total = (Test.getInstance().total || 0) + tests.length
    Test.getInstance().passed = (Test.getInstance().passed || 0) + (tests.length - failedTests.length)
  }

  static printStats() {
    const failed = Test.getInstance().failed
    const passed = Test.getInstance().passed
    const total = Test.getInstance().total

    console.log(color(failed ? COLORS.RED : COLORS.GREEN, `${LONG_TEXT_BREAK}\nTest Results\n${LONG_TEXT_BREAK}`))
    console.log(color(COLORS.GREEN, `PASSED: ${passed}`))
    console.log(color(COLORS.RED, `FAILED: ${failed}`))
    console.log(`TOTAL: ${total}`)
    console.log('\n')
  }
}

module.exports = {
  FALSEY_VALUES: [null, undefined, 0, '', false],
  expect: a => ({
    toEqual: b => {
      if (a !== b) {
        throw new Error(`Expected ${JSON.stringify(a)} (${typeof a}) to equal ${JSON.stringify(b)} (${typeof b})`)
      }
    },
    toSoftEqual: b => {
      if (JSON.stringify(a, null, 1) != JSON.stringify(b, null, 1)) {
        throw new Error(`Expected ${JSON.stringify(a)} (${typeof a}) to equal ${JSON.stringify(b)} (${typeof b})`)
      }
    },
    toFail: message => {
      try {
        a()
      } catch {
        return
      }
      throw new Error(message ? message : `Expected to fail but passed`)
    },
    toPass: message => {
      try {
        a()
      } catch (e) {
        throw new Error(message ? message : `Expected to pass but failed: ${e}`)
      }
    },
  }),
  printStats: Test.printStats,
  runTests: Test.runTests,
}
