import { IdentifiableEntitySchema } from "../../database/identifiable-entity.schema";
import { Prop, Schema } from "@nestjs/mongoose";

@Schema({ versionKey: false, collection: 'create-campers' })
export class CamperSchema extends IdentifiableEntitySchema {
	@Prop()
	readonly name: string;

	@Prop()
	readonly age: number;

	@Prop()
	readonly allergies: string[];
}