import PropTypes from 'prop-types'

// Sound on
export const SoundBtn = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className='w-8 h-8'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z'
          className='speaker'
        />
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M16.463 8.288a5.25 5.25 0 0 1 0 7.424'
          className='arc2'
        />
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M19.114 5.636a9 9 0 0 1 0 12.728'
          className='arc1'
        />
      </svg>
    </button>
  );
};

SoundBtn.propTypes = {
  onClick: PropTypes.func,
};

// Sound off
export const MuteBtn = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className='w-8 h-8'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z'
        />
      </svg>
    </button>
  );
};

MuteBtn.propTypes = {
  onClick: PropTypes.func
}

// Minus button
export const MinusBtn = ({ onClick, disabled }) => {
  return (
        <button
          className='btn btn-circle btn-primary btn-outline btn-xs'
          onClick={onClick}
          disabled={disabled}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-4 h-4'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M5 12h14' />
          </svg>
        </button>
  )
}

MinusBtn.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool
}

// Plus button
export const PlusBtn = ({ onClick, disabled }) => {
  return (
    <button
      className='btn btn-circle btn-primary btn-outline btn-xs'
      onClick={onClick}
      disabled={disabled}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className='w-4 h-4'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M12 4.5v15m7.5-7.5h-15'
        />
      </svg>
    </button>
  );
}

PlusBtn.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool
}