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

export const formatNumberWithDecimal = (val: string): string => {
  const result = Number(val)
    ?.toString()
    ?.replace(/[^0-9\.]+/g, '')
    ?.replace(/([^\d]*)(\d*(\.\d{0,2})?)(.*)/, '$2')
    ?.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  return result;
};

export const formatNumber = (number: string) => {
  return Number(number)
    .toFixed(2)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

export const transformObjectsToArray = (data: { [key: string]: any }) => {
  return Object?.entries(data)?.reduce(
    (result, [key, value]) => {
      result = [
        ...result,
        {
          key,
          value,
        },
      ];
      return result;
    },
    [] as { key: string; value: string | string }[]
  );
};
