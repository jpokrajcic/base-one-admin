import React from 'react';
import PropTypes from 'prop-types';
import { formatCurrency } from '../../../common/utils/NumberUtils';
import moment from 'moment';

export default function OrderTableRow(props) {
  const { order } = props;
  const { reference, total, refundsTotal, financialStatus, createdAt, details = '' } = order;

  return (
    <tr>
      <th className={'reference'} scope='row'>
        {reference}
      </th>
      <td className={'total'}>{formatCurrency(total)}</td>
      <td className={'refundsTotal'}>{refundsTotal ? formatCurrency(refundsTotal) : '-'}</td>
      <td className={'financialStatus'}>{financialStatus}</td>
      <td className={'createdAt'}>{createdAt ? moment.utc(createdAt).local().format('YYYY-MM-DD HH:mm') : ''}</td>
      <td className={'details'}>{details}</td>
    </tr>
  );
}

OrderTableRow.propTypes = {
  order: PropTypes.shape({
    reference: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired,
    refundsTotal: PropTypes.number.isRequired,
    financialStatus: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    details: PropTypes.string,
  }),
};
