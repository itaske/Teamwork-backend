const router=require('express').Router();
const admin=require('../controllers/admin');
const auth=require('../middleware/auth');
router.post("/api/v1/auth/create-user",auth,admin.createUser);


module.exports=router;