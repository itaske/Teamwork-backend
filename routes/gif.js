const router=require('express').Router();
const auth=require("../middleware/auth");
const gif=require("../controllers/gif");
const multer=require("../middleware/multer-config");

router.post("/",auth,multer,gif.postGif);

router.patch("/:gifId",auth,multer,gif.updateGif);

router.delete("/:gifId",auth,multer,gif.deleteGif);

router.get("/:gifId",auth,multer,gif.getGif);

module.exports=router;