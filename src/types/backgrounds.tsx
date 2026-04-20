import { Card } from "./card";
import { CardError } from "./error";
import {
	BiManaType,
	isUnaryType,
	ManaType,
	UnaryManaType,
	unaryToBiType,
} from "./mana";

export const cardFrames = [
	"Basic Land",
	"Nonbasic Land",
	"Creature",
	"Noncreature",
] as const;

export type CardFrame = (typeof cardFrames)[number];

export const cardBackgrounds = [
	"BG",
	"Artifact",
	"Black",
	"Blue",
	"BR",
	"Green",
	"GU",
	"GW",
	"Red",
	"RG",
	"RW",
	"UB",
	"UR",
	"WB",
	"White",
	"WU",
	"Gold",
	"Land",
] as const;

export type CardBackground = (typeof cardBackgrounds)[number];

export function parseCardFrame(engTypeText: string): CardFrame {
	const lowercaseType = engTypeText.toLowerCase();

	if (lowercaseType.includes("creature")) {
		return "Creature";
	} else if (lowercaseType.includes("basic land")) {
		return "Basic Land";
	} else if (lowercaseType.includes("land")) {
		return "Nonbasic Land";
	} else if (
		lowercaseType.includes("instant") ||
		lowercaseType.includes("sorcery") ||
		lowercaseType.includes("enchantment") ||
		lowercaseType.includes("artifact")
	) {
		return "Noncreature";
	} else {
		throw new CardError(engTypeText, "Card type is not yet supported");
	}
}

export const cardColors = [
	"Black",
	"Blue",
	"Green",
	"Red",
	"White",
	"Colorless",
	"Multicolored",
] as const;

export type CardColor = (typeof cardColors)[number];

export function parseCardColor(
	mana: ManaType[],
	artifact: boolean,
	bicolorManaOnly: boolean,
): CardColor {
	if (artifact) {
		return "Artifact";
	}

	const coloredMana = mana.filter((type) => type != "colorless" && type != "x");

	switch (coloredMana.length) {
		case 0:
			return "Multicolored";
		case 1:
			if (isUnaryType(coloredMana[0])) {
				return unaryManaToColor(coloredMana[0]);
			} else {
				return biManaToColor(coloredMana[0], false);
			}
		case 2:
			if (isUnaryType(coloredMana[0]) && isUnaryType(coloredMana[1])) {
				const result = Object.entries(unaryToBiType).find(([multi, array]) => {
					return array.every((type) => coloredMana.includes(type));
				});

				if (result) {
					return "Multicolored";
				} else {
					return "Multicolored";
				}
			} else {
				return "Multicolored";
			}
		default:
			return "Multicolored";
	}
}

export function unaryManaToColor(mana: UnaryManaType): CardColor {
	switch (mana) {
		case "red":
			return "Red";
		case "green":
			return "Green";
		case "blue":
			return "Blue";
		case "black":
			return "Black";
		case "white":
			return "White";
		case "colorless":
			return "Colorless";
		default:
			throw new Error(`Unknown unary mana type: ${mana}`);
	}
}

export function biManaToColor(mana: BiManaType, gold: boolean): CardColor {
	switch (mana) {
		case "red-green":
			return gold ? "Gold-RG" : "hybrid-RG";
		case "red-blue":
			return gold ? "Gold-UR" : "hybrid-UR";
		case "red-black":
			return gold ? "Gold-BR" : "hybrid-BR";
		case "red-white":
			return gold ? "Gold-RW" : "hybrid-RW";
		case "green-blue":
			return gold ? "Gold-GU" : "hybrid-GU";
		case "green-black":
			return gold ? "Gold-BG" : "hybrid-BG";
		case "green-white":
			return gold ? "Gold-GW" : "hybrid-GW";
		case "blue-black":
			return gold ? "Gold-UB" : "hybrid-UB";
		case "blue-white":
			return gold ? "Gold-UW" : "hybrid-UW";
		case "black-white":
			return gold ? "Gold-WB" : "hybrid-WB";
		default:
			throw new Error(`Unknown unary mana type: ${mana}`);
	}
}

export function getBackgroundFromColor(
	color: CardColor,
	frame: CardFrame,
): CardBackground {
	switch (frame) {
		case "Nonbasic Land":
		case "Basic Land":
			return "Land";
		case "Creature":
		case "Noncreature": {
			switch (color) {
				case "Black":
					return "Black";
				case "Blue":
					return "Blue";
				case "Green":
					return "Green";
				case "Red":
					return "Red";
				case "White":
					return "White";
				case "Colorless":
					return "Artifact";
				case "Multicolored":
					return "Gold";
				default:
					return "Artifact";
			}
		}
	}
}

export function getFrameAndBackgroundFromAspect(
	{ color, frame, legendary }: Card["aspect"],
	cardTitle?: string,
) {
	const background = getBackgroundFromColor(color, frame);

	const isBasicLand = frame === "Basic Land";
	const isNonbasicLand = frame === "Nonbasic Land";
	const isLand = isBasicLand || isNonbasicLand;

	let frameFile = "A"; // default

	if (isNonbasicLand) {
		frameFile = "LC";
	} else if (isBasicLand) {
		const colorToBasicFrame: Record<string, string> = {
			White: "LW",
			Blue: "LU",
			Black: "LB",
			Red: "LR",
			Green: "LG",
			Colorless: "LC",
		};
		frameFile = colorToBasicFrame[color] ?? "LC";
	} else {
		const colorToFrame: Record<string, string> = {
			White: "W",
			Blue: "U",
			Black: "B",
			Green: "G",
			Red: "R",
			Colorless: "A",
			Multicolored: "M",
			"Gold-3+": "M",
			"Gold-RG": "M",
			"Gold-UR": "M",
			"Gold-BR": "M",
			"Gold-RW": "M",
			"Gold-GW": "M",
			"Gold-GU": "M",
			"Gold-UB": "M",
			"Gold-BG": "M",
			"Gold-UW": "M",
			"Gold-WB": "M",
		};

		frameFile = colorToFrame[color] ?? "A";
	}

	return {
		frame: `${
			import.meta.env.VITE_PUBLIC_DIR ?? ""
		}assets/old-frame/${frameFile}.svg`,
		background: `${
			import.meta.env.VITE_PUBLIC_DIR ?? ""
		}assets/images/card-backgrounds/${background}.png`,
	};
}
