const bcrypt = require('bcrypt')
  const usersRouter = require('express').Router()
  const User = require('../models/user')

function regTest(string) { //[^ == not
  var regex = /[^0-9A-Za-z!@#$%&*()_\-+={[}\]|\:;"'<,>.?\/\\~`]/g
    return !regex.test(string); //false if found
}

usersRouter.get('/', async(request, response) => {
  const users = await User.find({}).populate('blogs', {
      title: 1,
      author: 1,
      url: 1,
      likes: 1
    })
    response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async(request, response, next) => {
  try {
    const body = request.body
      if (body.password.length < 3) {
        return response.status(400).json({
          error: 'At least 3 characters are needed!'
        })
      }
      
	  const regex = /[^0-9A-Za-z!@#$%&*()_\-+={[}\]|\:;"'<,>.?\/\\~`]/g
      if (regex.test(body.password)) {
        return response.status(400).json({
          error: 'Illegal characters in password!'
        })
      }

      const saltRounds = 10
      const passwordHash = await bcrypt.hash(body.password, saltRounds)

      const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
      })

      const savedUser = await user.save()

      response.json(savedUser)
  } catch (exception) {
    next(exception)
  }
})

usersRouter.delete('/:id', async(request, response, next) => {
  try {
    await User.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

module.exports = usersRouter
