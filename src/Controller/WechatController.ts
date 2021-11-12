import { BaseOfficalController } from "./BaseOfficalController";
import { GExtAccountSer } from "../../../Modules/Admin/Service/ExtAccountService";
import { EAccountFrom } from "cgserver/lib/Framework/Service/AccountService";
import { GExtUserSer } from "../Service/ExtUserService";
import { GWechatTool } from "cgserver/lib/Framework/ThirdParty/WechatTool";
import { GCacheTool } from "cgserver/lib/Framework/Logic/CacheTool";

export class WechatController extends BaseOfficalController
{
    showOnlineInfo()
    {
        this.show()
    }
    showIndex()
    {
        if(this.selfUser)
        {
            this.redirect(null,"Wechat","endlogin")
        }
        else
        {
            this.show()
        }
    }
    async showCallback()
    {
        let params = this.paramData
        let access_info = await GWechatTool.getAccessInfo(params.code)
        if(!access_info)
        {
            //重新到qq授权
            this.redirect(null,"Wechat")
            return
        }
        let rs = await GExtAccountSer.login(access_info.unionid,access_info.openid,this.remoteHost,EAccountFrom.WeChat,access_info.access_token)
        let errcode = rs.errcode
        if (!errcode)
        {
            let user = await GExtUserSer.getByAccountId(rs.account.id)
            this._login(user)
            GCacheTool.add("access_token_"+rs.account.id,access_info.access_token,2*60*60*1000)
            this.redirect(null,"Wechat","endlogin")
        }
        else
        {
            this.redirect(null,"Wechat")
        }
    }
    showEndLogin()
    {
        this.show()
    }
}