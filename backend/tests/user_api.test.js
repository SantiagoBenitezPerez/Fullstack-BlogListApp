const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user')
const request = require('supertest')
const app = require('../app')
const api = request(app)

describe('When there is initially one user, another user is not created when', () => {
    beforeEach( async () => {
        await User.deleteMany({})
        
        const passwordHash = await bcrypt.hash('rootpw', 10)
        const user = new User({name:"initial user", username: 'root', passwordHash})

        await user.save()
        
    }, 100000)

    test('username or password is not given', async () => {
       const usersAtFirst = await api.get('/api/users')
      
       const newUser = {
        username: 'userHasName',
        password: '',
       }

       const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)

       expect(result.body.error).toContain('username or password missing')
        

       const response = await api.get('/api/users')

       expect(response.body).toHaveLength(usersAtFirst.body.length)
    }, 100000)

    test.only('the username is not unique', async () => {
        const usersAtFirst = await api.get('/api/users')

        const newUser = await api
            .post('/api/users')
            .send({username: 'root', password: '12345'})
            .expect(400)
        expect(newUser.body.error).toContain('username already exists')

        const usersAtEnd = await api.get('/api/users')

        expect(usersAtEnd.body).toHaveLength(usersAtFirst.body.length)
    }, 100000)
   
})

afterAll(() => {
    mongoose.connection.close()
})