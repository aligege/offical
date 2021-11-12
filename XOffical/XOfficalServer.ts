import { GCtrMgr } from "cgserver/lib/Framework/WebServer/Engine/ControllerManager";
import { IWebServer } from "cgserver/lib/Framework/WebServer/IWebServer";
import { GOfficalCfg } from "../src/Config/OfficalConfig";
import { DownloadController } from "../src/Controller/DownloadController";
import { IndexController } from "../src/Controller/IndexController";
import { LoginController } from "../src/Controller/LoginController";
import { PanelController } from "../src/Controller/PanelController";
import { QQController } from "../src/Controller/QQController";
import { ShortController } from "../src/Controller/ShortController";
import { SystemController } from "../src/Controller/SystemController";
import { WechatController } from "../src/Controller/WechatController";

//实现对controller的手动注册
export let GXOfficalServer:XOfficalServer=null
class XOfficalServer extends IWebServer
{
    constructor()
    {
        super()
        GXOfficalServer = this
    }
    start()
    {
        GOfficalCfg.init()
        return super.start(GOfficalCfg.webserver)
    }
    /**
     * 注册控制器
     * eg:GControllerMgr.registerController("Admin","System",SystemController)
     */
    protected _registerController()
    {
        GCtrMgr.registerStaticController("Offical","Index",new IndexController())
        GCtrMgr.registerController("Offical","Panel",PanelController)
        GCtrMgr.registerController("Offical","System",SystemController)
        GCtrMgr.registerController("Offical","QQ",QQController)
        GCtrMgr.registerController("Offical","WeChat",WechatController)
        GCtrMgr.registerController("Offical","Login",LoginController)
        GCtrMgr.registerController("Offical","Short",ShortController)
        GCtrMgr.registerController("Offical","Download",DownloadController)
    }
    protected _registerRouter()
    {

    }
}
new XOfficalServer()