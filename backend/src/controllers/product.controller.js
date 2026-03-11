import {asyncHandler} from '../utils/asyncHandler.js'
import{ApiError} from '../utils/ApiError.js'
import {Product} from '../models/product.model.js'
import {ApiResponse} from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"
import mongoose from 'mongoose'




const addProduct = asyncHandler( async (req, res) => {

   
   
 const  {name, sku, description, quantity,cost_price,selling_price,low_stock_threshold} = req.body

   if (
     [name,organizationId, sku, description, quantity,cost_price,selling_price,low_stock_threshold].some((field) => field?.trim() === "")
   ) {
     throw new ApiError(400, "All fields are required")
    }

    const existedProduct = await Product.findOne({
        $or: [{ name },{ sku }]
    })

    if(existedProduct){
        throw new ApiError(409, "Product already Exist either with name or sku")
    }


    const Product = await Product.create({
        organizationId,
        name,
        sku,
        description,
        quantity,
        selling_price,
        cost_price,
        low_stock_threshold,
    })

    const createdProduct = await Product.findById(Product._id)

    if(!createdProduct){
        throw new ApiError(500, "something went wrong whilw registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdProduct, "User registered Succesfully")
    )
})


const productDelete = asyncHandler(async (req, res)=>{
     const  {productId} = req.body
        if(!productId){
                throw new ApiError(404, "Product id not sent")
            }
     const response = await Product.findByIdAndDelete(productId) 
     if(!response) throw new ApiError(500, "Something went wrong")
    return res.status(201).json(
        new ApiResponse(200, response, "Product Deleted Succesfully")
    )   
})

const getAllProducts = asyncHandler(async (req, res)=>{
     const  {organizationId} = req.body
        if(!organizationId){
                throw new ApiError(404, "Product id not sent")
            }
     const response = await Product.find({organizationId:organizationId}) 
     if(!response) throw new ApiError(500, "Something went wrong")
    return res.status(201).json(
        new ApiResponse(200, response, "Products Found Succesfully")
    )   
})

const productUpdate = asyncHandler(async (req, res)=>{
     const  {organizationId} = req.body
        if(!organizationId){
                throw new ApiError(404, "Product id not sent")
            }
     const response = await Product.find({organizationId:organizationId}) 
     if(!response) throw new ApiError(500, "Something went wrong")
    return res.status(201).json(
        new ApiResponse(200, response, "Products Found Succesfully")
    )   
})




export{
    addProduct,
    productDelete,
    getAllProducts
}