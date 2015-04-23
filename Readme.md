# time-detect

## Example

```javascript
parse = require('time-detect');

parse('Please call me at 12:34');
parse('I was born at 2015/4/23 12:34:15');
parse('I was born at 4/23 12:34');
```

## Methods

```javascript
var parse = require('time-detect')
```

### var date = parse(str)

`parse` detects a time string from given `str` and returns a Date object.

## Install

```
$ npm i time-detect
```

## License

MIT
