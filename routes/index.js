var express = require('express');
var router = express.Router();
var Movie =require('../models/movies')

router.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Expose-Headers", "*");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json");
    next();
});
/* GET home page. */
router.get('/',function(req,res,next){
	res.render('index',{title: "Express"})
});
router.get('/api/getAll', function(req, res, next) {
  // res.render('index', { title: 'Express' });


  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  
  Movie.find({}).sort({update_at: -1}).then(movies =>{
  	// res.json(movies);
  	// res.render('index',{title: JSON.stringify(movies)})
  	// res.render('index',{result: JSON.stringify(movies)});
  	// res.json(JSON.stringify(movies))

  	res.json({result:movies})
  })
  .catch(err =>{
  	res.json(err)
  })
});
router.get('/newAdd', function(req, res, next) {
  res.render('newAdd', { title: 'newAdd' });
});
router.post('/new_post',function(req,res){
	console.log(req.originalUrl);
	console.log(req.url);
	console.log(req.body);
	Movie.create(req.body,(err,movie) =>{
		if (err) {
			res.json(err)
		}else{
			console.log('new success');
			res.json(movie)
			// res.redirect('/');
		}
	})
})


module.exports = router;
