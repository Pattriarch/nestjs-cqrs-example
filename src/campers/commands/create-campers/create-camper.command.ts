import { CreateCamperRequest } from "../../dto/request/create-camper-request.dto";

export class CreateCamperCommand {
	constructor(readonly createCamperRequest: CreateCamperRequest) {

	}
}