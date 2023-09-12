'use client';
import React, { useEffect, useState } from 'react';
import { RiSwapFill } from 'react-icons/ri';

import Button from '@/components/Button';
import AutoComplete from '@/components/Combobox';
import InputNumber from '@/components/InputNumber';
import InputText from '@/components/InputText';
import { useWindowSize } from '@/hooks/useWindowSize';
import { Countries, CurrencyList, Rates } from '@/types/currency';
import { formatNumberWithDecimal, transformObjectsToArray } from '@/utils';
import { SELECTED_VALUE, WINDOW_SIZE } from '@/utils/enum';
import { Typography } from '@material-tailwind/react';

import 'flag-icons/css/flag-icons.min.css';

const ExchangeRate: React.FC<CurrencyList & Rates & Countries> = ({
  currencies,
  rates,
  lastUpdated,
  data,
}: CurrencyList & Rates & Countries) => {
  const [destinationValue, setDestinationValue] = useState<number>(0);
  const [destinationCurrency, setDestinationCurrency] = useState<string>(SELECTED_VALUE.MMK);
  const [sourceCurrency, setSourceCurrency] = useState<string>(SELECTED_VALUE.USD);
  const [sourceValue, setSourceValue] = useState<any>(1);
  const sourceRate = +rates[sourceCurrency];
  const destinationRate = +rates[destinationCurrency];
  const fixedSourceRate = (1 * (destinationRate / sourceRate)).toFixed(5);
  const fixedDestinationRate = (1 / (destinationRate / sourceRate)).toFixed(5);
  const { windowWidth } = useWindowSize();

  // get currencies list
  const getListCurrencies = transformObjectsToArray(currencies);

  useEffect(() => {
    calculateExchangeRate(sourceValue);
  }, [destinationCurrency, sourceCurrency]);

  const calculateExchangeRate = (val: string) => {
    if (typeof sourceRate === 'number' && typeof destinationRate === 'number') {
      const result = Number((Number(val) * (destinationRate / sourceRate)).toFixed(5));
      setSourceValue(val);
      setDestinationValue(result);
    } else {
      console.error('Invalid currency codes');
    }
  };

  const swapExchangeRate = () => {
    setSourceCurrency(destinationCurrency);
    setDestinationCurrency(sourceCurrency);
  };

  return (
    <div className="grid grid-cols-12">
      <div className="md:col-start-4 md:col-span-6 col-start-2 col-span-10">
        <div className="h-screen flex justify-center items-center">
          <div className="bg-white rounded-[6px] p-[40px] space-y-[24px]">
            <h3 className="text-black text-center text-[24px]">Currency Exchange Rates</h3>
            <div className="flex flex-col items-center gap-y-[16px] space-y-[16px]">
              <div className="w-full flex md:flex-row flex-col justify-start gap-x-[24px] md:space-y-0 space-y-[12px]">
                <AutoComplete
                  values={getListCurrencies}
                  className="md:w-1/2 w-full"
                  getValue={setSourceCurrency}
                  initialVal={sourceCurrency as SELECTED_VALUE}
                />
                <InputNumber
                  className="md:w-1/2 w-full"
                  min={1}
                  onChange={event => calculateExchangeRate(event.target.value as string)}
                  sourceCurrency={sourceCurrency}
                  defaultValue={1}
                  addonIcon={<span className={`fi fi-${sourceCurrency.slice(0, 2).toLowerCase()}`} />}
                />
              </div>

              {windowWidth <= WINDOW_SIZE.SM && (
                <div className="flex justify-center">
                  <div className="cursor-pointer" onClick={swapExchangeRate}>
                    <RiSwapFill className="text-black w-[30px] h-[30px]" />
                  </div>
                </div>
              )}

              <div className="w-full flex md:flex-row flex-col justify-start items-start gap-x-[24px] md:space-y-0 space-y-[12px]">
                <AutoComplete
                  className="md:w-1/2 w-full"
                  values={getListCurrencies}
                  getValue={setDestinationCurrency}
                  initialVal={destinationCurrency as SELECTED_VALUE}
                />
                <InputText
                  className="md:w-1/2 w-full"
                  value={formatNumberWithDecimal(destinationValue.toString())}
                  readOnly
                />
              </div>
            </div>
            <div>
              <Typography color="black" className="font-[500]">
                1 {sourceCurrency} = {formatNumberWithDecimal(fixedSourceRate)}{' '}
                {fixedSourceRate.startsWith('0.000') && `(${fixedSourceRate})`}
                {destinationCurrency}
              </Typography>
              <Typography color="black" className="font-[500]">
                1 {destinationCurrency} = {formatNumberWithDecimal(fixedDestinationRate)}{' '}
                {fixedDestinationRate.startsWith('0.000') && `(${fixedDestinationRate})`} {sourceCurrency}
              </Typography>

              <Typography color="black" className="text-[12px] font-[400]">
                Last Updated: {lastUpdated}
              </Typography>
            </div>
            {windowWidth >= WINDOW_SIZE.MD && (
              <div className="flex justify-center">
                <Button onClick={swapExchangeRate} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExchangeRate;
