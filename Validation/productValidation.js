const JOI=require('joi')
const ProductShema=JOI.object({
    name:JOI.string().required().min(3).max(50),
    description:JOI.string().required().min(10).max(500),
    price:JOI.number().required().min(0),
    categoryId: JOI.string().required()
    
})
module.exports=ProductShema;