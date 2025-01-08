import { ChangeEvent, MouseEvent, useState } from "react";

interface Props {
  initialValue?: string;
  options: string[];
  onSelected: (value: string) => void;
}

const Dropdown = ({ initialValue, options, onSelected }: Props) => {
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [selectedValue, setSelectedValue] = useState(initialValue);
  const [filter, setFilter] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  const handleFilterOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const filterText = event.target.value;
    setFilter(filterText);

    const filtered = options.filter((option) =>
      option.toLowerCase().includes(filterText.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  const handleSelect = (value: string, event: MouseEvent<HTMLLIElement>) => {
    event.stopPropagation();
    setSelectedValue(value);
    onSelected(value);
  };

  return (
    <div className="relative">
      <div
        className={`dropdown ${
          selectedValue ? "text-gray-900" : "text-gray-400"
        } ${showOptions ? "dropdown-active" : ""}
        }`}
        onClick={() => setShowOptions(!showOptions)}
      >
        {selectedValue ? selectedValue : "Select"}
      </div>

      {showOptions && (
        <div className="absolute left-0 right-0 -bottom-2 translate-y-full z-10 bg-white border border-gray-200 rounded-lg">
          <input
            className="w-full p-2"
            type="text"
            value={filter}
            onChange={handleFilterOnChange}
            placeholder="Search..."
          />

          <ul>
            {filteredOptions.map((option, index) => (
              <li
                key={index}
                className={`p-2 hover:bg-slate-100 cursor-pointer ${
                  option === selectedValue ? "bg-slate-100" : ""
                }`}
                onClick={(event) => {
                  handleSelect(option, event);
                }}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;