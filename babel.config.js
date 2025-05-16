export default {
  presets: [
    ['@babel/preset-env', { 
      targets: { 
        node: 'current',
        browsers: '> 0.5%, last 2 versions, not dead, not ie 11'
      },
      useBuiltIns: 'usage',
      corejs: 3
    }],
    ['@babel/preset-react', {
      runtime: 'automatic'
    }],
    '@babel/preset-typescript'
  ],
  plugins: [
    // Enable decorator support
    ["@babel/plugin-proposal-decorators", { "version": "2023-05" }],
    // Transform class properties
    ["@babel/plugin-transform-class-properties"],
    // Enable optional chaining
    "@babel/plugin-transform-optional-chaining"
  ],
  env: {
    production: {
      // Production-specific settings
      plugins: [
        ['transform-react-remove-prop-types', {
          removeImport: true
        }]
      ]
    },
    test: {
      // Test-specific settings
      plugins: [
        "babel-plugin-dynamic-import-node"
      ]
    }
  }
} 