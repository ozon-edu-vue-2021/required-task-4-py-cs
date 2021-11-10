export function filterByField(list, field, searchString) {
  return list.filter((el) =>
    el[field].toLowerCase().includes(searchString.toLowerCase())
  );
}
