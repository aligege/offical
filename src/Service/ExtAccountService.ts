import { AccountService, AccountModel } from "cgserver/lib/Framework/Service/MongoAccountService";

export let GExtAccountSer:ExtAccountService = null
class ExtAccountService extends AccountService
{
    
}
GExtAccountSer = new ExtAccountService()