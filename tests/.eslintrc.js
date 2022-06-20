module.exports = {
    env: {
        'cypress/globals': true,
        mocha: true,
    },
    extends: [
        'plugin:cypress/recommended',
    ],
    plugins: [
        'cypress',
    ],
    rules: {
        strict: 'off',
        'cypress/no-assigning-return-values': 'error',
        'cypress/no-unnecesary-waiting': 'error',
        'cypress/assertion-before-screenshot': 'warn',
        'cypress/no-force': 'warn',
        'cypress/no-async-test': 'error',
        'cypress/no-pause': 'error',
    },
};
