import mongoose, { Schema } from 'mongoose'

const organizationSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:"User"
    }
},
    {
        timestamps:true
    }
)

export const Organization = mongoose.model("Organization",organizationSchema)