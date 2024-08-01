const rawMaps = [
    'urban',
    'aquatica',
    'boo',
    'chronon',
    'dojo',
    'fortress',
    'galaxy',
    'hyperfrost',
    'sorcery',
    'treehouse',
    'atlantis',
    'flora',
    'stumped',
    'tundra'
] as const;
type RawMap = typeof rawMaps[number];

type Map = RawMap | RawMap[];

const maps: Map[] = [
    'urban',
    ['aquatica', 'dojo'],
    ['sorcery', 'boo'],
    'chronon',
    'fortress',
    'galaxy',
    'hyperfrost',
    'treehouse',
    'atlantis',
    'flora',
    'stumped',
    'tundra'
];

export { maps, rawMaps, Map, RawMap };