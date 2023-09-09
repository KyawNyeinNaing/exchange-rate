import { Metadata } from "next";
import React from "react";
import AutoComplete from "./components/Combobox";
import Button from "./components/Button";
import InputText from "./components/Input";
import { FetchAPI } from "@/utils/api";
import { CurrencyList, CurrencyLive } from "@/types/currency";

export const metadata: Metadata = {
  title: "Exchange Rate",
  description: "Exchange Rate"
};

const Page = async () => {
  const fetchApi = new FetchAPI("48da1f6e032599b655161fceff498c5e");
  const currencyLive = (await fetchApi.getLive("live")) as CurrencyLive;
  const currenciesList = (await fetchApi.getCurrenciesLists(
    "list"
  )) as CurrencyList;

  return (
    <div className="grid grid-cols-12">
      <div className="col-start-4 col-span-6">
        <div className="h-screen flex justify-center items-center">
          <div className="bg-white rounded-[6px] p-[40px] space-y-[24px]">
            <h3 className="text-black text-center text-[24px]">
              Currency Exchange Rates
            </h3>
            <div className="flex flex-col items-center gap-y-[16px] space-y-[16px]">
              <div className="flex justify-start gap-x-[24px]">
                <AutoComplete values={currenciesList?.currencies} />
                {/* <AutoComplete /> */}
              </div>
              <div className="flex justify-start gap-x-[24px]">
                {/* <AutoComplete /> */}
                <InputText />
              </div>
              <div>
                <Button />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
