import { BaseAdminController } from "./BaseAdminController";
import { AuthorityValidate } from "cgserver/lib/Framework/WebServer/Decorator/AuthorityValidate";

export class PanelController extends BaseAdminController
{
    @AuthorityValidate(null,"Wechat")
    showIndex()
    {
        this.show()
    }
    @AuthorityValidate(null,"Wechat")
    async showProduct()
    {
        let products = []//await GProductSer.getByUserId(this.selfUser.id)
        this.show({products})
    }

    @AuthorityValidate(null,"Wechat")
    showQA()
    {
        this.show()
    }
    @AuthorityValidate(null,"Wechat")
    showWechatOffical()
    {
        this.show()
    }
    @AuthorityValidate(null,"Wechat")
    showOnline()
    {
        this.show()
    }
    @AuthorityValidate(null,"Wechat")
    showSlotTip()
    {
        this.show()
    }
}