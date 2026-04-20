import { JSX } from "solid-js/jsx-runtime";
import flavorTextDividerUrl from "../../assets/images/flavor-text-divider.png";
import { symbols } from "../../types/symbols";

type RegularDescriptionProps = {
	oracle?: string;
	flavor?: string;
};

function injectSymbols(description: string): JSX.Element {
	return (
		<>
			{description.split(/{([^}]+)}/g).map((word) => {
				if (word in symbols) {
					return (
						<img
							style={{
								width: "2.5mm",
								transform: "translateY(2px)",
								margin: "0 0.1mm",
								display: "initial",
								"vertical-align": "initial",
							}}
							src={symbols[word as keyof typeof symbols]}
						/>
					);
				} else {
					return word;
				}
			})}
		</>
	);
}

export default function RegularDescription(props: RegularDescriptionProps) {
	const totalText = (props.oracle ?? "") + (props.flavor ?? "");
	const totalLength = totalText.length;
	const paragraphs = totalText.split("\n").length - 1;
	const divider = props.flavor && props.oracle ? 1 : 0;

	return (
		<div
			style={{
				display: "flex",
				"flex-direction": "column",
				"justify-content": "center",
				top: "54mm",
				height: "25mm",
				left: "7mm",
				right: "6mm",
				position: "absolute",
				color: "white",
				"--rows": totalLength / 27 + paragraphs * 0.5 + divider * 1,
				"font-size": `clamp(5pt, 92.6px / var(--rows) * 1.2, 9.5pt)`,
				padding: "0.5mm",
				"font-family": "MPlantin",
				"line-height": 0.9,
			}}
		>
			{props.oracle && (
				<div
					style={{
						margin: 0,
						"font-weight": 500,
						display: "flex",
						"flex-direction": "column",
						"white-space": "pre-wrap",
						color: "black",
					}}
				>
					{props.oracle.split("\n").map((paragraph, index) => (
						<p
							style={{
								margin: 0,
								"margin-top": index > 0 ? "1mm" : 0,
								color: "black",
							}}
						>
							{injectSymbols(paragraph)}
						</p>
					))}
				</div>
			)}
			{props.flavor && props.oracle && (
				<img
					src={flavorTextDividerUrl}
					style={{
						"margin-top": "1mm",
						"margin-bottom": "1mm",
					}}
				/>
			)}
			{props.flavor && (
				<p
					style={{
						margin: 0,
						"font-style": "italic",
						"white-space": "pre-wrap",
						color: "black",
					}}
				>
					{props.flavor}
				</p>
			)}
		</div>
	);
}
