import express from 'express';

const app = express() // creates an instance of express 

const PORT = process.env.PORT || 3000; // port the proj will run from 

app.listen(PORT, err => {
  if (err) {
    throw err;
  } else { 
    console.log(`
    Server is running on port: ${PORT}
    --------
    Running on ${process.env.NODE_ENV}
    --------
    Let's get it 
    `)
  }
} )

