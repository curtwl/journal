const User = require('../models/user')
const Entry = require('../models/entry')
const bcrypt = require('bcrypt')

let user
async function createUser() {
    passwordHash = await bcrypt.hash('testpw', 10)
    user = new User({
      username: 'testuser',
      passwordHash,
    })
    await user.save()
    return user
}

const publicEntries = [
  {
    title: 'Entry 1',
    content: 'content of entry 1',
    author: '64cc30a93444ce26063f88a6',
    public: true,
  },
  {
    title: 'Entry 2',
    content: 'content of entry 2',
    author: '64cc30a93444ce26063f88a6',
    public: true,
  },
  {
    title: 'Entry 3',
    content: 'content of entry 3',
    author: '64cc30a93444ce26063f88a6',
    public: false,
  }
]
  
module.exports = {
  createUser, publicEntries
}