import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Card } from 'reactstrap';
import List from 'list.js';
import { DEFAULT_LISTJS_PROPS } from '../../../common/constants/GeneralConstants';
import ProductTableRow from './ProductTableRow';

const LIST_CONTAINER_ID = 'products-list-container';

function ProductsTable(props) {
  const { products } = props;

  // Set list.js configuration
  const LIST_PROPS = Object.assign(DEFAULT_LISTJS_PROPS, {
    valueNames: ['name', 'sku', 'price'],
  });

  useEffect(() => {
    if (products) {
      const _list = new List(LIST_CONTAINER_ID, LIST_PROPS);
      if (_list.size()) {
        _list.sort('name', { product: 'asc' });
      }
    }
  }, [products, LIST_PROPS]);

  return (
    <Row className='row' id={LIST_CONTAINER_ID}>
      <div className='col-xl-12'>
        <Card className='card mb-0'>
          <div className='table-responsive'>
            <table className='table align-items-center table-flush'>
              <thead className='thead-light'>
                <tr>
                  <th scope='col' data-sort='name' className='sort'>
                    NAME
                  </th>
                  <th scope='col' data-sort='sku' className='sort'>
                    SKU
                  </th>
                  <th scope='col' data-sort='price' className='sort'>
                    PRICE
                  </th>
                </tr>
              </thead>
              {products && (
                <tbody className='list'>
                  {products.map((product) => (
                    <ProductTableRow key={product.id} product={product} />
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </Card>
        <nav aria-label='...'>
          <ul className='pagination my-4 pagination-alt'></ul>
        </nav>
      </div>
    </Row>
  );
}

ProductsTable.propTypes = {
  products: PropTypes.array.isRequired,
};

export default ProductsTable;
