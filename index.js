const server = require("./server")
const host = process.env.HOST || "0.0.0.0"
const port = process.env.PORT || 8080

server.listen(host, port, () => {
    console.log(`\n Server Running on http://${host}:${port} \n`)
})