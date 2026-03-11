import mongoose, { Schema } from 'mongoose'


const productSchema = new Schema({
    organizationId:{
        type:Schema.Types.ObjectId,
        ref: "Organization",
        index:true
    },
      name:{
        type:String,
        required:true
    },
      sku:{
        type:String,
        required:true
    },
      description:{
        type:String,
        required:true
    },
      quantity:{
         type: Number,
         required:true
    },
    selling_price:{
         type: Number,
         required:true
    },
    cost_price:{
         type: Number,
         required:true
    },
     low_stock_threshold:{
         type: Number,
         required:true
    },

    
},
{    timeStamps:true
}
)

export const Product = mongoose.model("Product", productSchema)