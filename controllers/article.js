const Pool=require('./database').Pool;


module.exports.postArticle=(req,res,next)=>
{
	Pool.query('INSERT INTO articles (title,article,employeeid) VALUES ($1,$2,$3) RETURNING articleId,createdOn',[req.body.title,req.body.article,req.body.userId])
        .then((result)=> {
            const articleId = result.rows[0].articleid;
            const createdOn = result.rows[0].createdon;

            console.log(articleId);
            console.log(createdOn);

            res.status(201).json(
                {
                    status: "success",
                    data: {
                        message: "Article successfully posted",
                        articleId: articleId,
                        createdOn: createdOn,
                        title: req.body.title,
                    }
                }
            );
        })
        .catch(error=>{
            res.status(400).json({error:error})
        })
};

module.exports.updateArticle=(req,res,next)=>
{

    Pool.query('UPDATE articles SET title=$1, article=$2 WHERE articleid=$3',
    [req.body.title,req.body.article,req.params.articleId])
    .then((result)=> {

        console.log(result.rows);
        res.status(201).json(
            {
                status: "success",
                data: {
                    message: "Article successfully updated",
                    title: req.body.title,
                    article:req.body.article
                }
            }
        );
    })
    .catch(error=>{
        res.status(400).json({error:error})
    })
};

module.exports.deleteArticle=(req,res,next)=>
{

    Pool.query('DELETE FROM articles  WHERE articleid=$1 RETURNING articleid',
        [req.params.articleId])
        .then((result)=> {

            res.status(200).json(
                {
                    status: "success",
                    data: {
                        message: "Article successfully deleted",
                        articleID:req.params.articleId
                    }
                }
            );
        })
        .catch(error=>{
            res.status(400).json({error:error})
        })
};

module.exports.getArticle=(req,res,next)=>
{

    Pool.query('Select ar.articleid,ar.title,ar.article,ac.comment,ar.createdon,ac.employeeid,ac.commentid FROM articles ar INNER JOIN articlecomments ac on ac.articleid=$1 and ar.articleid=$1', [req.params.articleId])
        .then((result)=> {
                    let queryResult = result.rows[0];
                    let view=[];
                    result.rows.forEach((e)=>{view.push({commentId:e.commentid,comment:e.comment,authorId:e.employeeid})});

                    console.log("Print out view ");
                    console.log(view);
                    console.log(queryResult.articleid);
                    console.log(queryResult.createdon);
                    console.log(queryResult.title);
                    console.log(queryResult.article);
                    res.status(200).json(
                        {
                            status: "success",
                            data: {
                                id: queryResult.articleid,
                                createdOn: queryResult.createdon,
                                title: queryResult.title,
                                article: queryResult.article,
                                comment: view
                            }
                        }
                    );
                })
        .catch(error=>{
           res.status(400).json({error:error})
        })
};