const Pool = require('pg').Pool;

 const pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'capstone-project',
        password: 'patrick',
        port: 5432,
    });

 const onlinePool=new Pool(
     {
         'host': 'ec2-174-129-253-146.compute-1.amazonaws.com',
         'database':'dbkq0hgohqgktt',
         'user':'yswbjfjfeblcbd',
         'port':5432,
         'password':'5150717752f3664a7902e87819307c843340dacaf252b531d135041ca4cd6012',
         'URI':'postgres://yswbjfjfeblcbd:5150717752f3664a7902e87819307c843340dacaf252b531d135041ca4cd6012@ec2-174-129-253-146.compute-1.amazonaws.com:5432/dbkq0hgohqgktt',
         'ssl':true,
         'sslmode':"require"
     });


module.exports.Pool=onlinePool;


