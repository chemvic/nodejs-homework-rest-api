// const  User  = require('../../models/user');
// const bcrypt =require('bcrypt');
// const jwt = require('jsonwebtoken');


// const express = require('express');
const  request = require('supertest');

const {login} = require('./login');

// const app = express();
// app.use(express.json())
const app = require('../../app');
app.post('/api/auth/login', login);

describe('login controller', () => {
  // let server;
  //   beforeAll(()=> server = app.listen(3000));
  //   afterAll(()=> server.close());

 

  test('should respond with status 200 and token', async () => {
    await request(app)
      .post('/api/auth/login')
      .send({  email: 'qwer@od.co', password: '111111'  });

    expect(200);
    // expect(response.body).toHaveProperty('token');
  }, 10000);

});

// describe("test login controller", ()=>{
//   let server;
//   beforeAll(()=> server = app.listen(3000));
//   afterAll(()=> server.close());

//     test("response with status 200", async ()=>{
//       const response = await request(app).post('/login')
//       .send({ email: 'qwer@od.co', password: '111111' });
//       expect(response.status).toBe(200);
//     }, 20000);

// })

