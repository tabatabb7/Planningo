import React, { useState } from 'react';
import LuxonUtils from '@date-io/luxon'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

function KeyboardDatePickerTab(props) {
  const [selectedDate, handleDateChange] = useState(new Date());


  return (
    <MuiPickersUtilsProvider utils={LuxonUtils}>
      <KeyboardDatePicker id="key-datepicker"
        clearable
        // name="selectedDate"
        value={selectedDate}
        onChange={(date) => handleDateChange(date)}
        minDate={new Date()}
        format="yyyy-MM-dd"
      />
    </MuiPickersUtilsProvider>
  );
}

export default KeyboardDatePickerTab;


// function DatePickerTab() {
//   const [selectedDate, handleDateChange] = useState(new Date());

//   return (
//     <MuiPickersUtilsProvider utils={LuxonUtils}>
//       <DatePicker value={selectedDate} onChange={handleDateChange} />
//     </MuiPickersUtilsProvider>
//   );
// }

// export default DatePickerTab