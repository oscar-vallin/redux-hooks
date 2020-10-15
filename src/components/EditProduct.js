import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {editProductAction} from '../actions/productAction';
import {useHistory} from 'react-router-dom';

const EditProduct = () => {
    const dispacth = useDispatch();
    const history = useHistory();

    const [product, getProduct] = useState({
        name: '',
        price: ''
    })

    const productEdit = useSelector(state => state.products.editProduct);
    
    useEffect(() => {
        getProduct(productEdit)
    },[productEdit])
    
    const onChangeForm = e => {
        getProduct({
            ...product,
            [e.target.name] : e.target.value
        })
    }

    const submitEditProduct = e => {
        e.preventDefault();
        dispacth(editProductAction(product));
        history.push('/');
    }
    return(
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">Edit Product</h2>
                        <form onSubmit={submitEditProduct}>
                            <div className="form-group">
                                <label htmlFor="">Name Product</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={product.name}
                                    placeholder="New Product"
                                    onChange={onChangeForm}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Price Product</label>
                                <input 
                                    type="number"
                                    className="form-control"
                                    name="price"
                                    value={product.price}
                                    placeholder="Price Product"
                                    onChange={onChangeForm}/>
                            </div>
                            <button className="btn btn-primary font-weight-bold text-uppercase d-block w-100">Save Changes</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default EditProduct; 