import {
    ADD_PRODUCT,
    ADD_PRODUCT_SUCCES,
    ADD_PRODUCT_ERROR,
    START_DOWNLOAD_PRODUCT,
    DOWNLOAD_PRODUCT_SUCCES,
    DOWNLOAD_PRODUCT_ERROR,
    GET_PRODUCT_DELETE,
    PRODUCT_DELETE_ERROR,
    PRODUCT_DELETE_SUCCES,
    GET_PRODUCT_EDIT,
    START_EDITION_PRODUCT,
    PRODUCT_EDIT_SUCCES,
    PRODUCT_EDIT_ERROR
} from '../type/index'
import clientAxios from '../config/axios';
import Swal from 'sweetalert2';
//function create and add products
export function createNewProductAction(product){
    return async (dispatch) => {
        dispatch(addProduct());
        try {
            //add API
            await clientAxios.post('/products', product)
            dispatch(addProductSucces(product));
            Swal.fire(
                'Correct',
                'the product was added successfully',
                'success'
            )
        } catch (error) {
            console.log(error)
            dispatch(addProductError(true));
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'There is an error, try again'
            })
        }
    }
}

const addProduct = () => ({
    type: ADD_PRODUCT,
});
const addProductSucces = product => ({
    type: ADD_PRODUCT_SUCCES,
    payload: product
});
const addProductError = e => ({
    type: ADD_PRODUCT_ERROR,
    payload: e
});

//function download productos of db
export function getProductsAction(){
    return async (dispatch) => {
        dispatch(downloadProducts());

        try {
            const res = await clientAxios.get('/products');
            dispatch(downloadProductsSucces(res.data))
        } catch (error) {
            console.log(error)
            dispatch(downloadProductsError())
        }
    }
};
const downloadProducts = () => ({
    type: START_DOWNLOAD_PRODUCT
});
const downloadProductsSucces = pro => ({
    type: DOWNLOAD_PRODUCT_SUCCES,
    payload: pro
});
const downloadProductsError = () => ({
    type: DOWNLOAD_PRODUCT_ERROR,
    payload: true
});

//Select and delete of the product
export function deleteProductAction(id){
    return async (dispatch) => {
        dispatch(getProductDelete(id));

        try {
            await clientAxios.delete(`/products/${id}`);
            dispatch(deleteProductSucces());

            Swal.fire(
                "Deleted",
                "Your file has been deleted",
                "success"
            );
        } catch (error) {
            console.log(error);
            dispatch(productDeleteError());
        }
    }
} 

const getProductDelete = id => ({
    type: GET_PRODUCT_DELETE,
    payload: id
});
const deleteProductSucces = () => ({
    type: PRODUCT_DELETE_SUCCES,
});
const productDeleteError = () => ({
    type: PRODUCT_DELETE_ERROR,
    payload: true
});

//Product edit
export function getProductEditAction(product){
    return (dispatch) => {
        dispatch(getProductAction(product));
    }
};

const getProductAction = product => ({
    type: GET_PRODUCT_EDIT,
    payload: product
});

//Edit product in the action and state
export function editProductAction(product){
    return async (dispatch) => {
        dispatch(editProduct());

        try {
            await clientAxios.put(`/products/${product.id}`, product);
            dispatch(editProductSucces(product));
        } catch (error) {
            console.log(error);
            dispatch(editProductError);
        }
    }
}
const editProduct = () => ({
    type: START_EDITION_PRODUCT
});
const editProductSucces = product => ({
    type: PRODUCT_EDIT_SUCCES,
    payload: product
});
const editProductError = () => ({
    type: PRODUCT_EDIT_ERROR,
    payload: true
})