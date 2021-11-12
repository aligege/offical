import { GOfficalServer } from './OfficalServer';
/*!@preserve
* TinyTS     : Free Web,Native Server
* Copyright : muma <chengang01@live.com>
*/

import { IWebServer } from "cgserver/lib/Framework/WebServer/IWebServer";

GOfficalServer.start()
let server:IWebServer=GOfficalServer
for(let i=0;i<process.argv.length;++i)
{
    let str = process.argv[i]
    if(str.indexOf("@")==0)
    {
        process.title = str
        break
    }
}

setTimeout(()=>
{
    let readline = require('readline2')
    let rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    rl.on("line",(line)=>
    {
        if(line=="exit")
        {
            if(server)
            {
                server.stop()
            }
            rl.write("stopping...")
            setTimeout(()=>
            {
                rl.close()
            },5000)
        }
    })
    rl.on("close",()=>
    {
        process.exit(0)
    })
    rl.setPrompt('server> ')
    rl.prompt()
},5000)