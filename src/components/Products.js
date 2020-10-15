import React, {Fragment, useEffect} from 'react';
import Product from './Product';

import {useSelector, useDispatch} from 'react-redux';
import {getProductsAction} from '../actions/productAction'

const Products = () => {
    const dispatch = useDispatch();
  
    useEffect(() => {
        const downloadProduct = () => dispatch(getProductsAction());
        downloadProduct();
    },[]);

    const product = useSelector(state => state.products.products);
    const error = useSelector(state => state.products.error);
    const loading = useSelector(state => state.products.loading)
   
    return(
        <Fragment>
            <h2 className="text-center my-5">List of Products</h2>
            {error ? <p className="font-weight-bold alert alter-danger text-center mt-4">There is an error</p>: null}
            {loading ? <p className="text-center">Loading...</p>: null}
            <table className="table table-striped">
                <thead className="bg-primary table-dark">
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {product.length === 0 ?' There is no product' : (
                        product.map(pro => (
                            <Product
                                key={pro.id}
                                product={pro}
                            />
                        ))
                    )}
                </tbody>
            </table>
        </Fragment>
    );
}
export default Products;