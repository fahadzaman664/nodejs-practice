import express from 'express'
import { addproduct, deleteProductbyId, getallProduct, getProductbyId, updateProductbyId } from '../controllers/productController.js';

const productRouter = express.Router();

// add product
//@api-> /api/product/add
productRouter.post('/add', addproduct)

//get all products
//@api-> /api/product/getallproduct
productRouter.get('/getallproduct', getallProduct)

//get product by id
//@api-> /api/product/:id
productRouter.get('/:id', getProductbyId)

//update product by id
//@api-> /api/product/:id
productRouter.put('/:id', updateProductbyId)

//delete product by id
//@api-> /api/product/:id
productRouter.delete('/:id', deleteProductbyId)




export default productRouter;