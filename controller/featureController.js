import { request, response } from "express";
import ProductFeatures from "../models/featureModel.js";
import Product from "../models/productModel.js";



const createFeature = async (req = request, res = response) => {
    const {
        first, firstValue,
        second, secondValue,
        third, thirdValue,
        fourth, fourthValue,
        fifth, fifthValue,

    } = req.body
    const {id} = req.params

    const product = await Product.findOne({where: {id: id}})

    if(!product) {
        const error = new Error('This product Doesnt exist')
        return res.status(400).json({msg: error.message})
    }

    const limitFeature = await ProductFeatures.count({
        where: {
            productId: product.id
        }
    })

    if(limitFeature >= 5) {
        const error = new Error('This product already has 5 features')
        return res.status(400).json({msg: error.message})
    }
    

    const [feature, created] = await ProductFeatures.findOrCreate({
        where: {
          productId: product.id,
          first: first, firstValue: firstValue,
          second: second, secondValue: secondValue,
          third: third, thirdValue: thirdValue,
          fourth: fourth, fourthValue: fourthValue,
          fifth: fifth, fifthValue: fifthValue,
        },
    })
      
    if (!created) {
        const error = new Error('A feature with this name and value already exists for this product')
        return res.status(400).json({msg: error.message})
    }

    res.status(200).json({msg: 'Feature added', feature})
}

const updateFeature = async (req = request, res = response) => {

    const {id} = req.params
    const {
        first, firstValue,
        second, secondValue,
        third, thirdValue,
        fourth, fourthValue,
        fifth, fifthValue,
    } = req.body

    const feature = await ProductFeatures.findByPk(id)

    if(!feature) {
        const error = new Error('This feature Doesnt exist')
        return res.status(400).json({msg: error.message})
    }

    const updateFeature = feature.toJSON()

    try {

        feature.first = first || updateFeature.first;
        feature.firstValue = firstValue || updateFeature.firstValue;
        feature.second = second || updateFeature.second;
        feature.secondValue = secondValue || updateFeature.secondValue;
        feature.third = third || updateFeature.third;
        feature.thirdValue = thirdValue || updateFeature.thirdValue;
        feature.fourth = fourth || updateFeature.fourth;
        feature.fourthValue = fourthValue || updateFeature.fourthValue;
        feature.fifth = fifth || updateFeature.fifth;
        feature.fifthValue = fifthValue || updateFeature.fifthValue;
        
    
        await feature.save();
        res.status(200).json({msg: 'Updated Feature', feature, oldFeature: updateFeature})
        
    } catch (error) {
        const err  = new Error('Error to Update Feature')
        return res.status(500).json({msg: err.message})
    }
}


const deleteFeature = async (req = request, res = response) => {
    const {id} = req.params

    const existFeature = await ProductFeatures.findByPk(id)

    if(!existFeature) {
        const err  = new Error(`This ID:${id} does not exist`)
        return res.status(400).json({msg: err.message})
    }
    
    await ProductFeatures.destroy({where: {id: id}})

    res.status(200).json({msg: 'Deleted successfully'})
}

export {
    createFeature,
    updateFeature,
    deleteFeature,
}