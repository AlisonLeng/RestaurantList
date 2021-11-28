// 載入模組、設定變數及路由、啟動 server 監聽
const express = require('express')
const app = express()
const port = 3000
const restaurant_list = require('./restaurant.json')

// require express-handlebars
const exphbs = require('express-handlebars')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
  res.render('index', { restaurantList: restaurant_list.results})
})

// route setting for show
app.get('/restaurants/:id', (req, res) => {
  const restaurant = restaurant_list.results.find(restaurant => 
    restaurant.id.toString() === req.params.id)
  res.render('show', { restaurant: restaurant})
})

// route setting for search
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurantSearch = restaurant_list.results.filter(restaurant => {
    return(
      restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
      restaurant.category.toLowerCase().includes(keyword.toLowerCase())
    )
  })
  res.render('index', { restaurantList: restaurantSearch, keyword: keyword}) 
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`server listen to http://localhost:${port}`)
})
