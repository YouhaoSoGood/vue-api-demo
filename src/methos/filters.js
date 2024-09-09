export function currency (value) {
  const n = parseInt(value, 10);
  return `${n.toFixed(0).replace(/./g, (c, i, a) => (i && c !== '.' && ((a.length - i) % 3 === 0) ? `, ${c}`.replace(/\s/g, '') : c))}`; //千分位正規表達式
}

export function filterdate (time) {
  const localDate = new Date(time * 1000);
  return localDate.toLocaleDateString();
}
