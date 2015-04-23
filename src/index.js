export default function(str) {
  let t, d, rest;
  [d, rest] = parseDate(str);
  if (d) {
    [t, rest] = parseTime(lstrip(rest), { forceHead: true });
  } else {
    [t, rest] = parseTime(lstrip(rest));
  }
  if (t) {
    let now = new Date();
    let args = (d || [now.getFullYear(), now.getMonth(), now.getDate()]).concat(t);
    return new (Date.bind.apply(Date, [null].concat(args)))();
  }
  return null;
};

function parseTime(str, opts = {}) {
  let { forceHead = false } = opts;
  let parsed = parseColonSeparated(str, { forceHead: forceHead });
  if (parsed) return parsed;
};

function lstrip(str) {
  return str.replace(/^\s+/, '');
}

function parseDate(str) {
  let match = /((\d{4})\/)?(\d{1,2}\/\d{1,2})/.exec(str);
  if (match) {
    let d = new Date(`${match[2] || new Date().getFullYear()}/${match[3]}`);
    if (d.toString() === 'Invalid Date') return [null, str];
    return [[d.getFullYear(), d.getMonth(), d.getDate()], str.slice(match[0].length + match.index)];
  }
  return [null, str];
}

function parseColonSeparated(str, opts = {}) {
  let { forceHead = false } = opts;
  let exp = new RegExp((forceHead ? '^' : '') + '((\\d{1,2}):(\\d{1,2}))(:(\\d{1,2}))?');
  let match = exp.exec(str);
  if (match) {
    let h = parseInt(match[2], 10);
    let m = parseInt(match[3], 10);
    if (0 <= h && h <= 23 && 0 <= m && m <= 59) {
      if (match[5]) {
        let s = parseInt(match[5], 10);
        if (0 <= s && s <= 59) {
          return [[h, m, s], str.slice(match[0].length + match.index)];
        }
        return [[h, m, 0], str.slice(match[1].length + match.index)];
      }
      return [[h, m, 0], str.slice(match[1].length + match.index)];
    }
    return [null, str];
  }
  return [null, str];
}
