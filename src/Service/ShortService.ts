import { BaseService } from "cgserver/lib/Framework/Database/BaseMongoService";
import { MongoBaseModel } from "cgserver/lib/Framework/Database/MongoManager";
import * as _ from "underscore";

export enum EShortState
{
    None,//未分类
    Url,//url
    Num,//次码
    Content,//内容
}
export enum EShortType
{
    None,//未分类
    Url,//url
    Num,//次码
    Content,//内容
}
export enum EShortShowType
{
    All,//全可见
    Code
}
export class ShortModel extends MongoBaseModel
{
    id:string=""
    type_id:EShortType=EShortType.None
    show_type:EShortShowType=EShortShowType.All
    content:string=""
    read=0
    create_time:number=0
    create_ip:string=""
    state:number=EShortState.None
}

export let GShortSer:ShortService=null
class ShortService extends BaseService<ShortModel>
{
    async getNewId()
    {
        let begin = 10000
        let end = 99999
        //97 ~ 122 a~z
        let id = _.random(begin,end)+""
        let i=0
        do
        {
            ++i
            id = _.random(begin,end)+""
            let pm = await this.get({id:1},"id=?",[id])
            if(!pm)
            {
                break
            }
            if(i==5)//最多支持错误5次，以免一直卡住
            {
                id=null
                break
            }
        }while(true)
        return id
    }
}
GShortSer=new ShortService("short",ShortModel)