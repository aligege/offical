import { ExtUserModel } from '../Service/ExtUserService';
import { BaseUserController } from 'cgserver/lib/Framework/WebServer/Controller/BaseUserController';

export class BaseOfficalController extends BaseUserController<ExtUserModel>
{

}