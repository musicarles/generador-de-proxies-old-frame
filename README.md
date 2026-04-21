# MTG Proxy Maker - Old Frame

Generador de proxies d'alta qualitat amb **old frame** per a Premodern i Old School.

Adaptació del [projecte original](https://github.com/QuentinWidlocher/mtg-proxy-maker) optimitzada per a formats antics de Magic: The Gathering.

## Funcionalitats

- Cercar cartes per nom a Scryfall
- Importar llistes en format MTGO
- Suport multilingüe (10 idiomes)
- Frame antic (old frame) per a totes les cartes
- Basic Lands: Plains (LW), Island (LU), Swamp (LB), Mountain (LR), Forest (LG)
- Crear i editar cartes personalitzades
- Imprimir amb mida estàndard (63mm x 88mm)

## Com fer servir

1. Obrir l'aplicació
2. Seleccionar l'idioma de les cartes
3. Cercar cartes o importar llista MTGO
4. Imprimir: margins a "Cap" i escala a "100%"

## Diferències amb l'original

- Només 4 tipus de frame: Basic Land, Nonbasic Land, Creature, Noncreature
- 7 colors: Black, Blue, Green, Red, White, Colorless, Multicolored
- Frames antics (LW, LU, LB, LR, LG, LC)
- Codi netificat (~140 fitxers vs 200+)
- Sense PWA, sense Firebase

## Desplegar

```bash
pnpm install
pnpm build
# El resultat a dist/ es pot penjar a qualsevol hosting
```

## Llicència

La informació gràfica i textual de Magic: The Gathering és propietat de Wizards of the Coast.
Aquesta eina no és produïda ni recolzada per Wizards of the Coast.