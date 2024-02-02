import PropTypes from 'prop-types'

const TimeSelect = ({ options, value, onChange, disabled }) => {
  return (
    <select
      className='select select-primary w-fit max-w-xs'
      value={value}
      onChange={onChange}
      disabled={disabled}
    >
      {options.map((option) => (
        <option key={option.label} value={option.value} disabled={option.disabled}>
          {option.label}
        </option>
      ))}
      
    </select>
  );
}

TimeSelect.propTypes = {
  options: PropTypes.array.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool
}

export default TimeSelect