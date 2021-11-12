import { BaseOfficalController } from "./BaseOfficalController";
import { GQQTool } from "cgserver/lib/Framework/ThirdParty/QQTool";
import { GExtUserSer } from "../Service/ExtUserService";
import { GExtAccountSer } from "../Service/ExtAccountService";
import { EAccountFrom } from "cgserver/lib/Framework/Service/ini";

export class QQController extends BaseOfficalController
{
    showIndex()
    {
        this.show()
    }
    async showCallback()
    {
        let params = this.paramData
        let access_token = await GQQTool.getAccessToken(params.code)
        if(!access_token)
        {
            //重新到qq授权
            this.redirect(null,"QQ")
            return
        }
        let open_id = await GQQTool.getOpenId(access_token)
        if(!open_id)
        {
            //重新到qq授权
            this.redirect(null,"QQ")
            return
        }
        let rs = await GExtAccountSer.login(open_id,open_id,this.remoteHost,EAccountFrom.QQ,access_token)
        let errcode = rs.errcode
        if (!errcode)
        {
            let user = await GExtUserSer.getByAccountId(rs.account.id)
            this._login(user)
            this.redirect(null,"QQ","endlogin")
        }
        else
        {
            this.redirect(null,"QQ")
        }
    }
    showEndLogin()
    {
        this.show()
    }
}