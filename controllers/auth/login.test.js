const  User  = require('../../models/user');
const bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken');

const { ctrlWrapper, HttpError} = require('../../helpers');
const {SECRET_KEY}=process.env;

const express = require('express');
const  request = require('supertest');
const {login} = require('./login');

const app = express();
// const server =app.listen(3000);
app.post('./login', login);

describe("test login controller", ()=>{
    beforeAll(()=>app.listen(3000));
    // afterAll(()=>app.close());

    test("response with status 200", async ()=>{
      const response = await request(app).post('/login', {email:"qwer@od.co", password: "111111"});
      expect(response.status).toBe(200);
    })

})

