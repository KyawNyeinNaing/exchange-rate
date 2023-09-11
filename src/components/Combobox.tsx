'use client';
import { Fragment, useEffect, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { filterValuesByQuery } from '@/utils';
import { SELECTED_VALUE } from '@/utils/enum';

type Props = {
  values: {
    key: string;
    value: string;
  }[];
  getValue: any;
  initialVal: SELECTED_VALUE;
};

const AutoComplete: React.FC<Props> = ({ values, initialVal, getValue }: Props) => {
  const [selected, setSelected] = useState(() => values.find(item => item.key === initialVal) || values[0]);
  const [query, setQuery] = useState('');
  const filteredValue = filterValuesByQuery(query, values);

  return (
    <Combobox
      value={selected}
      onChange={val => {
        setSelected(val);
        getValue(val?.key);
      }}
    >
      <div className="relative shadow-sm">
        <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm border border-neutral-700">
          <Combobox.Input
            className="w-full h-[40px] border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
            displayValue={(each: any) => each.value}
            onChange={event => {
              setQuery(event.target.value);
            }}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery('')}
        >
          <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
            {filteredValue.length === 0 && query !== '' ? (
              <div className="relative cursor-default select-none py-2 px-4 text-gray-700">Nothing found.</div>
            ) : (
              filteredValue.map(person => (
                <Combobox.Option
                  key={person.key}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-teal-600 text-white' : 'text-gray-900'
                    }`
                  }
                  value={person}
                >
                  {({ selected, active }) => (
                    <>
                      <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                        {person.value}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? 'text-white' : 'text-teal-600'
                          }`}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
};

export default AutoComplete;
