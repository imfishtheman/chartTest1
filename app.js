const express= require('express')
const app = express();
//const server = require('http').createServer(app)

app.set('view engine', 'ejs')
app.use(express.static('public'))


app.get('/', (req,res)=>{
    //res.send("Hello")
    res.render("index.ejs");
})

app.get('/chart1', (req,res)=>{
    res.render('chart1.ejs')
})

app.get('/chart2', (req,res)=>{
    res.render('chart2.ejs')
})
var server =  app.listen(3000,()=>{
    console.log("Server up")
})
var io = require('socket.io').listen(server)

io.on('connection',(socket)=>{
    console.log("Connected ee")
    map.get('1').push(socket)
    console.log("Map contents: ")
      map.get('1').forEach(element => {
          console.log(element.id)
      });
    socket.on('disconnect',()=>{
        console.log("Disconnect socket:"+socket.id)
        var foundSocket = map.get('1').find((skt)=>{
            return socket.id===skt.id;
        })
        console.log("FOund socket: "+foundSocket.id);
        map.get('1').splice(foundSocket,1);
    })

})


const map = new Map();
map.set('1',[]);
map.set('2',[]);
map.set('3',[]);
map.set('4',[]);

setInterval(()=>{
    console.log("Tick")
    map.get('1').forEach((socket)=>{
        console.log("Emitting message on id: "+socket.id)
        socket.emit('tick', {name:'Mike', id:socket.id})
    })
} ,2000)