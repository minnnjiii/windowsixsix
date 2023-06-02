// (회원인증기능 3) 로그인 유저만 접속할 수 있는 페이지 만들기

const express = require('express'); // 라이브러리
const app = express(); // 객체 생성
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));
// npm install method-override
app.use('/public', express.static('public'));
const methodOverride = require('method-override')
app.use(methodOverride('_method'))


const MongoClient = require('mongodb').MongoClient;
app.set('view engin', 'ejs');



var db; 
MongoClient.connect('mongodb+srv://admin:ahffk1086@practice.vklalxa.mongodb.net/?retryWrites=true&w=majority',function(에러,client){
if (에러) return console.log(에러)
    db = client.db('todoapp');

    app.listen(8080, function () {
        console.log('listening on 8080')
  });
});


app.get('/',function(요청,응답){
    //응답.sendFile(__dirname + '/index.html')
    응답.render('index.ejs');
})


app.get('/write',function(요청,응답){
    //응답.sendFile(__dirname + '/write.html')
    응답.render('write.ejs');
})

app.post('/add', function(요청,응답){ // 누가 form에서 /add로 POST 요청하면 (요청.body)에 게시물 데이터 담겨옴
    응답.send('전송완료') 
    console.log(요청.body.title)
    console.log(요청.body.date)
    db.collection('counter').findOne({name : '게시물갯수'},function(에러, 결과){ //DB.counter 내의 총게시물갯수를 찾음
        console.log(결과.totalPost)
        var 총게시물갯수 = 결과.totalPost; // 총게시물갯수를 변수에 저장
        db.collection('post').insertOne({ _id : 총게시물갯수 +1, 제목 : 요청.body.title, 날짜 : 요청.body.date}, function(에러,결과){ // DB.post에 새 게시물을 기록함
            console.log('저장완료');
            // counter라는 콜렉션에 있는 totalPost라는 항목도 1 증가시켜야함 (수정);
            db.collection('counter').updateOne( {name : '게시물갯수' } , { $inc : { totalPost : 1 } } , function(에러, 결과){ //완료되면 DB.counter내의 총게시물갯수 +1
                if(에러){return console.log(에러)}
                console.log('수정완료')
            });
    });
   
    
});

});


app.get('/list', function(요청, 응답){
    db.collection('post').find().toArray(function(에러,결과){
      console.log(결과);
      응답.render('list.ejs', { posts : 결과});
    
    }); 
    
});

app.delete('/delete',function(요청,응답){
    console.log(요청.body)
    요청.body._id = parseInt(요청.body._id); // 요청.body내의 _id를 숫자로 변환시키자
    db.collection('post').deleteOne(요청.body,function(에러,결과){
        console.log('삭제완료')
        응답.status(200).send({message : '성공했습니다'}); // 성공했을때 응답코드 200 
    })
})


// URL의 파라미터로 여러가지 경로의 요청 한번에 처리하기
app.get('/detail/:id',function(요청,응답){
    db.collection('post').findOne({_id : parseInt(요청.params.id)}, function(에러, 결과){
        console.log(결과)
        //응답.render('detail.ejs', { 이런이름으로:이런데이터를 })
        응답.render('detail.ejs', { data : 결과 })
    })
        
})


app.get('/edit/:id', function(요청, 응답){
  db.collection('post').findOne({ _id : parseInt(요청.params.id) }, function(에러, 결과){
    console.log(결과)
    응답.render('edit.ejs', { post : 결과 })
  })
  
});


// updateOne(어떤게시물수정할건지,수정값,콜백함수)
app.put('/edit', function(요청, 응답){ 
    db.collection('post').updateOne( {_id : parseInt(요청.body.id) }, {$set : { 제목 : 
        요청.body.title , 날짜 : 요청.body.date }}, 
      function(에러,결과){ 
      
        console.log('수정완료') 
        응답.redirect('/list') 
    }); 
  }); 



// session 로그인 기능 구현
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
  
app.use(session({secret : '비밀코드', resave : true, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session()); 

// app.use(미들웨어)
// 웹서버는 요청-응답해주는 머신
// 미들웨어 : 요청-응답 중간에 실행되는 코드

app.get('/login',function(요청,응답){
    응답.render('login.ejs')
});

app.post('/login', passport.authenticate('local', {
    failureRedirect : '/fail'}), function(요청, 응답){
    응답.redirect('/mypage')
  });

//passport:로그인 기능을 구현해줌

//인증하는 방법을 starategy라고 함
// 사용자와 아이디의 비번을 검증하는 방법임
passport.use(new LocalStrategy({
    usernameField: 'id',
    passwordField: 'pw',
    session: true,
    passReqToCallback: false,
  }, function (입력한아이디, 입력한비번, done) {
    //console.log(입력한아이디, 입력한비번);
    db.collection('login').findOne({ id: 입력한아이디 }, function (에러, 결과) {
      if (에러) return done(에러)
  
      if (!결과) return done(null, false, { message: '존재하지않는 아이디요' })
      if (입력한비번 == 결과.pw) {
        return done(null, 결과)
      } else {
        return done(null, false, { message: '비번틀렸어요' })
      }
    })
  }));
//done(서버에러,성공시 사용자DB데이터,에러메시지)





// 마이페이지 만들고 라우팅하기
app.get('/mypage', 로그인했니, function (요청, 응답) { 
  console.log(요청.user); 
  응답.render('mypage.ejs') 
  }) 

//마이페이지 접속 전 미들웨어 실행시키기 (로그인했니)
function 로그인했니(요청, 응답, next) { 
  if (요청.user) { 
    next() 
  } 
  else { 
    응답.send('로그인안하셨는데요?') 
  } 
} 

//세션만들기
// serializeUser = 세션을 저장시키는 코드(로그인성공시발동)
passport.serializeUser(function (user, done) {
  done(null, user.id)
});

// 이 세션 데이터를 가진 사람을 DB에서 찾아달라는 코드
passport.deserializeUser(function (아이디, done) {
  db.collection('login').findOne({ id: 아이디 }, function (에러, 결과) {
    done(null, 결과)
  })
}); 