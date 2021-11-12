import * as _ from "underscore";
import { UserModel, UserService } from "cgserver/lib/Framework/Service/MongoUserService";
import { Table } from "cgserver/lib/Framework/Database/Decorator/Table";
import { NotNull } from "cgserver/lib/Framework/Database/Decorator/NotNull";
import { EPropertyType } from "cgserver/lib/Framework/Database/Decorator/Property";
import { Type } from "cgserver/lib/Framework/Database/Decorator/Type";

@Table("user",2,"用户")
export class ExtUserModel extends UserModel
{
    @NotNull
    @Type(EPropertyType.Int)
    /**
     * 可提现的金钱
     */
    money=0
}
export let GExtUserSer:ExtUserService=null
export class ExtUserService extends UserService<ExtUserModel>
{
    constructor()
    {
        super(ExtUserModel)
        GExtUserSer = this
    }
    protected _newUserModel()
    {
        return new ExtUserModel()
    }
    async getByAccountId(account_id)
    {
        return <ExtUserModel>(await super.getByAccountId(account_id))
    }
    async get(id)
    {
        return <ExtUserModel>(await super.get(id))
    }
    async getSimple(id)
    {
        let rm = await this.get(id)
        if(!rm)
        {
            return null
        }
        return {
            id:rm.id,
            logo:rm.logo,
            sex:rm.sex,
            nickname:rm.nickname
        }
    }
}
GExtUserSer=new ExtUserService()