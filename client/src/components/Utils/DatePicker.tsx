// src/components/DatePickerInput.jsx
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DatePickerInput({
  selected,
  onChange,
  placeholderText,
  required = false,
}) {
  return (
    <DatePicker
      selected={selected}
      onChange={onChange}
      placeholderText={placeholderText}
      dateFormat="dd-MM-yyyy"
      required={required}
      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
    />
  );
}

export default DatePickerInput;
