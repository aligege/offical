import { GExtAccountSer } from '../Service/ExtAccountService';
import { AdminValidate } from 'cgserver/lib/Framework/WebServer/Decorator/AdminValidate';
import { CreatorValidate } from 'cgserver/lib/Framework/WebServer/Decorator/CreatorValidate';
import { BaseOfficalController } from './BaseOfficalController';

export class SystemController extends BaseOfficalController
{
    @AdminValidate
    async showIndex()
    {
        return this.show()
    }
    showDownload()
    {
        return this.show()
    }
    @AdminValidate
    async showMain()
    {
        let model = this.paramData
        let p_total=GExtAccountSer.getTotalNum()
        let p_trn=GExtAccountSer.getTodayRegisterNum()
        let p_tln=GExtAccountSer.getTodayLoginNum()

        model.system = {}
        model.system.total_num = await p_total
        model.system.today_register = await p_trn
        model.system.today_login = await p_tln
        return this.show(model)
    }
    @CreatorValidate
    async showSetup()
    {
        this.show()
    }
}