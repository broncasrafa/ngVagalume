var app = require('./config/server')

var porta = process.env.PORT || 4002

app.listen(porta, () => {
    console.log(`Servidor online => { http://localhost:${porta} } ...`)
})