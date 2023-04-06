const express=require('express');
const app=express();
const path=require('path');
const mongoose=require('mongoose');
const ejsMate=require('ejs-mate');
const methodOverride=require('method-override');
const session=require('express-session');
const flash=require('connect-flash')
const passport=require('passport');
const LocalStrategy=require('passport-local');
const user=require('./models/user');

app.engine('ejs',ejsMate);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie:{
        httpOnly:true,
        expires:Date.now+1000*60*60*24*7*1,
        maxAge:1000*60*60*24*7*1,
    }
  }))
app.use(flash());

//initializing the middleware for passport
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

//Telling the passport to check for username and password usinf authenticate method provide by the passport-local-mongoose package
passport.use(new LocalStrategy(user.authenticate()));

app.use((req,res,next)=>{
    res.locals.currentUser=req.user;
    res.locals.success=req.flash('success');
    res.locals.error=req.flash('error');
    next();
})


//Routes
const productRoutes=require('./routes/product');
const reviewRoutes=require('./routes/reviews');
const authRoutes=require('./routes/auth');
const cartRoutes = require('./routes/cart');

app.use(productRoutes);
app.use(reviewRoutes);
app.use(authRoutes);
app.use(cartRoutes);


mongoose.connect('mongodb://127.0.0.1:27017/shopping-app')
.then(()=>console.log('Db connected'))
.catch((err)=>console.log('Something went wrong'))








app.listen(3000,()=>{
    console.log('Server is running at port 3000');
});