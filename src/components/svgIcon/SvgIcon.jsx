import React from 'react';

function SvgIcon({ icon, 'data-testid': dataTestId }) {
  const iconClass = `o-icon o-icon-${icon}`;
  const url = `/assets-v2/images/symbol-defs.svg#o-icon-${icon}`;
  return (
    <svg className={iconClass} data-testid={dataTestId || 'svg-icon'}>
      <use xlinkHref={url}></use>
    </svg>
  );
}

export default SvgIcon;
