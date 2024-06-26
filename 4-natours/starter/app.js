const express = require('express');
const fs= require('fs');
const app = express();
app.use(express.json());
// app.get('/',(req,res)=>{
//     // res.status(200).send('hello form the server ');
//     res.status(200).json({message :'hello form the server ',
//         app:'nature'
//     });
 


// })

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
) ;  
app.get('/api/v1/tours/:id',(req,res)=>{
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
    //   result:tours.length,
      data:{
        tours:particularTour
        // tours:tours
      } 
    });
})
app.post('/api/v1/tours',(req,res)=>{
    // console.log(req.body);
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
    // res.send('Done')

})


const port =3001;
app.listen(port,()=>{
    console.log(`app is running on ${port}...`);
});
