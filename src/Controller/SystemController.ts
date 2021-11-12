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
        return this.show(model)
    }
    @CreatorValidate
    async showSetup()
    {
        this.show()
    }
}