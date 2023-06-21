const supertest = require('supertest')

const app = require('../app')
const Book = require('../models/Book')
const { default: mongoose } = require('mongoose')

const api = supertest(app)


let token = ''

beforeAll(async () => {
    await Book.deleteMany()
    await Book.create({
        title: "War and Peace",
        author: "Leo Tolstoy"
    })

    await api.post('/users/register')
        .send({
            username: "testUser2",
            password: "test123",
            fullname: "Test User",
            email: "test@gmail.com"
        })

    const res = await api.post('/users/login')
        .send({
            username: "testUser2",
            password: "test123"
        })
    console.log(res.body)
    token = res.body.token
})

afterAll(async () => await mongoose.connection.close())

test('loggin user can get list of books', async () => {
    // .expect(true).toBe(true)

    const res = await api.get('/books')
        .set('authorization', `bearer ${token}`)
        .expect(200)

    // console.log(res.body)
    expect(res.body[0].title.toMatch(/War/))

})
