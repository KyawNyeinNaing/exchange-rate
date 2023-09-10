import { Metadata } from 'next';
import { FetchAPI } from '@/utils/api';
import { CurrencyList, CurrencyLive, Rates } from '@/types/currency';
import AutoComplete from '@/components/Combobox';
import Button from '@/components/Button';
import InputNumber from '@/components/InputNumber';
import { Typography } from '@material-tailwind/react';
import ExchangeRate from '../containers/ExchangeRate';

export const metadata: Metadata = {
  title: 'Exchange Rate',
  description: 'Exchange Rate',
};

const Page = async () => {
  const fetchApi = new FetchAPI();
  // const currencyLive = (await fetchApi.getLive('live', {
  //   source: 'USD',
  // })) as CurrencyLive;
  const currenciesList = (await fetchApi.getCurrenciesLists('list')) as CurrencyList;
  const ratesList = (await fetchApi.getRates('api/v1/rates')) as Rates;

  return (
    // <div className="grid grid-cols-12">
    //   <div className="col-start-4 col-span-6">
    //     <div className="h-screen flex justify-center items-center">
    //       <div className="bg-white rounded-[6px] p-[40px] space-y-[24px]">
    //         <h3 className="text-black text-center text-[24px]">Currency Exchange Rates</h3>
    //         <div className="flex flex-col items-center gap-y-[16px] space-y-[16px]">
    //           <div className="flex justify-start gap-x-[24px]">
    //             <AutoComplete values={resultData} />
    //             <InputNumber min={1} />
    //           </div>
    //           <div className="flex justify-start gap-x-[24px]">
    //             <AutoComplete values={resultData} />
    //             <InputNumber min={1} />
    //           </div>
    //         </div>
    //         <div>
    //           <Typography color="black" className="font-[500]">
    //             MMK - USD (Rate - 1000)
    //           </Typography>
    //           <Typography color="black" className="text-[12px] font-[400]">
    //             Last Updated: Sat, 09 Sep 2023 23:07:22 GMT
    //           </Typography>
    //         </div>
    //         <div className="flex justify-center">
    //           <Button />
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <ExchangeRate currencies={currenciesList?.currencies} rates={ratesList.rates} />
  );
};

export default Page;
