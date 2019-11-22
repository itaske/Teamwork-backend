const router = require('express').Router();
const gifComment=require("../controllers/gifComment");
const auth=require("../middleware/auth");

router.post("/api/v1/gifs/:gifId/comment",auth,gifComment.createComment);


module.exports=router;