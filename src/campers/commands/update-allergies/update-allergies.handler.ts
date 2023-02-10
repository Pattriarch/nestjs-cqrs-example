import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { UpdateAllergiesCommand } from "./update-allergies.command";
import { CamperEntityRepository } from "../../db/camper-entity.repository";

@CommandHandler(UpdateAllergiesCommand)
export class UpdateAllergiesHandler implements ICommandHandler<UpdateAllergiesCommand> {
	constructor(
		private readonly camperEntityRepository: CamperEntityRepository,
		private readonly eventPublisher: EventPublisher
	) {
	}

	async execute({ camperId, allergies }: UpdateAllergiesCommand): Promise<void> {
		const camper = this.eventPublisher.mergeObjectContext(
			await this.camperEntityRepository.findOneById(camperId)
		);
		camper.updateAllergies(allergies);
		await this.camperEntityRepository.findOneAndReplaceById(camperId, camper);
		// мы не делали ивенты, но это best practice сохранять их на всякий случай
		camper.commit();
	}
}