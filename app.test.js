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

describe('password check', () => {
    test('Password has to be at least 8 characters long.', async () => {
        const response = await request(app).post('/users').send({
            username: 'Username',
            password: 'Pass'
        })
        expect(response.statusCode).toBe(400)

    })

    test('Password should contain at least one lowercase and one uppercase letter.', async () => {
        const response = await request(app).post('/users').send({
            username: 'Username',
            password: 'password123'
        })
        expect(response.statusCode).toBe(400)
        const response2 = await request(app).post('/users').send({
            username: 'Username',
            password: 'PASSWORD123'
        })
        expect(response2.statusCode).toBe(400)
        const response3 = await request(app).post('/users').send({
            username: 'Username',
            password: 'Password123'
        })
        expect(response3.statusCode).toBe(200)

    })


    test('Password should contain at least one number.', async () => {
        const response = await request(app).post('/users').send({
            username: 'Username',
            password: 'Password123'
        })
        expect(response.statusCode).toBe(200)
        const response2 = await request(app).post('/users').send({
            username: 'Username',
            password: 'Password'
        })
        expect(response2.statusCode).toBe(400)

    })


    test('Password should not contain any special characters.', async () => {
        const response = await request(app).post('/users').send({
            username: 'Username',
            password: 'Password123'
        })
        expect(response.statusCode).toBe(200)
        const response2 = await request(app).post('/users').send({
            username: 'Username',
            password: 'Passw$#ord123'
        })
        expect(response2.statusCode).toBe(400)

    })
})

