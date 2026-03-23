const JOI=require('joi');
const RegisterSchema=JOI.object({
    name:JOI.string().min(3).max(30).required(),
    email:JOI.string().email().required(),
    
    password:JOI.string().min(8).required(),
    confirmPassword:JOI.string().valid(JOI.ref('password')).required().messages({
        'any.only':'Confirm Password must match Password'
    }),
    role:JOI.string().valid('user','admin').default('user')
});
const LoginSchema=JOI.object({
    email:JOI.string().email().required(),
    password:JOI.string().min(8).required()
});


module.exports={RegisterSchema, LoginSchema};