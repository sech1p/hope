// Inspired by https://gist.github.com/adrianhall/70d63d225e536b4563b2

let codes = {
    OFF: 0,
    WARN: 1,
    ERROR: 2,
};

module.exports = exports = {
    "env": {
        "es2021": true,
    },
    "parser": "@babel/eslint-parser",
    "parserOptions": {
        "sourceType": "module",
    },
    "extends": "eslint:recommended",
    "rules": {
        "no-extra-parens": codes.ERROR,
        "no-unexpected-multiline": codes.ERROR,
        "no-undef": codes.OFF,
        "no-unused-vars": codes.OFF,
        "no-case-declarations": codes.OFF,
        "no-self-assign": codes.OFF,
        "valid-jsdoc": [ codes.ERROR, {
            "requireReturn": true,
            "requireReturnDescription": true,
            "requireParamDescription": true,
            "prefer": {
                "return": "returns",
            },
        }],
    },
    "settings": {
        "import/resolver": {
            "node": {
                "paths": ["src"],
            },
        },
    },
};