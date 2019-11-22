const multer=require('multer');
const cloudinary=require('../controllers/image/cloudinary');

const cloudinaryStorage = require('multer-storage-cloudinary');
const MIME_TYPES=
    {
        'image/jpg':"jpg",
        'image/jpeg':'jpg',
        'image/png':'png'
    };
const storage = cloudinaryStorage({
    cloudinary,
    folder: 'Teamwork',
    allowedFormats: ['jpg', 'png'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }]
});

/*

const storage=multer.diskStorage({
        destination:(req,file,callback)=>
        {
            console.log("inside destination");
           //cloudinary.uploader.direct_upload(file,function(error,result){
              // console.log(result);

           //});
            callback(null,'images');
        },
        filename:(req,file,callback)=>
        {
            console.log("inside filename");
            const name=file.originalname.split(' ').join("_");
            const extension=MIME_TYPES[file.mimetype];
            callback(null,name+Date.now()+'.'+extension);
        }
    }
);
*/
//const storage=multer.memoryStorage();
module.exports=multer({storage:storage}).single('image');