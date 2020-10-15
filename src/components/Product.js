import React from 'react';
import {useHistory} from 'react-router-dom';
import Swal from 'sweetalert2';

import {useDispatch} from 'react-redux';
import {deleteProductAction, getProductEditAction} from '../actions/productAction'

const Product = ({product}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const confirmDleteProduct = id => {
        //ask user
        Swal.fire({
            title: "Are you sure",
            text: "You won´t be able to revert this!",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "yes, delet it",
            cancelButtonText: "Cancel"
        }).then( result => {
            if(result.value){
                dispatch(deleteProductAction(id))
            }
        });
    };

    const redeEdition = pro => {
        dispatch(getProductEditAction(pro))
        history.push(`/product/edit/${pro.id}`)
    }
    return(
        <tr>
            <td>{product.name}</td>
            <td><span className="font-weight-bold">$ {product.price}</span></td>
            <td className="acciones">
                <button type="button" onClick={() => redeEdition(product)} className="btn btn-primary mr-2">Edit</button>
                <button type="button" className="btn btn-danger" onClick={() => confirmDleteProduct(product.id)}>Delete</button>
            </td>
        </tr>
    );
}
export default Product;