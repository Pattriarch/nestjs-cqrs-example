import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CamperSchema } from "./camper.schema";
import { Model } from "mongoose";
import { CamperDto } from "../camper.dto";

@Injectable()
export class CamperDtoRepository {
	constructor(
		@InjectModel(CamperSchema.name)
		private readonly camperModel: Model<CamperSchema>
	) {
	}

	async findAll(): Promise<CamperDto[]> {
		const campers = await this.camperModel.find({}, {}, { lean: true });

		return campers.map(camper => {
			const allergiesLower = camper.allergies.map(allergy => {
				return allergy.toLocaleLowerCase();
			});
			const isAllergicToPeanuts = allergiesLower.includes("peanuts");
			return {
				...camper,
				isAllergicToPeanuts
			};
		})
	}

	async findById(camperId: string): Promise<CamperDto> {
		const camper = await this.camperModel.findById(camperId, { lean: true });

		const allergiesLower = camper.allergies.map(allergy => {
			return allergy.toLocaleLowerCase();
		});
		const isAllergicToPeanuts = allergiesLower.includes("peanuts");

		return {
			...camper,
			isAllergicToPeanuts
		}
	}
}