import React from 'react';
import PropTypes from 'prop-types';
import { formatCurrency } from '../../../common/utils/NumberUtils';

export default function ReportProductTableRow(props) {
  const { product } = props;
  const { name, sku, quantitySold, revenue, quantityReturned, refunds } = product;

  return (
    <tr>
      <th className={'name'} scope='row'>
        {name}
      </th>
      <td className={'sku'}>{sku}</td>
      <td className={'quantitySold'}>{quantitySold}</td>
      <td className={'quantityReturned'}>{quantityReturned}</td>
      <td className={'revenue'}>{formatCurrency(revenue)}</td>
      <td className={'refunds'}>{formatCurrency(refunds)}</td>
    </tr>
  );
}

ReportProductTableRow.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    sku: PropTypes.string.isRequired,
    quantitySold: PropTypes.number.isRequired,
    revenue: PropTypes.number.isRequired,
    quantityReturned: PropTypes.number.isRequired,
    refunds: PropTypes.number.isRequired,
  }),
};
