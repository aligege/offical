import { FrameworkErrorCode } from "cgserver/lib/Framework/Config/_error_";

export let EErrorCode:OfficeErrCode =null
class OfficeErrCode extends FrameworkErrorCode
{
    No_Order={id:20009,des:"订单不存在"}
    Order_Not_Yours={id:20010,des:"不是您的订单"}
    Order_Verify_Failed={id:20011,des:"订单验证失败"}
    Order_Complete={id:20012,des:"订单已经完成"}
    No_Product = {id:20013,des:"产品不存在"}
    Action_Failed = {id:20013,des:"操作失败"}
    Short_AddFailed = {id:20014,des:"短码插入失败"}
}
EErrorCode=new OfficeErrCode()