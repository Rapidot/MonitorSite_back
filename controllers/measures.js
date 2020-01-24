
  const measuresRouter = require('express').Router()
  const Measure = require('../models/measure')

  measuresRouter.get('/', async(request, response) => {
  const measure = await Measure.find({}).populate('measures', {
      name: 1,
    })
    response.json(measure.map(u => u.toJSON()))
})

measuresRouter.post('/', async(request, response, next) => {
  try {
    const body = request.body
      /*if (body.password.length < 3) {
        return response.status(400).json({
          error: 'At least 3 characters are needed!'
        })
      }*/
      
      /*const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
      })*/

      
      const measure = new Measure({
        name: body.name
      })

      const savedUser = await measure.save()

      response.json(savedUser)
  } catch (exception) {
    next(exception)
  }
})

//Jos yli 10 mittausta -> viimeinen pois
measuresRouter.put('/:id', async(request, response, next) => {
  const body = request.body

  try {
    //const updatedBlogLikes = await Measure.findOneAndUpdate(request.params.id,
    /*const updatedBlogLikes = await Measure.updateOne(request.params.id,
    { $push: { 
          graph: {
            point : body.point,
            datee: new Date()
          }
        }
      },
      {safe: true, upsert: true}
    )*/
    //Haetaan id:llä oikea mittaaja-array
    const data = await Measure.findOne(body.id)
    //Jos mittaajalla mittauksia > 9 eli 0..9 -> 10 kpl
    if (data.graph.length>9){
      //etsitään vanhin
      const oldest = data.graph.reduce((c, n) => 
        Date.parse(n) < Date.parse(c) ? n : c)
      console.log('--<'+oldest._id)
      //Poistetaan DB:stä vanhin
      await data.graph.pull({
        _id: oldest._id
      })
    }
    
    data.graph.push({
      point : body.point,
      date: new Date()
    })

    const updatedData = await data.save()
    //console.log(updatedData)
    if (updatedData) {
      response.json(updatedData.toJSON())
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }
  
  //Measure.findOne().sort({$natural: 1}).limit(1).exec(function(err, res){
  //Measure.findOne().sort({ field: -_id }).limit(1)
  /*Measure.find().sort({ _id: 1 }).limit(1).exec(function(err, res){
      if(err){
        console.log(err);
    }
    else{
        console.log('>---'+res+'---<');
    }
})*/
})

/*measureRouter.delete('/:id', async(request, response, next) => {
  try {
    await Measure.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})*/

module.exports = measuresRouter
