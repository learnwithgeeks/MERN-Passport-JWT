//Importing Libraries
const express = require('express'),
      mongoose = require('mongoose'),
      schema=mongoose.Schema,
      passport = require('passport'),
      JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt,
      jwt = require('jsonwebtoken'),      
      cors = require('cors'),
      bodyParser = require('body-parser'),
      bcrypt = require('bcrypt-nodejs');
const app = express();


//Database Connection
mongoose.connect('mongodb://localhost:27017',function(err){
    if(err){console.log(err);}
    else{console.log('DATABASE CONNECTED')}
})


//Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var corsOption = {
    origin:true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption))
app.use(passport.initialize())

//User Model
const userModel = new schema({
    username:{type:String,unique:true,lowercase:true},
    password:String
})

//Password Encrption
userModel.pre('save',function(next){
    const user=this;

    bcrypt.genSalt(10,function(err,salt){
        // this adds salting of 10 extra characters in password
        if(err){
            return next(err);
        }
        bcrypt.hash(user.password,salt,null,function(err,hash){
            if(err){
                return next(err);
            }
            user.password=hash;
            next();
        })
    })
})

//Export User Model
const User = mongoose.model('userModel',userModel);

//JWT Passport Strategy
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
       User.findById(jwt_payload.id).then(user => {
          if (user) {
             return done(null, user);
          }
          return done(null, false);
       })
       .catch(err => console.log(err));
    })
 );


//API Login User
app.post('/login', (req, res) => {
      // Find user by username
      User.findOne({username: req.body.username }).then(user => {
         // Check for user
         if (!user) {
            res.json({
               confirmation : false,
               error: "user not found"
            });
         }
         else{
            bcrypt.compare(req.body.password, user.password, function (err, isMatch) {
               if (isMatch) {
                  // User Matched
                  const payload = {id: user._id}; // Create JWT Payload
         
                  // Sign Token
                  jwt.sign(
                     payload,
                     'secret',
                     { expiresIn: 3600 },
                     (err, token) => {
                        res.json({
                           confirmation : true,
                           token : 'Bearer ' + token,
                           userData : user
                        });
                     }
                  );
               } 
               else {
                  res.json({
                     confirmation : false,
                     error: "password not match"
                  });
               }
            }); 
         }
      });
   });

//API Signup User
app.post('/signup',(req,res) =>
{
    User.findOne({username: req.body.username }).then(user => {
        if(user) {
           res.json({
              "confirmation" : false,
              error: "username already exist"
           });
        }
        else{
              let user = new User();
              user.username = req.body.username;
              user.password = req.body.password;        
     
              user.save((err,user) => {
                 if(err){console.error("Error: ", err)}
                 else{
                    res.json({confirmation: true});
                 }
              })
        }
     });
});

app.get('/getUserData',passport.authenticate('jwt', { session: false }),(req, res) => {
    res.json({
       userData: req.user
    });
});

app.get('/getAllUsers',passport.authenticate('jwt', { session: false }),(req,res)=>{
    User.find({},function(err,users){
       res.send(users);
    })
});

app.listen(9000,(err) => 
{
    if (err) console.log(err);
    else console.log('Server is connected on port 9000');
})