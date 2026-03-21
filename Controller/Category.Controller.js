const category=require('../Models/Categories')
const categoryShema=require('../Validation/CategoryValidation')
const getAllCategory=async(req,res)=>{
    try{
        const getcategory=await category.find()
        if(getcategory.length===0){
            return res.status(404).json({
                msg:"No Category Found"
            })
        }
        return res.status(200).json({
            msg:"All Category",
            category: getcategory
        })     

    }
    catch(error){
        return res.status(500).json({
            msg:"Server Error"
        })

    }

}
const getCategoryById=async(req,res)=>{
    try{
        const getcategoryById=await category.findById(req.params.id)   
        if(!getcategoryById){
            return res.status(404).json({
                msg:"Category Not Found"
            })
        }
        return res.status(200).json({
            msg:"Category Found",
            category: getcategoryById
        })
    }
    catch(error){
        return res.status(500).json({
            msg:"Server Error"
        })
    }
}
const createCategory=async(req,res)=>{
    try{
        const {error, value}=categoryShema.validate(req.body,{
            abortEarly:false,
            stripUnknown:true
        })
        if(error){
            return res.status(400).json({
                msg:"Validation Error",
                error: error.details.map((err)=>err.message)
            })
        }
       const {name,description}=value;
//check if category already exists in database
       const existingCategory=await category.findOne({name})
       if(existingCategory){
        return res.status(400).json({  
            msg:"Category Already Exists"
        })
         }
       const newCategory=await category.create({
        name,
        description
         })

         return res.status(201).json({
            msg:"Category Created",
            category: newCategory
        })
    }catch(error){
        return res.status(500).json({
            msg:"Server Error"
        })
    }

}
const updateCategory=async(req,res)=>{
    try{
        const {error, value}=categoryShema.validate(req.body,{
            abortEarly:false,   
            stripUnknown:true
        })
        if(error){
            return res.status(400).json({
                msg:"Validation Error",
                error: error.details.map((err)=>err.message)
            })
        }
         const {name,description}=value;
            const updateCategory=await category.findByIdAndUpdate(req.params.id,{
                name,
                description
            },{new:true})
            if(!updateCategory){
                return res.status(404).json({
                    msg:"Category Not Found"
                })
            }
            return res.status(200).json({
                msg:"Category Updated",
                category: updateCategory
            })
    }
    catch(error){
        return res.status(500).json({
            msg:"Server Error"
        })
    }
}
const deleteCategory=async(req,res)=>{
    try{
        const deleteCategory=await category.findByIdAndDelete(req.params.id)
        if(!deleteCategory){
            return res.status(404).json({
                msg:"Category Not Found"
            })
        }
        return res.status(200).json({
            msg:"Category Deleted"
        })
    }
    catch(error){
        return res.status(500).json({
            msg:"Server Error"
        })
    }
}

module.exports={getAllCategory,getCategoryById,createCategory,updateCategory,deleteCategory}