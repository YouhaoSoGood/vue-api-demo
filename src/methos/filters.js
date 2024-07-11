export function currency (value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); //千分位正規表達式
}

export function filterdate (time) {
  const localDate = new Date(time * 1000);
  return localDate.toLocaleDateString();
}
