import { Show, createSignal } from "solid-js";
import { getFrameAndBackgroundFromAspect } from "../../types/backgrounds";
import { Card } from "../../types/card";
import Art from "./art";
import Metadata from "./metadata";
import RegularDescription from "./regular-description";
import Strength from "./strength";
import TitleBar from "./title-bar";
import TypeBar from "./type-bar";

export default function CardComponent(props: {
	card: Card;
	onClick?: () => void;
	selected?: boolean;
	onVariantChange?: (variant: number) => void;
}) {
	const frameAndBackground = () =>
		getFrameAndBackgroundFromAspect(props.card.aspect, props.card.title);

	const [showVariantNav, setShowVariantNav] = createSignal(false);

	const currentVariant = () => props.card.currentVariant ?? 0;
	const totalVariants = () => props.card.totalVariants ?? 1;

	const nextVariant = () => {
		if (totalVariants() <= 1) return;
		const next = (currentVariant() + 1) % totalVariants();
		props.onVariantChange?.(next);
	};

	const prevVariant = () => {
		if (totalVariants() <= 1) return;
		const prev = (currentVariant() - 1 + totalVariants()) % totalVariants();
		props.onVariantChange?.(prev);
	};

	return (
		<div
			tabIndex={0}
			onClick={props.onClick}
			class="rounded-xl print:rounded-none group outline !focus:outline outline-amber-500 print:outline-none"
			style={{
				position: "relative",
				display: "flex",
				"font-family": "MPlantin",
				"font-size": "12pt",
				"background-color": "var(--card-bgc, #161410)",
				height: "auto",
				width: "var(--card-width)",
				"min-width": "var(--card-width)",
				"max-width": "var(--card-width)",
				"aspect-ratio": "63/88",
				border: "var(--card-bleed) solid var(--card-bgc)",
				"outline-style": props.selected ? "solid" : "none",
				"outline-width": props.selected ? "2px" : "0px",
				margin: "auto",
				"box-sizing": "content-box",
			}}
			onMouseEnter={() => setShowVariantNav(true)}
			onMouseLeave={() => setShowVariantNav(false)}
		>
			<Show when={!props.card.overrideWithScanUrl}>
				<img
					style={{
						width: "100%",
						height: "100%",
						position: "absolute",
						top: 0,
						left: 0,
					}}
					src={frameAndBackground().background}
				/>
				{/* Black mask for the bottom of the card */}
				<div
					style={{
						bottom: "4.5mm",
						height: "2mm",
						left: "0",
						right: "0",
						position: "absolute",
						background: 'var(--card-bgc, "black")',
					}}
				/>
				{props.card.artUrl && (
					<Art url={props.card.artUrl} category={props.card.category} />
				)}
				<img
					style={{
						width: "100%",
						height: "100%",
						position: "absolute",
						top: 0,
						left: 0,
					}}
					src={frameAndBackground().frame}
				/>
				<TitleBar
					title={props.card.title}
					manaCost={props.card.manaCost}
					category={props.card.category}
				/>
				<TypeBar type={props.card.typeText} category={props.card.category} />
				<Show when={props.card.aspect.frame !== "Basic Land"}>
					<RegularDescription
						flavor={props.card.flavorText}
						oracle={props.card.oracleText}
					/>
				</Show>
				<Show when={!!props.card.power || !!props.card.toughness}>
					<Strength
						power={props.card.power}
						toughness={props.card.toughness}
						textColor="black"
					/>
				</Show>
				<Metadata {...props.card} />
				<Show when={showVariantNav() && totalVariants() > 1}>
					<div
						style={{
							position: "absolute",
							top: "30%",
							left: 0,
							right: 0,
							display: "flex",
							"justify-content": "space-between",
							"align-items": "center",
							padding: "0 5px",
							"z-index": 100,
						}}
					>
						<button
							onClick={(e) => {
								e.stopPropagation();
								prevVariant();
							}}
							style={{
								background: "rgba(0,0,0,0.7)",
								color: "white",
								border: "none",
								"border-radius": "50%",
								width: "24px",
								height: "24px",
								cursor: "pointer",
								"font-size": "14px",
							}}
						>
							‹
						</button>
						<span
							style={{
								color: "white",
								"font-size": "10px",
								background: "rgba(0,0,0,0.7)",
								padding: "2px 6px",
								"border-radius": "10px",
							}}
						>
							{currentVariant() + 1}/{totalVariants()}
						</span>
						<button
							onClick={(e) => {
								e.stopPropagation();
								nextVariant();
							}}
							style={{
								background: "rgba(0,0,0,0.7)",
								color: "white",
								border: "none",
								"border-radius": "50%",
								width: "24px",
								height: "24px",
								cursor: "pointer",
								"font-size": "14px",
							}}
						>
							›
						</button>
					</div>
				</Show>
			</Show>
			<Show when={props.card.overrideWithScanUrl}>
				<img
					class="rounded-xl"
					src={props.card.overrideWithScanUrl}
					alt={props.card.title}
				/>
			</Show>
		</div>
	);
}
