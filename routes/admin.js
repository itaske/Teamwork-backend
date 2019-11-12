const router=require('express').Router();
const admin=require('../controllers/admin');

router.post("/api/v1/auth/create-user",admin.createUser);


module.exports=router;