const Pool=require("../controllers/database").Pool;

module.exports.getAll=(req,res,next)=>
{
    Pool.query("select gifid as \"id\",title,gifurl,employeeid ,createdon from gifs g union all select articleid,title,article, employeeId,createdon from articles order by createdon desc")
        .then(result=>{

            const view=[];
            result.rows.forEach((e)=>{view.push({id:e.id,createdOn:e.createdon,title:e.title,"article/url":e.gifurl,authorId:e.employeeid})});

            res.status(200).json({
                "status":"success",
                "data":view
            })

        }).catch(err=>{
            res.status(400).json({
                error:err
            })
    })
};