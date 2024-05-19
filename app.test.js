const createApp = require('./app')
const request = require('supertest')
const validateUsername = require('./validation/validateUsername')
const validatePassword = require('./validation/validatePassword')

const app = createApp(validateUsername, validatePassword)

describe('given correct username and password', () => {
    test('return status 200', async () => {
        const response = await request(app).post('/users').send({
            username: 'Username',
            password: 'Password123'
        })
        expect(response.statusCode).toBe(200)
    })

    test('returns userId', async () => {
        const response = await request(app).post('/users').send({
            username: 'Username',
            password: 'Password123'
        })
        expect(response.body.userId).toBeDefined();
    })
})

describe('given incorrect or missing username and password', () => {
    test('return status 400', async () => {
        const response = await request(app).post('/users').send({
            username: 'user',
            password: 'password'
        })
        expect(response.statusCode).toBe(400)
    })
})
//username
describe('Username lower than 6 and longer than 30.  ', () => {
    test('Username is 6 to 30 long', async () => {
        const response = await request(app).post('/users').send({
            username: 'usern',
            password: 'password'
        })
        expect(response.statusCode).toBe(400)

        const response2 = await request(app).post('/users').send({
            username: 'usernamethatcontainsthirtyc',
            password: 'password'
        })
        expect(response2.statusCode).toBe(400)
    })

    test('return status 400, username contains only letters, number and periods', async () => {
        const response = await request(app).post('/users').send({
            username: 'userName123.user',
            password: 'Password123'
        })
        expect(response.statusCode).toBe(200)
    })

    test('return status 400, username contains only letters, number and periods', async () => {
        const response = await request(app).post('/users').send({
            username: 'userN"#¤ame123.user',
            password: 'Password123'
        })
        expect(response.statusCode).toBe(400)
    })
})


//password



