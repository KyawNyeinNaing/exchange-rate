import { Metadata } from 'next';
import { FetchAPI } from '@/utils/api';
import { CurrencyList, CurrencyLive } from '@/types/currency';
import ExchangeRate from './pageComponents/ExchangeRate';

export const metadata: Metadata = {
  title: 'Exchange Rate',
  description: 'Exchange Rate',
};

const Page = async () => {
  const fetchApi = new FetchAPI('48da1f6e032599b655161fceff498c5e');
  const currencyLive = (await fetchApi.getLive('live')) as CurrencyLive;
  const currenciesList = (await fetchApi.getCurrenciesLists('list')) as CurrencyList;

  return <ExchangeRate currencies={currenciesList} />;
};

export default Page;
