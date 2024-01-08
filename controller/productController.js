import { request, response } from "express"
import { Op } from "sequelize"
import Product from "../models/productModel.js"
import ProductFeatures from "../models/featureModel.js"
import Collection from "../models/collectionModel.js"



const getProduct = async (req = request, res = response) => {
    const {id} = req.params

    const productId = await Product.findByPk(id, {include: ProductFeatures})

    if(!productId) {
        const error = new Error('Product dont exist')
        return res.status(400).json({msg: error.message})
    }

    res.status(200).json(productId)
    
} 

const getAllProductStatic = async (req = request, res = response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 12;

    const products = await Product.findAll({
        include: ProductFeatures, 
        offset: (page - 1) * limit,
        limit: limit,
        
    })

    const productNumber = await Product.count()
    
    if(products.length === 0) {
        const error  = new Error('Not products')
        return res.status(400).json({msg: error.message})
    }

    res.status(200).json({quantityProducts: productNumber, products})
    
}





const createProduct = async (req = request, res = response) => {

    const { 
        title, description, price, color, 
        stock, status, rating, freeShipping, discount, imageUrl, 
        collectionId 
    } = req.body

    const productExist = await Product.findOne({where: { [Op.and]: [ {title: title}, {color: color} ] } })
    

    if(productExist) {
        const error = new Error('This product exist')
        return res.status(404).json({msg: error.message})
    }

    if (collectionId) {
        const collectionExist = await Collection.findByPk(collectionId)

        if (!collectionExist) {
          const error = new Error('This collection doesnt exist')
          return res.status(404).json({msg: error.message})
        }
        
      }

    try {
        

        const product = Product.build({
            title: title,
            description: description,
            imageUrl: imageUrl ?? null,
            price: price,
            color: color,
            stock: stock,
            status: status,
            rating: rating,
            freeShipping: freeShipping,
            discount: discount,
            collectionId: collectionId ?? null
        })
        
        await product.save()
        res.status(200).json({msg: 'Product Created', product})
    } catch (error) {
        const err = new Error('Failed to create product')
        return res.status(500).json({msg: err.message})
    }
    
}

const addCollectionToProduct = async(req = request, res = response) => {

    const {collectionId} = req.body
    const {id} = req.params

    const collectionExist = await Collection.findByPk(collectionId)
    const product = await Product.findByPk(id)

    if(!product) {
        const error = new Error('This product doesnt exist')
        return res.status(404).json({msg: error.message})
    }

    if(!collectionExist) {
        const error = new Error('This collection doesnt exist')
        return res.status(404).json({msg: error.message})
    }

    try {
        product.collectionId = collectionId
        await product.save();
        res.status(200).json({msg: 'Collection Added', product})
    
    } catch (error) {

        const err  = new Error('Error to Update Product')
        return res.status(500).json({msg: err.message})
    }

}

const updateProduct = async(req = request, res = response) => {
    const {id} = req.params
    const {
        title,
        description,
        imageUrl,
        price,
        freeShipping,
        status,
        color,
        stock,
        rating,
        discount,
        collectionId
    } = req.body

    const product = await Product.findByPk(id)

    if(!product) {
        const error  = new Error('This product dont exist')
        return res.status(400).json({msg: error.message})
    }

    const updateProduct = product.toJSON();//make a copy of the database


    try {

        product.title = title || updateProduct.title;
        product.description = description || updateProduct.description;
        product.imageUrl = imageUrl || updateProduct.imageUrl;
        product.price = price || updateProduct.price;
        product.color = color || updateProduct.color;
        product.stock = stock || updateProduct.stock;
        product.rating = rating || updateProduct.rating;
        product.freeShipping = freeShipping || updateProduct.freeShipping;
        product.status = status || updateProduct.status;
        product.discount = discount || updateProduct.discount;
        product.collectionId = collectionId || updateProduct.collectionId;
    
        await product.save();
        res.status(200).json({msg: 'Updated Product', product, oldProduct: updateProduct})
        
    } catch (error) {
        const err  = new Error('Error to Update Product')
        return res.status(500).json({msg: err.message})
    }


}

const deleteProduct = async(req = request, res = response) => {
    const {id} = req.params

    const existProduct = await Product.findByPk(id)

    if(!existProduct) {
        const err  = new Error(`This ID:${id} does not exist`)
        return res.status(400).json({msg: err.message})
    }
    
    await Product.destroy({where: {id: id}})
    await ProductFeatures.destroy({where: {productId: id}})

    res.status(200).json({msg: 'Deleted successfully'})
}


const searchProduct = async(req = request, res = response) => {
    const productName = req.query.productName

    if (!productName || !productName.trim()) {
        return res.status(400).json({msg: 'Please enter a value'})
    }
    

    const product = await Product.findAll({
        attributes: { exclude: ['description', 'collectionId'] },
        where: {
            title: {
              [Op.startsWith]: `${productName}%`
            }
        }
    })

    if(!product || product.length === 0) {
        const err  = new Error("Don't Exist")
        return res.status(404).json({msg: err.message})
    }
    res.status(200).json({product})
}




export {
    getProduct,
    getAllProductStatic,
    createProduct,
    addCollectionToProduct,
    updateProduct,
    deleteProduct,
    searchProduct
}