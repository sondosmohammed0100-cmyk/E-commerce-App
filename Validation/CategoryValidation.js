// require joi
// joi schema
// export
const JOI=require('joi')
const categoryShema=JOI.object({

    name: JOI.string().min(3).max(50).trim().required(),
    description: JOI.string().min(10).max(500).trim().required()
    
})
module.exports=categoryShema;
