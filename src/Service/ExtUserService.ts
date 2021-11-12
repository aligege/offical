import * as _ from "underscore";
import { UserModel, UserService } from "cgserver/lib/Framework/Service/UserService";
import { GMysqlMgr, SqlReturn } from "cgserver/lib/Framework/Database/MysqlManager";
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
    async getTotalNum(where:string,ps:Array<any>)
    {
        let sql = "select count(*) as num from user"
        if(where)
        {
            sql+=where
        }
        let sr:SqlReturn = null
        if(!where)
        {
            sr = await GMysqlMgr.query(sql)
        }
        else
        {
            sr = await GMysqlMgr.query(sql,ps)
        }
        if(sr.error)
        {
            return 0
        }
        if(sr.results.length<=0)
        {
            return 0
        }
        return sr.results[0].num
    }
    async getPageWithAccount(page_index:number,page_num:number,where:string,ps:Array<any>)
    {
        let begin = page_index*page_num
        let end = page_num
        let list = new Array<any>()
        let sql = "select user.*,account.create_time,account.login_time,account.login_ip,account.from from user,account where account.id=user.account_id "
        if(where)
        {
            sql+=where
            ps.push(begin,end)
        }
        sql+=" order by id limit ?,?"
        
        let sr:SqlReturn = null
        if(!where)
        {
            sr = await GMysqlMgr.query(sql,[begin,end])
        }
        else
        {
            sr = await GMysqlMgr.query(sql,ps)
        }
        if(sr.error||sr.results.length<=0)
        {
            return list
        }
        for(let i=0;i<sr.results.length;++i)
        {
            list.push(sr.results[i])
        }
        return list
    }
    async addCrystal(user_id,crystal)
    {
        if(!crystal)
        {
            return "钻石数要大于0"
        }
        let sr = await GMysqlMgr.query("update user set crystal=crystal+? where id=?",[crystal,user_id])
        if(sr.error)
        {
            return sr.error
        }
        if(sr.results.changedRows<=0)
        {
            return "失败"
        }
    }
    async addCoin(user_id,coin)
    {
        if(!coin)
        {
            return "金币数要大于0"
        }
        let sr = await GMysqlMgr.query("update user set coin=coin+? where id=?",[coin,user_id])
        if(sr.error)
        {
            return sr.error
        }
        if(sr.results.changedRows<=0)
        {
            return "失败"
        }
    }
    async updateState(user_id,state)
    {
        let sr = await GMysqlMgr.query("update user set state=? where id=?",[user_id,state])
        if(sr.error||sr.results.changedRows<=0)
        {
            return "修改失败"
        }
        return
    }
}