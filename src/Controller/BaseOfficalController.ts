import { ExtUserModel } from '../Service/ExtUserService';
import { MongoBaseUserController } from 'cgserver/lib/Framework/WebServer/Controller/MongoBaseUserController';

export class BaseOfficalController extends MongoBaseUserController<ExtUserModel>
{

}