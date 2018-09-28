> Note: This example is outdated. It's now recommended to scaffold your project with [Vue CLI 3](https://cli.vuejs.org/) which provides out-of-the-box configurations for unit testing.

# vue-test-utils-jest-example

> Example project using Jest + vue-test-utils together

This is based on the `vue-cli` `webpack-simple` template. Test-specific changes include:

### Additional Dependencies

- `vue-test-utils`
- `jest`
- `babel-jest` (for ES2015+ features in tests)
- `vue-jest` (for handling `*.vue` files in tests)
- `jest-serializer-vue` (for snapshot tests)

### Additional Configuration

#### `package.json`

The following configurations are recommended for Jest:

``` js
{
  "jest": {
    "moduleFileExtensions": [
      "js",
      "json",
      // tell Jest to handle *.vue files
      "vue"
    ],
    "transform": {
      // process js with babel-jest
      "^.+\\.js$": "<rootDir>/node_modules/babel-jest",
      // process *.vue files with vue-jest
      ".*\\.(vue)$": "<rootDir>/node_modules/vue-jest"
    },
    // support the same @ -> src alias mapping in source code
    "moduleNameMapper": {
      "^@/(.*)$": "<rootDir>/src/$1"
    },
    // serializer for snapshots
    "snapshotSerializers": [
      "<rootDir>/node_modules/jest-serializer-vue"
    ]
  }
}
```

#### `.babelrc`

Our default Babel config disables ES modules transpilation because webpack already knows how to handle ES modules. However, we do need to enable it for our tests because Jest tests are run directly in Node.

Also, if our tests are run in a relatively newer version of Node, most of the ES features are already supported - we can tell `babel-preset-env` to target the Node version we are using. This skips transpiling unnecessary features and makes our tests boot faster.

To apply these options only for tests, we need to add a separate config under `env.test` (this will be automatically picked up by `babel-jest`):

``` json
{
  "presets": [
    ["env", { "modules": false }]
  ],
  "env": {
    "test": {
      "presets": [
        ["env", { "targets": { "node": "current" }}]
      ]
    }
  }
}
```

### Build Commands

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run tests
npm test
```

For detailed explanation on how things work, consult the [docs for vue-test-utils](https://vue-test-utils.vuejs.org/guides/#testing-single-file-components-with-jest).
