import { EErrorCode } from '../Config/_error_';
import { EShortType, GShortSer, ShortModel } from '../Service/ShortService';
import { BaseOfficalController } from "./BaseOfficalController";

export class ShortController extends BaseOfficalController
{
    showIndex()
    {
        this.show()
    }
    async onList()
    {
        let params=this.postData
        let where=""
        let ps=[]
        if(where=="")
        {
            where=null
            ps=null
        }

        let page = params.page||0
        let num_per_page = params.page_num||20

        let p_total=GShortSer.getCount(where,ps)
        where=(where||"1=1")+" order by create_time desc limit ?,?"
        ps=ps||[]
        ps.push(page*num_per_page,num_per_page)
        let p_list=GShortSer.gets(null,where,ps)

        params.total_num = await p_total
        params.shorts = await p_list
        params.page = page+1
        params.total_page = Math.ceil(params.total_num/num_per_page)
        return this.showJson(params)
    }
    async onAdd()
    {
        let params=this.postData
        var sm:ShortModel = await GShortSer.get(null,"content=?",[params.content])
        if(sm)
        {
            this.showJson({short:sm})
            return
        }
        sm = new ShortModel()
        sm.id=await GShortSer.getNewId()
        sm.type_id=params.type_id||sm.type_id
        sm.show_type=params.show_type||sm.show_type
        sm.content=params.content
        var sr = await GShortSer.insert(sm,this.remoteHost)
        if(sr.error||sr.results.affectedRows!=1)
        {
            this.showJson({errcode:EErrorCode.Short_AddFailed})
            return
        }
        this.showJson({short:sm})
    }
    async onGet()
    {
        let params=this.postData
        var sm:ShortModel = await GShortSer.getById(params.code)
        this.showJson({short:sm})
        if(sm)
        {
            GShortSer.updateProperty("`read`=`read`+1","id=?",[sm.id])
        }
    }
}