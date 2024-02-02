import PropTypes from 'prop-types'

const Buttons = ({ onClick, disabled, content, isOutline }) => {
    const buttonClassName = `btn btn-sm btn-primary ${
      isOutline ? "btn-outline" : ""
    }`;

  return (
        <button
          onClick={onClick}
          disabled={disabled}
          className={buttonClassName}
        >
          {content}
        </button>
  )
}

Buttons.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  content: PropTypes.string.isRequired,
  isOutline: PropTypes.bool
}

export default Buttons