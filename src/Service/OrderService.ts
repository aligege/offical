import { EPropertyType } from 'cgserver/lib/Framework/Database/Decorator/Property';
import { GXInfoSer } from './XInfoService';
import { BaseModel, BaseService } from 'cgserver/lib/Framework/Database/BaseService';
import { EErrorCode } from '../Config/_error_';
import { GLog } from 'cgserver/lib/Framework/Logic/Log';
import * as _ from "underscore";
import { Table } from 'cgserver/lib/Framework/Database/Decorator/Table';
import { NotNull } from 'cgserver/lib/Framework/Database/Decorator/NotNull';
import { Type } from 'cgserver/lib/Framework/Database/Decorator/Type';
import { PrimaryKey } from 'cgserver/lib/Framework/Database/Decorator/PrimaryKey';

export enum EOrderState
{
    Init=0,//初始化
    Cancel,//用户取消
    Verifying,//验证中
    Failed,//验证失败
    Ok//验证成功，订单完成
}
export enum EOrderFrom
{
    Ios,//ios应用商店
    Wechat,//微信
    Alipay,//支付宝
    Android_Sft,//盛付通
    IOS_Sft//盛付通
}
@Table("orders",1,"订单")
export class OrderModel extends BaseModel
{
    @Type(EPropertyType.Varchar)
    @NotNull
    @PrimaryKey
    id:string=""//订单id，非自增（时间戳+角色id拼的字符串）

    @NotNull
    @Type(EPropertyType.Int)
    xinfo_id:number=-1

    @NotNull
    @Type(EPropertyType.Int)
    money:number=-1

    @NotNull
    @Type(EPropertyType.Int)
    from:EOrderFrom=-1//充值来源

    @NotNull
    @Type(EPropertyType.BigInt)
    create_time:number=-1

    @NotNull
    @Type(EPropertyType.Int)
    state:EOrderState=EOrderState.Init
}
export let GOrderSer:OrderService = null
class OrderService extends BaseService<OrderModel>
{
    async createNewOrder(from:EOrderFrom,xinfo_id:number,money:number)
    {
        let time = Date.now()
        let id = time+""+_.random(1000000,9999999)
        let om = new OrderModel()
        om.id = id
        om.xinfo_id = xinfo_id
        om.money = money
        om.from = from
        om.create_time = time
        om.state = EOrderState.Init
        let rs = {order:<OrderModel>null,errcode:null}
        let sr = await this.insert(om)
        if(sr.error)
        {
            rs.errcode = EErrorCode.Mysql_Error
            return rs
        }
        rs.order = om
        return rs
    }
    async onComplete(order_id:string,money)
    {
        let rs={user_id:-1,errcode:null}
        let order = await this.get(order_id)
        if(!order)
        {
            rs.errcode = EErrorCode.No_Order
            return rs
        }
        if(order.state==EOrderState.Ok)
        {
            rs.errcode = EErrorCode.Order_Complete
            return rs
        }
        let xm = await GXInfoSer.getById(order.xinfo_id)
        if(money<xm.price)
        {
            rs.errcode = EErrorCode.Order_Verify_Failed
            GLog.error("充值金额比产品金额低，可能遭受恶意充值！order_id="+order_id)
            return rs
        }
        let model={id:order_id,state:EOrderState.Ok}
        let sr = await this.update(<any>model)
        if(sr.error)
        {
            GLog.error(sr.error+"id="+order.id)
            rs.errcode = EErrorCode.Mysql_Error
            return rs
        }
        return rs
    }
    async cancelOrder(id:number,user_id:number)
    {
        let order = await this.getById(id)
        if(!order)
        {
            return EErrorCode.No_Order
        }
        if(order.state==EOrderState.Ok)
        {
            return EErrorCode.Order_Complete
        }
        let model={id:id,state:EOrderState.Cancel}
        let sr = await this.update(<any>model)
        if(sr.error)
        {
            GLog.error(sr.error+"id="+id)
            return EErrorCode.Mysql_Error
        }
        return null
    }
}
GOrderSer = new OrderService(OrderModel)