import { BaseOfficalController } from "./BaseOfficalController";

/**
 * 为了优化，该controller定为了静态，不能使用任何阻塞或者异步的东西
 * 静态控制器的好处是不用每次请求都区初始化和判断账户信息
 */
export class IndexController extends BaseOfficalController
{
    constructor()
    {
        super(null,null,null)
    }
    showIndex()
    {
        this.show()
    }
    showFaq()
    {
        this.show()
    }
    showPrice()
    {
        this.show()
    }
    showContact()
    {
        this.show()
    }
    showDownload()
    {
        this.show()
    }
}