import { GXInfoSer } from '../Service/XInfoService';
import { BaseOfficalController } from "./BaseOfficalController";
import { GAlipayTool } from "cgserver/lib/Framework/ThirdParty/AlipayTool";
import { AuthorityValidate } from "cgserver/lib/Framework/WebServer/Decorator/AuthorityValidate";
import { GOrderSer, EOrderFrom } from "../Service/OrderService";

export class AlipayController extends BaseOfficalController
{
    @AuthorityValidate(null,"QQ")
    async showIndex()
    {
        let params = this.paramData
        let xinfo_id = params.xinfo_id
        let xm = await GXInfoSer.getById(xinfo_id)
        if(!xm)
        {
            this.showText("xinfo wrong!")
            return
        }
        let rs = await GOrderSer.createNewOrder(EOrderFrom.Alipay,xm.id,xm.price)
        let html = await GAlipayTool.getAlipayPage("post","http://www.eryinet.com/alipay/pay","",rs.order.id,rs.order.money,xm.title,xm.title)
        this.showText(html)
    }
    async onPayUrl()
    {
        let params = this.postData
        let xinfo_id = params.xinfo_id
        let xm = await GXInfoSer.getById(xinfo_id)
        let rs = await GOrderSer.createNewOrder(EOrderFrom.Alipay,xm.id,xm.price)
        let url = await GAlipayTool.getAlipayPage("get","http://www.eryinet.com/alipay/pay","http://www.eryinet.com/alipay/endpay",rs.order.id,rs.order.money,xm.title,xm.title)
        this.showJson({url})
    }
    async onPay()
    {
        let params = this.postData
        if(params.trade_status!="TRADE_SUCCESS")
        {
            return
        }
        let order_id = params.out_trade_no
        let money = parseFloat(params.total_amount)
        GOrderSer.onComplete(order_id,money)
    }
    showEndPay()
    {
        this.show()
    }
}
/*
{
    "module":"",
    "controller":
    "alipay",
    "action":"pay",
    "suffix":null,
    "file_url":null,
    "params":{},
    "post":
    {
        "gmt_create":"2019-09-13 16:03:03",
        "charset":"utf-8",
        "gmt_payment":"2019-09-13 16:03:13",
        "notify_time":"2019-09-13 16:03:14",
        "subject":"测试100",
        "sign":"LUH XdYmf6JOEkiUbt5DCGw6cVrfFr90IrluLT5AWHmU81k6ikHPqpi vIeRNbpAXlPoNgBS639j7Tm5u1HlyVtDturmEz5rEdR8JcIKas03uNL2IpnQqvEqHMhxyRKSu3EPUtxxLPDX2gTyWLTiAevCqCFW6/OefA5sOV1 DxQk6PSOsFI3FE5pg4B9d20l0GEr6 KV4MQ9xnmJrNODULsAjIJXPkhM5LKLvSmHKsLdrZXBku9RdkzG1UQR2bFurb14HvwGsIfaQFgnawJz7AAMGFWQN4xeHJE3KA72ToTNsMmmwwVE2X2OFFW3wTqx DQoSMJF6FD6T Z2ERCFpA==",
        "buyer_id":"2088102179569477",
        "body":"哈哈哈哈",
        "invoice_amount":"100.00",
        "version":"1.0",
        "notify_id":"2019091300222160313069471002069289",
        "fund_bill_list":"[
            {
                \"amount\":\"100.00\",
                \"fundChannel\":\"ALIPAYACCOUNT\"
            }
        ]",
        "notify_type":"trade_status_sync",
        "out_trade_no":"1568361779492",
        "total_amount":"100.00",
        "trade_status":"TRADE_SUCCESS",
        "trade_no":"2019091322001469471002497826",
        "auth_app_id":"2016101400683724",
        "receipt_amount":"100.00",
        "point_amount":"0.00",
        "app_id":"2016101400683724",
        "buyer_pay_amount":"100.00",
        "sign_type":"RSA2",
        "seller_id":"2088102179522342"
    }
}
*/