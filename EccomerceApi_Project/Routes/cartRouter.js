import express from 'express'
import { isAuthenticated } from '../middlewares/Auth.js';
import { addtoCart, clearCart, decreaseCart, getuserspecificCart, removeproductbyId } from '../controllers/cartController.js';

const cartrouter = express.Router();

// add to cart
//api-> /api/cart/addtocart
cartrouter.post('/addtocart', isAuthenticated,addtoCart);

// get user specific cart 
//api-> /api/cart/getuserspecificcart
cartrouter.get('/getuserspecificcart', isAuthenticated,getuserspecificCart);

// decrease quantity in cart
//api-> /api/cart/decreasequantity
cartrouter.delete('/decreasequantity', isAuthenticated,decreaseCart);

// delete/clear userspecific cart
//api-> /api/cart/clearcart
cartrouter.delete('/clearcart', isAuthenticated,clearCart);

//remove product id specific cart
//api-> /api/cart/removeproductfromcart/:id
cartrouter.delete('/removeproductfromcart/:id', isAuthenticated,removeproductbyId);




export default cartrouter;