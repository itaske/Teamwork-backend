const Pool=require("./database").Pool;


module.exports.createComment=(req,res,next)=>
{

    Pool.query("INSERT INTO gifcomments (comment,gifid,employeeid) VALUES($1,$2,$3)",[req.body.comment,req.params.gifId,req.body.userId])
        .then((result)=>{

            Pool.query(" SELECT * FROM gifs where gifid=$1",[req.params.gifId])
                .then((result)=>{
                    const queryReply=result.rows[0];
                    const gifURL=queryReply.gifURL;
                    const createdOn=queryReply.createdon;
                    const gifTitle=queryReply.title;
                    res.status(201).json({
                        "status":"success",
                        "data":{
                            "message":"Comment successfully created",
                            "createOn": createdOn,
                            "gifTitle":gifTitle,
                            "gifURL":gifURL,
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
