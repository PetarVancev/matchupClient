import React, { useState } from "react";

const DropdownInput = ({ options, selectedOption, onChange }) => {
  const [hiddenValue, setHiddenValue] = useState(selectedOption);

  const handleOptionChange = (option) => {
    setHiddenValue(option);
    onChange(option);
  };

  return (
    <div className="dropdown">
      <button
        className="dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {selectedOption}
      </button>
      <input type="hidden" name="hiddenValue" value={hiddenValue} />
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        {options.map((option, index) => (
          <a
            key={index}
            className="dropdown-item"
            href="#"
            onClick={() => handleOptionChange(option)}
          >
            {option}
          </a>
        ))}
      </div>
    </div>
  );
};

export default DropdownInput;
