import { GOfficalCfg } from './Config/OfficalConfig';
import { LoginController } from './Controller/LoginController';
import { AlipayController } from './Controller/AlipayController';
import { WechatController } from './Controller/WechatController';
import { QQController } from './Controller/QQController';
import { GCtrMgr } from "cgserver/lib/Framework/WebServer/Engine/ControllerManager";
import { IWebServer } from "cgserver/lib/Framework/WebServer/IWebServer";
import { IndexController } from "./Controller/IndexController";
import { PanelController } from "./Controller/PanelController";
import { ExtUserService } from "./Service/ExtUserService";
import { SystemController } from "./Controller/SystemController";
import { ShortController } from './Controller/ShortController';
import { DownloadController } from './Controller/DownloadController';

//实现对controller的手动注册
export let GOfficalServer:OfficalServer=null
class OfficalServer extends IWebServer
{
    constructor()
    {
        super()
        GOfficalServer = this
    }
    start()
    {
        new ExtUserService()
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
        GCtrMgr.registerController("Offical","Alipay",AlipayController)
        GCtrMgr.registerController("Offical","Login",LoginController)
        GCtrMgr.registerController("Offical","Short",ShortController)
        GCtrMgr.registerController("Offical","Download",DownloadController)
    }
    protected _registerRouter()
    {

    }
}
new OfficalServer()