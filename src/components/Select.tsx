/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Box } from 'rebass';
import VirtualSelect from 'react-virtualized-select';

export type OptionType = { label: string; value: string };

interface SelectProps {
  defaultOptions?: Array<OptionType>;
  loadOptions?(value: string, actionMeta: any): void;
  name: string;
  onChange(value: any, actionMeta: any): void;
  options?: Array<OptionType>;
  placeholder?: string;
  value: string;
  variant?: string;
}

const SelectDropdown: React.FC<SelectProps> = ({
  options,
  onChange,
  name,
  placeholder,
  value
}) => {
  const handleChange: any = (value: any, actions: any) => {
    console.log('value', value);
    onChange(value, actions);
  };

  return (
    <Box width="100%">
      <VirtualSelect
        options={options}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
      />
    </Box>
  );
};

export default SelectDropdown;
