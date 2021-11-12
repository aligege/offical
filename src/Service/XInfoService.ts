import * as _ from "underscore";
import { MongoBaseModel } from 'cgserver/lib/Framework/Database/MongoManager';
import { BaseService } from "cgserver/lib/Framework/Database/BaseMongoService";

export class XInfoModel extends MongoBaseModel
{
    id:number=-1
    user_id:number=-1
    price:number=0
    title:string=""
    info:string=""
    create_ip:string=""
    create_time:number=0
    update_time:number=0
}
export let GXInfoSer:XInfoService=null
export class XInfoService extends BaseService<XInfoModel>
{
    
}
GXInfoSer=new XInfoService("xinfo",XInfoModel)