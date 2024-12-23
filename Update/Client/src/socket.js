import io from "socket.io-client";


let socket=null;
function connectSocket()
{
    return new Promise((resolve, reject) => {
        socket = io("http://localhost:3000");
        
        socket.on("connected", (res) => {
            console.log(res)
          resolve(socket);
        });
    
        socket.on("connect_error", (err) => {
          reject(err);
        });
      });
}

function joinOldChannels(channelArray)
{
  socket.emit("join-old-channels",(channelArray.map((item)=>item._id)));
  socket.on("channels-joined",()=>
  {
    console.log("old channels joined");
  })
}

export {socket,connectSocket,joinOldChannels};