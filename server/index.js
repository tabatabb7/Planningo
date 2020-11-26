const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080
const path = require('path')

app.use(express.static(path.join(__dirname, '..', 'public')));


app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
});

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
});


module.exports = app

if (require.main === module) {
  app.listen(PORT, (e) => {
    if (e) throw e
    console.log(`listening on port ${PORT}`)
  })
}
