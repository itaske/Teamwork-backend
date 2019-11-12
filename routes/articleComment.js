const router = require('express').Router();
const articleComment=require("../controllers/articleComment");
const auth=require("../middleware/auth");

router.post("/api/v1/articles/:articleId/comment",auth,articleComment.createComment);


module.exports=router;