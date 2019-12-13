const server = require("./server")
const host = proess.env.HOST || "0.0.0.0"
const port = process.env.PORT || 8080

server.get("/", (res, req) => {
    res.json({
        message: "Welcome to the API",
        connection: process.env.CONNECTION
    })
})

server.listen(host, port, () => {
    console.log(`\n Server Running on http://${host}:${port} \n`)
})