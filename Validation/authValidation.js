const JOI=require('joi');
const RegisterSchema=JOI.object({
    name:JOI.string().min(3).max(30).required(),
    email:JOI.string().email().required(),
    password:JOI.string().min(6).required(),
    role:JOI.string().valid('user','admin').default('user')
});
const LoginSchema=JOI.object({
    email:JOI.string().email().required(),
    password:JOI.string().min(6).required()
});


module.exports={RegisterSchema, LoginSchema};