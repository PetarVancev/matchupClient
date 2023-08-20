import React, { useState } from "react";

function DateSelector({ onDateChange }) {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let dates = [];
  var i;

  let currentDate = `${day}.${month}.${year}`;

  for (i = 0; i <= 10; i++) {
    let nextDay = day + i;
    let nextDate = `${nextDay}.${month}.${year}`;
    dates.push(nextDate);
  }

  const [selectedDate, setSelectedDate] = useState(currentDate);

  return (
    <div className="date-selector-row">
      <div className="col-12 text-center">
        <div className="dropdown show">
          <a
            className="dropdown-toggle"
            href="#"
            role="button"
            id="dropdownMenuLink"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {selectedDate || currentDate}
          </a>

          <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
            {dates.map((date, index) => (
              <a
                className="dropdown-item"
                href="#"
                key={index}
                onClick={() => {
                  setSelectedDate(date);
                  onDateChange(date);
                }}
              >
                {date}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DateSelector;
