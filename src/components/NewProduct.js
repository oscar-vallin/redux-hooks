import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
//action redux
import {createNewProductAction} from '../actions/productAction';
import {showAlertAction, hideAlertAction} from '../actions/alertAction';

const NewProduct = ({history}) => {
    const [name, getName] = useState('');
    const [price, getPrice] = useState(0);
    //selector
    const loading = useSelector(state => state.products.loading);
    const error = useSelector(state => state.products.error);
    const alert = useSelector(state => state.alert.alert);

    //dispacth
    const dispatch = useDispatch();
    const addProduct = product => dispatch(createNewProductAction(product));
    const submitNewProduct = e => {
        e.preventDefault();
        //valid form
        if(name.trim() === '' || price <= 0){
            const alert = {
                msg: "both fields are required",
                classes: "alert alert-danger text-center text-uppercase p3"
            }
           dispatch( showAlertAction(alert));
            return;
        }
        dispatch( hideAlertAction())
        //create product
        addProduct({
            name, 
            price
        });
        history.push('/');
    }
    return(
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">Add New Product</h2>
                         {alert ? <p className={alert.classes}>{alert.msg}</p>: null}
                        <form onSubmit={submitNewProduct}>
                            <div className="form-group">
                                <label htmlFor="">Name Product</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    placeholder="New Product"
                                    value={name}
                                    onChange={e => getName(e.target.value)}
                                    />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Price Product</label>
                                <input 
                                    type="number"
                                    className="form-control"
                                    name="price"
                                    placeholder="Price Product"
                                    value={price}
                                    onChange={e => getPrice(Number(e.target.value))}
                                    />
                            </div>
                            <button className="btn btn-primary font-weight-bold text-uppercase d-block w-100">Add</button>
                        </form>
                        {loading ? <h2>Loading...</h2>: null}
                        {error ? <p className="alert alert-danger p2 mt-4 text-center">There´s an error</p>: null}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default NewProduct;