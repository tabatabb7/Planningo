import React, { useState } from 'react';
import LuxonUtils from '@date-io/luxon'
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

function DatePickerTab() {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <MuiPickersUtilsProvider utils={LuxonUtils}>
      <DatePicker value={selectedDate} onChange={handleDateChange} />
    </MuiPickersUtilsProvider>
  );
}

export default DatePickerTab