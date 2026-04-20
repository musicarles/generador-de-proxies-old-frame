export default function InfoTab() {
	return (
		<div class="flex flex-1 flex-col gap-2 mt-3 text-stone-200">
			<p>
				Quan imprimiris,posa els marges a "Cap" i l'escala de la pàgina a "100%".
				(L'aplicació s'encarrega de la mida i els marges)
				<br />
				Les cartes tenen un sangrat de 1mm, així que pots tallar-les amb seguretat.
			</p>
			<p>
				La caixa de cerca suporta tota la{" "}
				<a
					class="text-white font-bold hover:underline"
					href="https://scryfall.com/docs/syntax"
				>
					sintaxi de cerca de Scryfall
				</a>
				. Si no veus una carta a la llista, vol dir que no està disponible a
				Scryfall. (Els tokens només existeixen en anglès, per exemple)
			</p>
			<div>
				<span>Veus un error? Tens una sol·licitud de funció? </span>

				<ul class="h-10 mt-2 list-disc">
					<li>
						<a
							href="https://github.com/QuentinWidlocher/mtg-proxy-maker"
							class="font-bold hover:underline text-white"
						>
							Obrir una incidència a GitHub
						</a>
					</li>
					<li>
						<a
							href="mailto:quentin@widlocher.com"
							class="font-bold hover:underline text-white"
						>
							Enviar-me un correu
						</a>
					</li>
				</ul>
			</div>
			<p class="text-xs mt-auto text-stone-300">
				La informació literal i gràfica presentada en aquest lloc sobre
				Magic: The Gathering, incloent imatges de cartes, symbols de màgia i text d'Oracle
				és propietat intel·lectual de Wizards of the Coast, LLC, filial d'Hasbro,
				Inc. MTG Proxy Maker no és prodüit ni recolzat per Wizards of the
				Coast.
			</p>{" "}
		</div>
	);
}
