module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  "env": {
    "node": true,
    "jasmine": true,
    "browser": true,
  },
  "rules": {
    "jsx-a11y/href-no-hash": "off",
    "class-methods-use-this": "off",
    "id-length": 0,
    "indent": [2],
    "no-console": 0,
    "no-unused-vars": [1, {"vars": "local", "args": "none"}],
    "strict": 0,
  },
}
