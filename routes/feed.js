const router = require('express').Router();
const feed=require("../controllers/feed");
const auth=require("../middleware/auth");

router.get("/api/v1/feed",auth,feed.getAll);


module.exports=router;