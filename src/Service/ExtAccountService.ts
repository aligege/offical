import { AccountService, AccountModel } from "cgserver/lib/Framework/Service/AccountService";
import { core } from "cgserver/lib/Framework/Core/Core";

export let GExtAccountSer:ExtAccountService = null
class ExtAccountService extends AccountService
{
    async getByUnionid(unionid)
    {
        let am:AccountModel=null
        let sr = await GMysqlMgr.query("select * from account where unionid=? limit 1",[unionid])
        if(sr.results.length>0)
        {
            am = sr.results[0]
        }
        return am
    }
    async getTotalNum()
    {
        let num=0
        let sql = "select count(*) as num from account"
        let sr:SqlReturn = null
        sr = await GMysqlMgr.query(sql)
        if(sr.error||sr.results.length<=0)
        {
            return num
        }
        num=sr.results[0].num
        return num
    }
    async getRegisterDataAnalysis()
    {
        let sr = await GMysqlMgr.query("select any_value(account.create_time) as time,count(*) as num from account,user where account.id=user.account_id group by floor((account.create_time+28800000)/86400000)")
        if(sr.error)
        {
            return []
        }
        if(sr.results.length<=0)
        {
            return []
        }
        let list = new Array<{time:number,num:number}>()
        for(let i=0;i<sr.results.length;++i)
        {
            list.push(sr.results[i])
        }
        list.sort((i1,i2)=>
        {
            return i1.time-i2.time
        })
        return list
    }
    async getTodayRegisterNum()
    {
        let num=0
        let today_time = core.getTodayStartTime()
        let sql = "select count(*) as num from account where create_time>?"
        let sr:SqlReturn = null
        sr = await GMysqlMgr.query(sql,today_time)
        if(sr.error||sr.results.length<=0)
        {
            return num
        }
        num=sr.results[0].num
        return num
    }
    async getTodayLoginNum()
    {
        let num=0
        let today_time = core.getTodayStartTime()
        let sql = "select count(*) as num from account where login_time>?"
        let sr:SqlReturn = null
        sr = await GMysqlMgr.query(sql,today_time)
        if(sr.error||sr.results.length<=0)
        {
            return num
        }
        num=sr.results[0].num
        return num
    }
}
GExtAccountSer = new ExtAccountService()