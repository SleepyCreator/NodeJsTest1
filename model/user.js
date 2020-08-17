const app = require('../app');
var bcrypt = require('bcrypt');
r = require('rethinkdb')
conn = r.connect()
r.connect({ host: 'localhost', port: 28015 }, function(err, conn) {
    if (err) throw err;
})

//     r.db('blog').tableCreate('User').run(conn, function(err, res) {
//         if (err) throw err;
//         console.log(res);
//     });
// });