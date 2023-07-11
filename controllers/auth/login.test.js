const  request = require('supertest');

const {login} = require('./login');

const app = require('../../app');
app.post('/api/auth/login', login);

describe ('login controller', () => {

  test ('response with status 200', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({  email: 'qwer@od.co', password: '111111'  });
      
       expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

});

