import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const THIS_WEEK = 'this_week';
export const LAST_WEEK = 'last_week';
export const THIS_MONTH = 'this_month';
export const LAST_MONTH = 'last_month';
export const RESET = 'RESET';

export default function RangePickerOverlay({ classNames, selectedDay, children, ...props }) {
  const [showOverlayComponent, setShowOverlayComponent] = useState(false);

  useEffect(() => {
    if (children && children.props) setShowOverlayComponent(children.props.showOverlayComponent);
  }, [children]);

  function clickHandler(event) {
    if (children && children.props && children.props.onPredefinedRangeSelect)
      children.props.onPredefinedRangeSelect(event.currentTarget.id);
  }
  return (
    <div className={classNames.overlayWrapper} {...props}>
      <div className='DayPickerInput-Overlay'>
        {showOverlayComponent && (
          <div className='date-range-group__presets'>
            <button id={THIS_WEEK} onClick={clickHandler} className='btn btn-sm'>
              This week
            </button>
            <button id={LAST_WEEK} onClick={clickHandler} className='btn btn-sm'>
              Last week
            </button>
            <button id={THIS_MONTH} onClick={clickHandler} className='btn btn-sm'>
              This month
            </button>
            <button id={LAST_MONTH} onClick={clickHandler} className='btn btn-sm'>
              Last month
            </button>
            <button id={RESET} onClick={clickHandler} className='btn btn-sm mt-auto'>
              <span className='text-danger'>Reset</span>
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

RangePickerOverlay.propTypes = {
  classNames: PropTypes.object.isRequired,
  selectedDay: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  children: PropTypes.node.isRequired,
};
