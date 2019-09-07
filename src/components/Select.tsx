import React from "react";
import Select from "react-select"

import { colors } from "../theme";

type OptionType = { label: string; value: string };

interface SelectProps {
  defaultOptions?: Array<OptionType>,
  loadOptions?(): void;
  name: string;
  onChange(value: any, actionMeta: any): void;
  options?: Array<OptionType>;
  placeholder?: string;
  value: OptionType;
  variant?: string;
}

const SelectDropdown: React.FC<SelectProps> = ({ options, onChange, name, placeholder, value }) => {
  return (
    <Select
      options={options}
      onChange={onChange}
      value={value}
      name={name}
      placeholder={placeholder}
      theme={theme => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary: colors.primary,
          dander: colors.error,
          neutral80: colors.text,
          primary25: colors.gray
        },
      })}
    />
  );
}

export default SelectDropdown;