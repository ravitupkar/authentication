const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const appconstants = require('./config/appconstants');
const usersRouter = require('./routes/usersRouter');

mongoose.set('useCreateIndex', true);

mongoose.connect(appconstants.mongodbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => {
     console.log(`database connect  ${appconstants.mongodbUrl}`); 
})
.catch((err) => { console.log(`database connection ${err}`); }
);

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended : false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', usersRouter);

app.get('/', (req, res, next)=>{
    res.json('app home');
});

app.listen(PORT, ()=>{
    console.log(`app start on port ${PORT}`);
});
