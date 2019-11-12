const router=require('express').Router();
const admin=require('../controllers/admin');

router.post("/api/v1/auth/signin",admin.loginUser);

module.exports=router;