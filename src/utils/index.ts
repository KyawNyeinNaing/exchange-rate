export const filterValuesByQuery = (
  query: string,
  values: {
    key: string;
    value: string;
  }[]
) => {
  return query === ''
    ? values
    : values?.filter(
        each =>
          each.key.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, '')) ||
          each.value.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, ''))
      );
};
