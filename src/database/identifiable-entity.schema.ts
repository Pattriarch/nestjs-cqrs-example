import { Prop } from '@nestjs/mongoose';
import * as mongoose from "mongoose";

export abstract class IdentifiableEntitySchema {
	@Prop()
	readonly _id: mongoose.Types.ObjectId
}