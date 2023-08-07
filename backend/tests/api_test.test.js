const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const jwt = require('jsonwebtoken')

const User = require('../models/user')
const Entry = require('../models/entry')

describe('when a user with a valid cookie GETs entries', () => {
  let token

  beforeAll(async () => {
    await Entry.deleteMany({})
    await User.deleteMany({})
    const user = await helper.createUser()

    const entry = new Entry({
        title: 'Lorem Ipsum Titulus',
        content: 'lorem ipsum contentus',
        author: user._id,
        public: true,
    })

    await entry.save()

    token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET)
  })

  test('entries are returned as json', async () => {
    const response = await api
      .get('/api/entries')
      .set('Cookie', `userCookie=${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('the entry created by the user is returned', async () => {
    const response = await api
      .get('/api/entries')
      .set('Cookie', `userCookie=${token}`)
      .expect(200)
    
    expect(response.body).toHaveLength(1)
    expect(response.body[0].title).toBe('Lorem Ipsum Titulus')
    expect(response.body[0].content).toBe('lorem ipsum contentus')
  })
})

describe('when a user without a valid cookie GETs entries', () => {
  let publicEntries

  beforeEach(async () => {
    await Entry.deleteMany({})
    publicEntries = await Entry.insertMany(helper.publicEntries)
  })

  test('entries are returned as json', async () => {
    await api
      .get('/api/entries')
      .expect('Content-Type', /application\/json/)
      .expect(200)
  })

  test('returns only public entries', async () => {
    await api
      .get('/api/entries')
      .expect('Content-Type', /application\/json/)
      .expect(200)
      .expect((response) => {
        expect(response.body).toHaveLength(2)
        for (let i = 0; i < publicEntries.length - 1; i++) {
          expect(response.body[i].title).toEqual(publicEntries[i].title)
          expect(response.body[i].content).toEqual(publicEntries[i].content)
          expect(response.body[i].author).toEqual(publicEntries[i].author.toString())
          expect(response.body[i].public).toEqual(true)
        }
      })
  })
})

afterAll(async () => {
    await mongoose.connection.close()
  })