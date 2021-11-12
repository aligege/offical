import * as _ from "underscore";
import { Type } from "cgserver/lib/Framework/Database/Decorator/Type";
import { EPropertyType } from "cgserver/lib/Framework/Database/Decorator/Property";
import { NotNull } from "cgserver/lib/Framework/Database/Decorator/NotNull";
import { PrimaryKey } from "cgserver/lib/Framework/Database/Decorator/PrimaryKey";
import { BaseModel, BaseService } from "cgserver/lib/Framework/Database/BaseService";
import { Table } from "cgserver/lib/Framework/Database/Decorator/Table";

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
@Table("short",1,"短码")
export class ShortModel extends BaseModel
{
    @Type(EPropertyType.Varchar,"")
    @NotNull
    @PrimaryKey
    id:string=""

    @NotNull
    @Type(EPropertyType.Int,0)
    type_id:EShortType=EShortType.None

    @NotNull
    @Type(EPropertyType.Int,0)
    show_type:EShortShowType=EShortShowType.All

    @NotNull
    @Type(EPropertyType.Text)
    content:string=""

    @NotNull
    @Type(EPropertyType.Int)
    read=0
    /**
     * 创建时间
     */
    @NotNull
    @Type(EPropertyType.BigInt)
    create_time:number=0

    @NotNull
    @Type(EPropertyType.Varchar,"",64)
    create_ip:string=""
    /**
     * 状态
     */
    @NotNull
    @Type(EPropertyType.Int)
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
            let pm = await this.get("id","id=?",[id])
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
GShortSer=new ShortService(ShortModel)