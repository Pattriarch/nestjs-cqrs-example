import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateCamperRequest } from "./dto/request/create-camper-request.dto";
import { UpdateCamperAllergiesRequest } from "./dto/request/update-camper-allergies-request.dto";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateCamperCommand } from "./commands/create-campers/create-camper.command";
import { UpdateAllergiesCommand } from "./commands/update-allergies/update-allergies.command";
import { CampersQuery } from "./queries/campers.query";
import { CamperDto } from "./camper.dto";

@Controller("create-campers")
export class CampersController {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly queryBus: QueryBus
	) {
	}

	@Get(":id")
	async getCamper(@Param("id") camperId: string): Promise<void> {
		return null;
	}

	@Get()
	async getCampers(): Promise<void> {
      await this.queryBus.execute<CampersQuery, CamperDto[]>(
          new CampersQuery()
      );
	}

	@Post()
	async createCamper(
		@Body() createCamperRequest: CreateCamperRequest
	): Promise<void> {
		await this.commandBus.execute<CreateCamperCommand, void>(
			new CreateCamperCommand(createCamperRequest)
		);
	}

	@Patch(":id/allergies")
	async updateCamperAllergies(
		@Param("id") camperId: string,
		@Body() updateCamperAllergiesRequest: UpdateCamperAllergiesRequest
	): Promise<void> {
		await this.commandBus.execute<UpdateAllergiesCommand, void>(
			new UpdateAllergiesCommand(
				camperId,
				updateCamperAllergiesRequest.allergies
			)
		);
	}
}