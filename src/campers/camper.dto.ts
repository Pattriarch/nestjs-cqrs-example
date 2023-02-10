// модель для queries
import mongoose from "mongoose";

export class CamperDto {
	readonly _id: mongoose.Types.ObjectId;
	readonly name: string;
	readonly age: number;
	readonly allergies: string[];
	readonly isAllergicToPeanuts: boolean;
}