 const mongoose = require('mongoose');
 const dotenv = require('dotenv');
 dotenv.config({path:'./config.env'});
 const app = require('./app');

dotenv.config({path:'./config.env'});

const DB = process.env.DATABASE.replace('<password>',
    process.env.DATABASE_PASSWORD
);
mongoose.connect(DB,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false
}).then(con=>
    {
      console.log(con.connection);
      console.log('DB connection successful!');  
    }
)

//  console.log(process.env);

const port =process.env.PORT ||3001;
app.listen(port,()=>{
    console.log(`app is running on ${port}...`);
});