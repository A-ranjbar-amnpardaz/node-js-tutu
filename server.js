const http = require('http')
const path = require('path')
const fs = require('fs')
const fsPromises = require('fs').promises

const EventsEmitter = require('events')

class Emitter extends EventsEmitter {} // es

const emitter = new Emitter()

const PORT = process.env.PORT || 3500

const server = http.createServer((req, res) => {
    console.log(req.url, req.method)

    const extension = path.extname(req.url)
    let conetentType
    switch (extension) {
        case '.css':
            conetentType = 'text/css'
            break
        case '.js':
            conetentType = 'text/javascript'
        case '.jsx':
            conetentType = 'text/javascriptx'
        case '.json':
            conetentType = 'application/json'
        case '.png':
            conetentType = 'image/png'
        case '.gif':
            conetentType = 'image/gif'
        case '.svg':
            conetentType = 'image/svg+xml'
        case '.jpg':
            conetentType = 'image/jpeg'
        case '.txt':
            conetentType = 'text/plain'

        default:
            conetentType = 'text/html'
            break
    }

    let filePath =
        conetentType === 'text/html' && req.url === '/'
            ? path.join(__dirname, 'views', 'index.html')
            : conetentType === 'text/html' && req.url.slice(-1) === '/'
            ? path.join(__dirname, 'views', req.url, 'index.html')
            : conetentType === 'text/html'
            ? path.join(__dirname, 'views', req.url)
            : path.join(__dirname, req.url)

    // makes the ".html " extension required for html
    if (!extension && req.url.slice(-1) !== '/') filePath += '.html'

    const fileExists = fs.existsSync(filePath)

    if (fileExists) {
        // serve the file
    } else {
        // 404
        // 301
        console.log(path.parse(filePath))
    }
})

// emitter.on('log', (msg) => console.log(msg))

server.listen(PORT, () => console.log(`Server listening at ${PORT}`))
