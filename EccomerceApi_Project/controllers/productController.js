import { Product } from '../Models/ProductModel.js';
// add dynamic product
export const addproduct = async (req, res) => {
    try {
        let addproduct = await Product.create(req.body);
        res.status(202).json({ message: 'product added sucessfult', success: true, Product: addproduct });


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'internal Server error' });

    }
}

// get all products
export const getallProduct = async (req, res) => {
    try {
          let allproduct = await Product.find();
          if(!allproduct){
            return res.json({message:'no products found', success: false})
          }

          res.json({message:'Products found', success:true,Product: allproduct })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'internal Server error' });

    }
}

// get product by id
export const getProductbyId = async (req, res) => {
    try {
        const id = req.params.id;
          let allproduct = await Product.findById(id);
          if(!allproduct){
            return res.json({message:'invalid id', success: false})
          }

          res.json({message:'fetched specific product', success:true,Product: allproduct })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'internal Server error' });

    }
}

// update product by id
export const updateProductbyId = async (req, res) => {
    try {
        const id = req.params.id;
          let product = await Product.findByIdAndUpdate(id, req.body,{new:true});
          if(!product){
            return res.json({message:'invalid id', success: false})
          }

          res.json({message:'product updated successfuly', success:true,Product: product })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'internal Server error' });

    }
}

// delete product by id
export const deleteProductbyId = async (req, res) => {
    try {
        const id = req.params.id;
          let product = await Product.findByIdAndDelete(id);
          if(!product){
            return res.json({message:'invalid id', success: false})
          }

          res.json({message:'product deleted successfuly', success:true})

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'internal Server error' });

    }
}