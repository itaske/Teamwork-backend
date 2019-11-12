const Pool = require('pg').Pool;

 const pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'capstone-project',
        password: 'patrick',
        port: 5432,
    });


module.exports.Pool=pool;


