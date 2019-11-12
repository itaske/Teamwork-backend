
const Pool=require('./database').Pool;
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");


exports.createUser=  (req, res, next) => {
    let password;
     bcrypt.hash(req.body.password, 10).then(
        (hash) => {
            password = hash;
            let query = "INSERT INTO employees" +
                "(lastname,firstname,email,password,gender,jobrole,department,address)" +
                "VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING userId";
            Pool.query(query,[req.body.lastName,req.body.firstName,req.body.email,password,req.body.gender,req.body.jobRole,req.body.department,req.body.address])
                .then((result) => {
                    console.log(result);
                    const token=jwt.sign({userId:result.rows[0].userid},
                        "RANDOM_TOKEN_SECRET",
                        {expiresIn:'24h'});
                    res.status(201).json({
                        "status": "success",
                        "data":
                            {
                                "message": "User account successfully created",
                                "userId": result.rows[0].userid,
                                "token": token

                            }
                    })
                })
                .catch(error => {
                    console.log(error);
                    res.status(400).json({error: error});
                });

        }
    ).catch(error => {
         console.log(error);
         res.status(400).json({error: error});
     });

};

module.exports.loginUser=(req,res,next)=>
{
    Pool.query("Select * from employees as e where e.email=$1",[req.body.email])
        .then((result)=>{
            let user=result.rows[0];

            if(!user)
            {
                console.log("user not found");
               return res.status(401).json({error:new Error("User not Found! ")});

            }

            bcrypt.compare(req.body.password,user.password)
            .then((valid)=>{
                if(!valid)
                {
                    console.log("incorrect password");
                    return res.status(401).json({error:new Error("Incorrect Password! ")});

                }
                const token=jwt.sign({userId:user.userid},
                    "RANDOM_TOKEN_SECRET",
                    {expiresIn:'24h'});
                res.status(200).json(
                {
                    status:"success",
                    data:{
                        token:token,
                        userId:user.userid,
                        user:user
                    },
                });
            }).catch((err)=>res.status(500).json({error:err}))
            
        })
        .catch((err)=>res.status(500).json({error:err}))

};