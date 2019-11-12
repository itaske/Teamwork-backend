const Pool=require("./database").Pool;


module.exports.createComment=(req,res,next)=>
{

    Pool.query("INSERT INTO articlecomments (comment,articleid,employeeid) VALUES($1,$2,$3)",[req.body.comment,req.params.articleId,req.body.userId])
        .then((result)=>{

            Pool.query(" SELECT * FROM articles where articleid=$1",[req.params.articleId])
                .then((result)=>{
                    const queryReply=result.rows[0];
                    const article=queryReply.article;
                    const createdOn=queryReply.createdon;
                    const articleTitle=queryReply.title;
                    res.status(201).json({
                        "status":"success",
                        "data":{
                            "message":"Comment successfully created",
                            "createOn": createdOn,
                            "articleTitle":articleTitle,
                            "article":article,
                            "comment":req.body.comment
                        }

                    });


                })
                .catch(error=>{
                    console.log(error);
                    res.status(400).json({error:error});
                })

        })
        .catch(error=>{
            console.log(error);
            res.status(400).json({error:error});
        })
};
