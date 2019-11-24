const Pool=require('./database').Pool;

module.exports.postGif=(req,res,next)=>
{
   
   let gifurl=req.file.url;
        const imageType='image/'+gifurl.substr(gifurl.lastIndexOf('.')+1);

        Pool.query('INSERT INTO gifs (title,gifurl,employeeid) VALUES ($1,$2,$3) RETURNING gifId,createdOn',[req.body.title,gifurl,req.body.userId])
            .then((result)=> {
                console.log(result.rows);
                const gifId = result.rows[0].gifid;
                const createdOn = result.rows[0].createdon;

                res.status(201).json(
                    {
                        status: "success",
                        data: {
                            gifId: gifId,
                            message: "Gif successfully posted",
                            imageURL:gifurl,
                            createdOn: createdOn,
                            title: req.body.title,
                        }
                    }
                );
            })
            .catch(error=>{
                res.status(400).json({error:error})
            }
        );


};

module.exports.updateGif=(req,res,next)=>
{

    Pool.query('UPDATE gifs SET title=$1, gifurl=$2 WHERE gifid=$3',
        [req.body.title,req.body.gifurl,req.params.gifId])
        .then((result)=> {

            console.log(result.rows);
            res.status(201).json(
                {
                    status: "success",
                    data: {
                        message: "Article successfully updated",
                        title: req.body.title,
                        gifURL:req.body.gifurl
                    }
                }
            );
        })
        .catch(error=>{
            res.status(400).json({error:error})
        })
};

module.exports.deleteGif=(req,res,next)=>
{

    Pool.query('DELETE FROM gifs  WHERE gifid=$1 RETURNING gifid',
        [req.params.articleId])
        .then((result)=> {

            res.status(200).json(
                {
                    status: "success",
                    data: {
                        message: "Gif successfully deleted",
                        gifID:req.params.gifId
                    }
                }
            );
        })
        .catch(error=>{
            res.status(400).json({error:error})
        })
};
module.exports.getGif=(req,res,next)=>
{

    Pool.query('Select ar.gifid,ar.title,ar.createdon, ar.gifurl,ac.comment,ac.employeeid,ac.commentid  FROM gifs ar  INNER JOIN gifcomments ac on ac.gifid=$1 and ar.gifid=$1', [req.params.gifId])
        .then((result)=> {
            let queryResult = result.rows[0];
            console.log(queryResult);
            const view=[];
            result.rows.forEach((e)=>{view.push({commentId:e.commentid,comment:e.comment,authorId:e.employeeid})});

            console.log("Print out view ");
            console.log(queryResult.gifid);
            console.log(queryResult.createdon);
            console.log(queryResult.title);
            console.log(queryResult.gifurl);
            res.status(200).json(
                {
                    status: "success",
                    data: {
                        id: queryResult.gifid,
                        createdOn: queryResult.createdon,
                        title: queryResult.title,
                        gifURL: queryResult.gifurl,
                        comments:view
                    }
                }
            );
        })
        .catch(error=>{
            res.status(400).json({status:"error",error:error});
        })
};