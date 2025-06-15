import { Cart } from "../Models/CartModel.js";

//add to cart
export const addtoCart = async (req, res) => {
    try {
        const { productId, title, price, qty } = req.body;
        // userid comming from auth  middleware, globaly available
        const userId = req.user

        let cart = await Cart.findOne({ userId });
        // if no cart then create new cart
        if (!cart) {
            // userid and items array is declared in Cart schema
            // initialy no items in cart
            cart = new Cart({ userId, items: [] })
        }
        // now finding existing item by productid, if found then we add qty
        // if product id found im item then add qty

        const itemIndex = cart.items.findIndex(
            (item) => item.productId.toString() == productId
        )

        // if item found then increase the quantity
        // -1 return when no item found, 
        // but here item found
        if (itemIndex > -1) {
            // add qty to the cart items
            cart.items[itemIndex].qty += qty;
            cart.items[itemIndex].price += price * qty;

            // Update title if changed
            if (cart.items[itemIndex].title !== title) {
                cart.items[itemIndex].title = title;
            }
        }
        else {
            // if no product then push comming product detail from body
            cart.items.push({ productId, title, price, qty });
        }
        await cart.save();
        res.json({ message: 'succesfully added to cart', cart: cart, succes: true })


    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
}


// get user specific cart
export const getuserspecificCart = async (req, res) => {
    try {
        const userId = req.user;
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            res.json({ message: 'no cart found', succes: false });
        }

        res.json({ message: 'fetched user cart data', cart: cart, success: true })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
}

// decrease the quantity of product
export const decreaseCart = async (req, res) => {
    try {
        const { productId, qty } = req.body;
        // userid comming from auth  middleware, globaly available
        const userId = req.user

        let cart = await Cart.findOne({ userId });

        // now finding existing item by productid, if found then we add qty
        // if product id found im item then add qty
        const itemIndex = cart.items.findIndex(
            (item) => item.productId.toString() == productId
        )

        // if item found then decrease the quantity
        // -1 return when no item found, 
        // if greater then -1 mean item found
        if (itemIndex > -1) {

            const item = cart.items[itemIndex]
            // for quantity greater then 0
            if(item.qty>qty){

                const priceperunit = item.price/item.qty;
                item.qty -= qty;
               item.price -= priceperunit*qty;

            }
             else {
                cart.items.splice(itemIndex,1);
             }
        }
        else{
            res.json({message:'no proudct id found'})
        }


        await cart.save();
        res.json({ message: 'succesfully updated cart', cart: cart, succes: true })


    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
}

// delete/clear the cart 

export const clearCart = async (req, res) => {

    try {
        const userId = req.user;

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({userId, items:[]});
        }

        else {
            cart.items=[]
        }

       await cart.save();
        res.json({ message: 'user cart cleared', succes: true })
    }

    catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }

}

//remove product by id
export const removeproductbyId = async (req, res) => {

    try {

        const productid = req.params.id;
        const userId = req.user;

        const cart = await Cart.findOne({ userId })
        if (!cart) {
            return res.json({ message: 'no cart found', success: false })
        }
        if (cart.items == '') {
            return res.json({ message: 'no product for deletion', success: false })
        }
        // Remove the product from the cart items array
        cart.items = cart.items.filter(item => item.productId.toString() !== productid);
        await cart.save();

        res.json({ message: 'product deleted successfuly', success: true })


    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
}

