import {
    ADD_PRODUCT_ERROR,
    ADD_PRODUCT_SUCCES,
    ADD_PRODUCT,
    START_DOWNLOAD_PRODUCT,
    DOWNLOAD_PRODUCT_SUCCES,
    DOWNLOAD_PRODUCT_ERROR,
    GET_PRODUCT_DELETE,
    PRODUCT_DELETE_ERROR,
    PRODUCT_DELETE_SUCCES,
    GET_PRODUCT_EDIT,
    PRODUCT_EDIT_SUCCES,
    PRODUCT_EDIT_ERROR,
} from '../type/index';

//each reducer has its state
const initialState = {
    products: [],
    error: false,
    loading: false,
    deleteProduct: null,
    editProduct: null
};

export default function(state = initialState, action){
    switch(action.type){
        case ADD_PRODUCT:
            return { ...state, loading: true} 
        case ADD_PRODUCT_SUCCES:
            return {...state, loading: false, products:[...state.products, action.payload]}     
        case ADD_PRODUCT_ERROR:
        case DOWNLOAD_PRODUCT_ERROR: 
        case PRODUCT_DELETE_ERROR:
        case PRODUCT_EDIT_ERROR:    
            return {...state, loading: false, error: action.payload}    
        case START_DOWNLOAD_PRODUCT:
            return {...state, loading: true}    
        case DOWNLOAD_PRODUCT_SUCCES:
            return {...state, loading: false, error: false, products: action.payload}        
        case GET_PRODUCT_DELETE:
            return {...state, deleteProduct: action.payload}    
        case PRODUCT_DELETE_SUCCES:
            return {...state, products: state.products.filter(product => product.id !== state.deleteProduct), deleteProduct: null}   
        case GET_PRODUCT_EDIT:
            return {...state, editProduct: action.payload} 
        case PRODUCT_EDIT_SUCCES:
            return {...state, editProduct: null, products: state.products.map(product => (
                product.id === action.payload.id ? product = action.payload : product
            ))}          
        default:
            return state;
    }
}