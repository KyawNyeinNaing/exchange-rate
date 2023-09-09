import { Metadata } from "next";
import React from "react";
import AutoComplete from "./components/Combobox";
import Button from "./components/Button";
import InputText from "./components/Input";

export const metadata: Metadata = {
  title: "Exchange Rate",
  description: "Exchange Rate"
};

async function fetchCurrencies() {
  const response = await fetch(
    "http://apilayer.net/api/live?access_key=48da1f6e032599b655161fceff498c5e",
    {
      next: {
        revalidate: 60
      }
    }
  );
  const repos = await response.json();
  return repos;
}

const Page = async () => {
  const currencies = await fetchCurrencies();

  console.log(currencies?.source);

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
                <AutoComplete />
                <AutoComplete />
              </div>
              <div className="flex justify-start gap-x-[24px]">
                <AutoComplete />
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
