import { BaseOfficalController } from "./BaseOfficalController"
import { GExtAccountSer } from "../Service/ExtAccountService"
import { GExtUserSer } from "../Service/ExtUserService"
import { EAccountFrom } from "cgserver/lib/Framework/Service/ini"

export class LoginController extends BaseOfficalController
{
    async showIndex()
    {
        if(this._self_user)
        {
            this.redirect()
        }
        else
        {
            this.show()
        }
    }
    async onLogin()
    {
        let params = this.postData
        let ip = this.remoteHost
        let rs = await GExtAccountSer.login(params.unionid, params.openid,ip,EAccountFrom.OpenSocial)
        let errcode = rs.errcode
        let error = null
        if (!errcode)
        {
            let user = await GExtUserSer.getByAccountId(rs.account.id)
            if(user)
            {
                this._login(user)
                this.showJson({})
                return
            }
            else
            {
                error = "no user!"
            }
        }
        else
        {
            error = errcode.des
        }
        if(error)
        {
            this.showJson({err:error})
        }
    }
}