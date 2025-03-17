import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import ActionBar from '../../../components/actionBar/ActionBar';
import ProductsTable from './ProductsTable';

function Products(props) {
  const { ProductsStore } = props;

  const [products, setProducts] = useState();

  useEffect(() => {
    ProductsStore.getProducts().then((result) => {
      if (result) setProducts(result);
    });
  }, [ProductsStore]);

  return (
    <Fragment>
      <ActionBar label='Products' />
      <ProductsTable products={products} />
    </Fragment>
  );
}

Products.propTypes = {
  ProductsStore: PropTypes.object.isRequired,
};

export default inject((root) => ({
  ProductsStore: root.RootStore.productsStore,
}))(observer(Products));
