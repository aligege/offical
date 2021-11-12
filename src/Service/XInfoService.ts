import { BaseModel, BaseService } from 'cgserver/lib/Framework/Database/BaseService';
import * as _ from "underscore";
import { Table } from "cgserver/lib/Framework/Database/Decorator/Table";
import { NotNull } from "cgserver/lib/Framework/Database/Decorator/NotNull";
import { EPropertyType } from "cgserver/lib/Framework/Database/Decorator/Property";
import { Type } from "cgserver/lib/Framework/Database/Decorator/Type";
import { PrimaryKey } from 'cgserver/lib/Framework/Database/Decorator/PrimaryKey';
import { AutoIncrement } from 'cgserver/lib/Framework/Database/Decorator/AutoIncrement';

@Table("xinfo",1,"加密信息")
export class XInfoModel extends BaseModel
{
    @Type(EPropertyType.Int)
    @NotNull
    @PrimaryKey
    @AutoIncrement
    id:number=-1

    @NotNull
    @Type(EPropertyType.Int)
    user_id:number=-1

    @NotNull
    @Type(EPropertyType.Int)
    price:number=0

    @NotNull
    @Type(EPropertyType.Varchar)
    title:string=""

    @NotNull
    @Type(EPropertyType.Varchar)
    info:string=""

    @NotNull
    @Type(EPropertyType.Varchar)
    create_ip:string=""

    @NotNull
    @Type(EPropertyType.BigInt)
    create_time:number=0

    @NotNull
    @Type(EPropertyType.BigInt)
    update_time:number=0
}
export let GXInfoSer:XInfoService=null
export class XInfoService extends BaseService<XInfoModel>
{
    
}
GXInfoSer=new XInfoService(XInfoModel)