var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

// why this function doesn't console.log anything?
router.use('/testUser', function(req, res, next) {
    console.log('sth in here: ' + Date.now());
    next();
});
router.get('/testUser', function(req, res, next) {
    res.send('test');
    //console.log('sth')
    //next()
});

module.exports = router;