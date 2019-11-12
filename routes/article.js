const router=require('express').Router();
const auth=require("../middleware/auth");
const article=require("../controllers/article");

router.post("/",auth,article.postArticle);

router.patch("/:articleId",auth,article.updateArticle);

router.delete("/:articleId",auth,article.deleteArticle);

router.get("/:articleId",auth,article.getArticle);

module.exports=router;