var express = require('express');
var bcrypt = require('bcrypt');
var User = require('../model/user');
var middleware = require('../express/middleware');
const app = require('../app');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/register', function(req, res, next) {
    res.render('register');

});
router.post('/confirm', function(req, res, next) {
    if (req.body.name && req.body.pass) {
        var userData = {
            name: req.body.name,
            pass: req.body.pass
        }
        bcrypt.hash(userData.pass, 10, function(err, hash) {
            if (err) {
                return next(err);
            }
            userData.pass = hash;
            r.connect({ host: 'localhost', port: 28015 }, function(err, conn) {
                if (err) throw err;
                console.log(res);
                r.db('projects').table('User').insert([{
                    name: userData.name,
                    password: userData.pass
                }]).run(conn, function(err, res) {
                    if (err) throw err;
                    console.log(res);
                });
            });
        })
    }
    res.redirect('/');
})
router.get('/login', function(req, res, next) {
    res.render('login');
});

function writeSession(req, res, next) {
    req.session.userId = obj[0].id;
}
var write = [writeSession]
var obj;
router.post('/confirmLogin', function(req, res, next) {
    if (req.body.name && req.body.pass) {
        var userData = {
            name: req.body.name,
            pass: req.body.pass
        }

        r.connect({ host: 'localhost', port: 28015 }, function(err, conn) {
            if (err) throw err;
            console.log(res);
            r.db('projects').table('User').filter(r.row('name').eq(userData.name)).run(conn, function(err, cursor) {
                if (err) throw err;
                var dataCheck = '{}';
                cursor.toArray(function(err, result) {
                    if (err) throw err;
                    dataCheck = JSON.stringify(result, null, 2);
                    obj = JSON.parse(dataCheck);
                    cursor.close()
                    if (obj[0] == null) {
                        console.log('khong co acc');
                        return next(err);
                    } else {
                        bcrypt.compare(userData.pass, obj[0].password, function(err, isMatch) {
                            if (err) throw err;
                            if (isMatch) {
                                req.session.userId = obj[0].id;
                                console.log('correct password!')
                                res.redirect('profile')
                            } else {
                                console.log('failllllllllllll')
                                return next(err);
                            }
                        })
                    }
                });
            });
        });

    }
})


function requiresLogin(req, res, next) {
    if (req.session && req.session.userId) {
        return next();
    } else {
        var err = new Error('You must be logged in to view this page.');
        err.status = 401;
        return next(err);
    }
}
var logStuff = [requiresLogin]
router.get('/profile', logStuff, function(req, res, next) {
    res.render('profile');
});
router.get('/get_session', (req, res) => {
    //check session
    return res.status(200).json({ status: 'success', session: req.session.userId, session1: req.session })

});
// // why this function doesn't console.log anything?
// router.use('/testUser', function(req, res, next) {
//     console.log('sth in here: ' + Date.now());
//     next();
// });
// router.get('/testUser', function(req, res, next) {
//     res.send('test');
//     //console.log('sth')
//     //next()
// });

module.exports = router;