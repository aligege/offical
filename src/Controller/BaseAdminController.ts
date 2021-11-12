import { ExtUserModel } from '../Service/ExtUserService';
import { BaseUserController } from 'cgserver/lib/Framework/WebServer/Controller/BaseUserController';
import { ERoleGroup } from 'cgserver/lib/Framework/Service/UserService';

export class BaseAdminController extends BaseUserController<ExtUserModel>
{
    get isCreator()
    {
        return this._self_user&&(this._self_user.role_group==ERoleGroup.Creator||this._self_user.role_group==5)
    }
    get isAdmin()
    {
        return this._self_user&&(this._self_user.role_group==ERoleGroup.Admin||this._self_user.role_group==ERoleGroup.Creator||this._self_user.role_group==5)
    }
}