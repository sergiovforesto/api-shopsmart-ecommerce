import { request, response } from "express";
import Collection from "../models/collectionModel.js";
import Product from "../models/productModel.js";

const createCollection = async (req = request, res = response) => {
    const {title, description} = req.body
    
    const exist = await Collection.findOne({where: {title: title}})

    if(exist) {
        const error = new Error('This Collection exist')
        return res.status(400).json({msg: error.message})
    }

    

    try {
        //luego lo cambiamos a build
        const createCollection = Collection.build({
            title: title,
            description: description
        })
        await createCollection.save()
        res.status(201).json({msg: 'Collection Created', createCollection})
    } catch (error) {
        const err = new Error('Error To create Collection')
        res.status(400).json({msg: err.message})
    }
}


const getCollections = async (req = request, res = response) => {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 11;
    const collections = await Collection.findAll({
        include: Product,
        offset: (page - 1) * limit,
        limit: limit
    })

    const collectionNumber = await Collection.count()

    if(collections.length === 0) {
        const error  = new Error('Not collections')
        return res.status(400).json({msg: error.message})
    }

    const productsByCollection = collections.map((collection) => {
        const quantityProducts = collection.products.length;
      
        return {
          id: collection.id,
          title: collection.title,
          quantityProducts,
        };
    });


    res.status(200).json({quantityCollections: collectionNumber, productsByCollection})
}

const getCollection = async(req = request, res = response) => {
    const {id} = req.params

    const collection = await Collection.findByPk(id)

    if(!collection) {
        const error = new Error('This collection Doesnt exist')
        return res.status(404).json({msg: error.message})
    }

    res.status(200).json({collection})
}

const updateCollection = async(req = request, res = response) => {
    const {id} = req.params
    const {title, description} = req.body
    
    const collection = await Collection.findByPk(id)

    if(!collection) {
        const error = new Error('This collection Doesnt exist')
        return res.status(404).json({msg: error.message})
    }

    const updateCollection = collection.toJSON()

    try {

        collection.title = title || updateCollection.title;
        collection.description = description || updateCollection.description;
    
        await collection.save();
        res.status(200).json({msg: 'Updated Collection', collection, oldProduct: updateCollection})
        
    } catch (error) {
        const err  = new Error('Error to Update Collection')
        return res.status(500).json({msg: err.message})
    }
    
}

const deleteCollection = async(req = request, res = response) => {
    const {id} = req.params

    const existCollection = await Collection.findByPk(id)

    if(!existCollection) {
        const err  = new Error(`This ID:${id} does not exist`)
        return res.status(404).json({msg: err.message})
    }
    
    await Collection.destroy({where: {id: id}})

    res.status(200).json({msg: 'Deleted successfully'})
}


export {
    createCollection,
    getCollections,
    getCollection,
    updateCollection,
    deleteCollection
}