/* eslint-disable @typescript-eslint/no-var-requires */
const expoPreset = require('jest-expo/jest-preset')
const jestPreset = require('@testing-library/react-native/jest-preset')
const local = require('./jest.config.local')
/* eslint-enable @typescript-eslint/no-var-requires */

const setupFiles = {
  setupFiles: [...expoPreset.setupFiles, ...jestPreset.setupFiles]
}

// the preset in @testing-library/react-native overrides
module.exports = Object.assign(
  expoPreset,
  jestPreset,
  Object.assign({}, local, setupFiles)
)
