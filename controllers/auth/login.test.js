const  request = require('supertest');
const mongoose = require('mongoose');
const {login} = require('./login');
const app = require('../../app');
const { DB_HOST }=process.env;

mongoose.set('strictQuery', true);
app.post('/api/users/login', login);

describe ('login controller', function() {

beforeAll( async() => {


 await mongoose.connect(DB_HOST)
    .then(()=>{ 
    app.listen(3000);
    console.log("Database connection successful");
  })
    .catch(error=>{
      console.log(error.message);
      process.exit(1);
  });
});


afterAll( async() => {
await mongoose.disconnect(DB_HOST);
console.log(" DB disconnected");
});

  test ('response with status 200 and token', async () => {    
    
    const response = await request(app)
      .post('/api/users/login')
      .send({  email: 'qwer@od.co', password: '111111'  })
          
       expect(response.status).toBe(200);
       expect(response.body).toHaveProperty('token');

  });
  test ('response with object user includes email and subscription Strings', async () => {
    
    
    const response = await request(app)
      .post('/api/users/login')
      .send({  email: 'qwer@od.co', password: '111111'  })
            
       expect(response.body).toMatchObject(
        {user:
          {
            email: expect.any(String),
            subscription: expect.any(String)
          }
        });  
  });

});

