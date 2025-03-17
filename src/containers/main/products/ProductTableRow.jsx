import React from 'react';
import PropTypes from 'prop-types';
import { formatCurrency } from '../../../common/utils/NumberUtils';

export default function ProductTableRow(props) {
  const { product } = props;
  const { name, sku, price } = product;

  return (
    <tr>
      <th className={'name'} scope='row'>
        {name}
      </th>
      <td className={'sku'}>{sku}</td>
      <td className={'price'}>{formatCurrency(price)}</td>
    </tr>
  );
}

ProductTableRow.propTypes = {
  order: PropTypes.shape({
    name: PropTypes.string.isRequired,
    sku: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }),
};
