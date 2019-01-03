const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000

app.get('/traffic', (req, res) => {
  fs.readFile('traffic_bytes.json', 'utf8', (err, content) => {
    if (err) next(err)

    try {
      res.send(JSON.parse(content))
    } catch (e) {
      next(e)
    }
  })
})

app.use(express.static('public', { extensions: ['html'] }))
app.listen(port, () => console.log(`Listening on port: ${port}`))
