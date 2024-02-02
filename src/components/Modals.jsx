import PropTypes from 'prop-types'

// start modal
export const StartModal = ({id}) => {
  return (
      <dialog id={id} className='modal'>
        <div className='modal-box'>
          <h3 className='font-bold text-xl'>Keep it up!</h3>
          <p className='py-4 italic'>
            Don’t watch the clock; do what it does. Keep going.
          </p>
        </div>
        <form method='dialog' className='modal-backdrop'>
          <button>close</button>
        </form>
      </dialog>
  )
}

StartModal.propTypes = {
  id: PropTypes.string
}

// end modal
export const EndModal = ({id}) => {
  return (
    <dialog id={id} className='modal'>
      <div className='toast toast-top end-auto whitespace-normal sm:min-w-max'>
        <div className='alert alert-success flex flex-col items-start gap-0'>
          <h3 className='font-bold text-xl'>You&apos;re Great!</h3>
          <p className='py-2 italic'>
            Energy and persistence conquer all things.
          </p>
        </div>
      </div>
      <form method='dialog' className='modal-backdrop'>
        <button>close</button>
      </form>
    </dialog>
  );
}

EndModal.propTypes = {
  id: PropTypes.string
}