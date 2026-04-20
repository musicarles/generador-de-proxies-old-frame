import { CardColor, CardFrame } from "./backgrounds";
import { ManaType } from "./mana";

export type Card = {
	overrideWithScanUrl?: string;
	artUrl: string;
	artVariants?: string[];
	artist?: string;
	aspect: { frame: CardFrame; color: CardColor; legendary: boolean };
	collectorNumber?: string;
	flavorText: string;
	lang?: string;
	manaCost: ManaType[];
	oracleText: string;
	power?: string;
	rarity?: string;
	set?: string;
	title: string;
	totalVariants: number;
	currentVariant?: number;
	toughness?: string;
	typeText: string;
	verso?: "default" | string | Card;
	category: "Regular";
};

export function getEmptyCard(): Card {
	return {
		artUrl: "",
		totalVariants: 0,
		currentVariant: 0,
		flavorText: "",
		manaCost: [],
		oracleText: "",
		title: "",
		typeText: "",
		aspect: {
			frame: "Noncreature",
			color: "Colorless",
			legendary: false,
		},
		category: "Regular",
		lang: "en",
	};
}
