import { Metadata } from 'next';

import { Countries, CurrencyList, Rates } from '@/types/currency';
import { FetchAPI } from '@/utils/api';

import ExchangeRate from '../containers/ExchangeRate';
const dayjs = require('dayjs');

export const metadata: Metadata = {
  title: 'Exchange Rate',
  description: 'Exchange Rate',
};

const Page = async () => {
  const fetchApi = new FetchAPI();
  // const currencyLive = (await fetchApi.getLive('live')) as CurrencyLive;
  const { currencies } = (await fetchApi.getCurrenciesLists('list')) as CurrencyList;
  const { rates, lastUpdated } = (await fetchApi.getRates('api/v1/rates')) as Rates;
  const { data } = (await fetchApi.getCountries('data/v1/countries')) as Countries;

  return <ExchangeRate currencies={currencies} rates={rates} lastUpdated={lastUpdated} data={data} />;
};

export default Page;
