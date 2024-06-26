const express = require('express');
const fs= require('fs');
const morgan = require('morgan');

const app = express();
// middlewares
app.use(morgan('dev'));
app.use(express.json());

app.use((req,res,next)=>{
    console.log('hello from the middeleware');
    next();

});
app.use((req,res,next)=>{
    req.requestTime = new Date().toISOString();
    next();
})

// app.get('/',(req,res)=>{
//     // res.status(200).send('hello form the server ');
//     res.status(200).json({message :'hello form the server ',
//         app:'nature'
//     });
 


// })


const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
) ;  

const getAllTours =(req,res)=>{
    console.log(req.requestTime);
   
  res.status(200).json({
      status:'success',
      result:tours.length,
      data:{
       
        tours:tours
      } 
    });
};
const getTour =(req,res)=>{
    console.log(req.param);
    const id = req.params.id*1;
    if(id>tours.length){
        return res.status(404).json({
            status:'fail',
            message:'invalid ID'

        });
    }

    const particularTour = tours.find(el=>el.id ===id)

    res.status(200).json({
      status:'success',
      result:particularTour.length,
   
      data:{
        tours:particularTour
        
      } 
    });
};
const createTour =(req,res)=>{
    const newId = tours[tours.length -1].id+1;
    const newTour = Object.assign({id:newId},req.body);
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours),
    err=>{
        res.status(201).json({
            status:'success',
            data :{
                tour:newTour
            }
        })

    })
};
const updateTour =(req,res)=>{
    if(req.params.id*1>tours.length){
        return res.status(404).json({
            status:'fail',
            message:'invalid ID'

        });
    }
    
    res.status(200).json({
        status:'success',
        data:{
            tour:'updated tour here ...'
        }
    })


}
const deleteTour =(req,res)=>{
    if(req.params.id*1>tours.length){
        return res.status(404).json({
            status:'fail',
            message:'invalid ID'

        });
    }
    
    res.status(204).json({
        status:'success',
        data:null
            
        
    });


};




const getAllUser=(req,res)=>{
    res.status(500).json({
        status:'error',
        message:'this rouste is not yet defined'
    });
};
const createUser=(req,res)=>{
    res.status(500).json({
        status:'error',
        message:'this rouste is not yet defined'
    });
};
const getUser=(req,res)=>{
    res.status(500).json({
        status:'error',
        message:'this rouste is not yet defined'
    });
};
const updateUser=(req,res)=>{
    res.status(500).json({
        status:'error',
        message:'this rouste is not yet defined'
    });
};
const deleteUser=(req,res)=>{
    res.status(500).json({
        status:'error',
        message:'this rouste is not yet defined'
    });
};



// app.get('/api/v1/tours/',getAllTours);
// app.get('/api/v1/tours/:id',getTour);
// app.post('/api/v1/tours',createTour);
// app.patch('/api/v1/tours/:id',updateTour) ;
// app.delete('/api/v1/tours/:id',deleteTour) ;

////////other methard///////////////

const tourRouter = express.Router();
const userRouter = express.Router();
tourRouter
.route('/')
.get(getAllTours)
.post(createTour)


tourRouter
.route('/:id')
.get(getTour)
.patch(updateTour)
.delete(deleteTour)

userRouter
.route('/')
.get(getAllUser)
.post(createUser)


userRouter
.route('/:id')
.get(getUser)
.patch(updateUser)
.delete(deleteUser)

app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/users',userRouter);

const port =3001;
app.listen(port,()=>{
    console.log(`app is running on ${port}...`);
});
