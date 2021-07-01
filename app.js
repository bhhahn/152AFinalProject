const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const ejs = require('ejs');
//const layouts = require('express-ejs-layouts');

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://BenHahn:12345QWERTY@cluster.ejjuv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

var nodemailer = require('nodemailer');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we are connected!!!")
});


//const authRouter = require('./routes/auth');
//const isLoggedIn = authRouter.isLoggedIn
//const loggingRouter = require('./routes/logging');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');


const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/index', (req,res)=>{
  res.render('index')
})

const Bike = require('./models/Bike.js')

app.get('/Biking',
  async (req,res,next) => {
    res.locals.bikes = await Bike.find({})
    res.render('Biking')
  }
)

app.post('/bikingLog',
  async (req,res,next) => {

    const bikedata = {
      date:req.body.date,
      startedAt: req.body.startedAt,
      completedAt: req.body.completedAt,
      distance:req.body.distance,
    }
    const newBike = new Bike(bikedata)
    await newBike.save()

    res.redirect('/Biking')
  }
)

app.get('/Biking/clear',
  async (req,res,next) => {
    await Bike.deleteMany({})
    res.redirect('/Biking')
  }
)

const Run = require('./models/Run.js')

app.get('/Running',
  async (req,res,next) => {
    res.locals.runs = await Run.find({})
    res.render('Running')
  }
)


app.post('/runningLog',
  async (req,res,next) => {

    const rundata = {
      date:req.body.date,
      distance: req.body.distance,
      time: req.body.time,
      rep:req.body.rep,
      reps:req.body.reps
    }
    const newRun = new Run(rundata)
    await newRun.save()

    res.redirect('/Running')
  }
)

app.get('/Running/clear',
  async (req,res,next) => {
    await Run.deleteMany({})
    res.redirect('/Running')
  }
)

const Swim = require('./models/Swim.js')

app.get('/Swimming',
  async (req,res,next) => {
    res.locals.swims = await Swim.find({})
    res.render('Swimming')
  }
)

app.post('/swimmingLog',
  async (req,res,next) => {

    const swimdata = {
      date:req.body.date,
      distance: req.body.distance,
      time: req.body.time,
      rep:req.body.rep,
      reps:req.body.reps
    }
    const newSwim = new Swim(swimdata)
    await newSwim.save()

    res.redirect('/Swimming')
  }
)

app.get('/Swimming/clear',
  async (req,res,next) => {
    await Swim.deleteMany({})
    res.redirect('/Swimming')
  }
)

const Lift = require('./models/Lift.js')

app.get('/Weights',
  async (req,res,next) => {
    res.locals.lifts = await Lift.find({})
    res.render('Weights')
  }
)

app.post('/liftingLog',
  async (req,res,next) => {

    const liftdata = {
      date:req.body.date,
      exercise: req.body.exercise,
      weight: req.body.weight,
      reps:req.body.reps
    }
    const newLift = new Lift(liftdata)
    await newLift.save()

    res.redirect('/Weights')
  }
)

app.get('/Weights/clear',
  async (req,res,next) => {
    await Lift.deleteMany({})
    res.redirect('/Weights')
  }
)

const Custom = require('./models/CustomWork.js')

app.get('/CreateYOwn',
  async (req,res,next) => {
    res.locals.customs = await Custom.find({})
    res.render('CreateYOwn')
  }
)

app.post('/customLog',
  async (req,res,next) => {

    const customdata = {
      date:req.body.date,
      exercise: req.body.exercise,
      weight: req.body.time,
      reps:req.body.reps
    }
    const newCustom = new Custom(customdata)
    await newCustom.save()

    res.redirect('/CreateYOwn')
  }
)

app.get('/CreateYOwn/clear',
  async (req,res,next) => {
    await Custom.deleteMany({})
    res.redirect('/CreateYOwn')
  }
)

app.get('/Export',
  async (req,res,next) => {
    res.render('Export')
  }
)

app.post('/exportLog', function(req, res, next) {
  const transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
      user: 'workoutapp152A@outlook.com',
      pass: 'this is a burner email 152'
    }
  })
  o = {};
  Run.find({}).then((runs) => {
     o.runs = runs; Swim.find({}).then((swims) => {
        o.swims = swims; Bike.find({}).then((bikes) => {
           o.bikes = bikes; Lift.find({}).then((lifts) => {
             o.lifts = lifts; Custom.find({}).then((customs) => {
  // at this point o has everything
  // build message

  const workoutMail = {
    from: `workoutapp152A@outlook.com`,
    to: `${req.body.email}`,
    subject: 'Your Workouts',
    html: ejs.render(`<p>Your workouts:<p> <br>
      <table> <tbody> <% runs.forEach(item => {%> <tr> <td>Run</td> <td><%= item.date%></td><td><%= item.distance %></td><td><%= item.time%></td><td><%= item.reps%></td></tr><% }) %></tbody> </table>
      <table> <tbody> <% swims.forEach(item => {%> <tr> <td>Swim</td> <td><%= item.date%></td><td><%= item.distance %></td><td><%= item.time%></td><td><%= item.reps%></td></tr><% }) %></tbody> </table>
      <table> <tbody> <% bikes.forEach(item => {%> <tr> <td>Bike</td> <td><%= item.date%></td><td><%= item.distance %></td><td><%= item.startedAt%></td><td><%= item.completedAt%></td></tr><% }) %></tbody> </table>
      <table> <tbody> <% lifts.forEach(item => {%> <tr> <td>Lift</td> <td><%= item.date%></td><td><%= item.exercise %></td><td><%= item.weight%></td><td><%= item.reps%></td></tr><% }) %></tbody> </table>
      <table> <tbody> <% customs.forEach(item => {%> <tr> <td>Custom</td> <td><%= item.date%></td><td><%= item.exercise %></td><td><%= item.reps%></td></tr><% }) %></tbody> </table>
      `, o),
    replyTo: `workoutapp152A@outlook.com`
  }
  transporter.sendMail(workoutMail, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  })
}).catch((error) => {console.log("run find promise rejected " + error)})}).catch()}).catch()}).catch()})
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
