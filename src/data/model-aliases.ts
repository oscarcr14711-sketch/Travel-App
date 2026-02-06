// Model name aliases - maps detailed variant names to database keys
// This allows using specific model names while reusing amenity data

export const MODEL_NAME_ALIASES: { [key: string]: string } = {
    // Marcopolo variants
    'Marcopolo Mexico G8 Paradiso 1800 DD': 'Marcopolo G8 DD',
    'Marcopolo G8 DD': 'Marcopolo G8 DD',
    'Marcopolo G7 Paradiso 1200': 'Scania Marcopolo G7 1800',
    'Marcopolo G7 MP 1200': 'Scania Marcopolo G7 1800',
    'Marcopolo Paradiso G7 1200': 'Scania Marcopolo G7 1800',
    'Marcopolo Mp 180 MX': 'Scania Marcopolo G7 1800',

    // Volvo variants
    'Volvo 9800': 'Volvo 9800 Euro 6',
    'Volvo 9800 DD': 'Volvo 9800 DD',
    'Volvo 9800 MY DD': 'Volvo 9800 DD',
    'Volvo 9800 Euro 6': 'Volvo 9800 Euro 6',
    'Volvo 9700': 'Volvo 9700',
    'Volvo 9700 Luxury': 'Volvo 9700',
    'Volvo 9700 Grand L': 'Volvo 9700',
    'Volvo 9700 DD': 'Volvo 9700 DD',

    // Irizar variants
    'Irizar i8': 'Irizar i8 Efficient',
    'Irizar i8 Efficient': 'Irizar i8 Efficient',
    'Scania Irizar i8': 'Irizar i8 Efficient',
    'Scania Irizar i8 Efficient': 'Irizar i8 Efficient',
    'MB Irizar i8': 'Irizar i8 Efficient',
    'Irizar i6': 'Irizar i6S',
    'Irizar i6S': 'Irizar i6S',
    'Irizar Pb': 'Irizar i6S',

    // Scania variants
    'Scania Marcopolo G8': 'Scania Marcopolo G8',
    'Scania Marcopolo G7 1800': 'Scania Marcopolo G7 1800',
    'Scania K124': 'Scania K124',

    // Mercedes variants
    'Mercedes-Benz Tourismo RHD': 'Mercedes-Benz Tourismo RHD',
    'Mercedes-Benz LO-916': 'Mercedes-Benz LO-916',
};

// Helper function to normalize model name to database key
export function normalizeModelName(modelName: string): string {
    return MODEL_NAME_ALIASES[modelName] || modelName;
}
