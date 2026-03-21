// require joi
// joi schema
// export
const JOI=require('joi')
const categoryShema=JOI.object({
    name:JOI.string().required().min(3).max(50),
    description:JOI.string().required().min(10).max(500)
    
})
module.exports=categoryShema;
