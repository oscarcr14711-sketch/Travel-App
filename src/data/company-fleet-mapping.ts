// Mapping of bus companies to their fleet models
// This allows showing multiple possible buses for uncertainty cases

export interface CompanyFleet {
    company: string;
    models: string[]; // Bus model names matching keys in BUS_MODELS_DATABASE
    tier: 'luxury' | 'premium' | 'standard' | 'economy';
}

export const COMPANY_FLEET_MAPPING: CompanyFleet[] = [
    // ========== LUXURY TIER ==========
    {
        company: 'ETN',
        models: ['Volvo 9800', 'Volvo 9800 DD', 'Marcopolo Mexico G8 Paradiso 1800 DD'],
        tier: 'luxury'
    },
    {
        company: 'Turistar Lujo',
        models: ['Volvo 9800', 'Volvo 9800 DD', 'Marcopolo Mexico G8 Paradiso 1800 DD', 'Irizar i8 Efficient'],
        tier: 'luxury'
    },
    {
        company: 'ADO Platino',
        models: ['Scania Irizar i8 Efficient', 'Irizar i8'],
        tier: 'luxury'
    },
    {
        company: 'Tufesa Platinum',
        models: ['Volvo 9800', 'Marcopolo Mexico G8 Paradiso 1800 DD'],
        tier: 'luxury'
    },
    {
        company: 'Tufesa Titanium',
        models: ['Irizar i8', 'Volvo 9800 DD'],
        tier: 'luxury'
    },
    {
        company: 'Elite Select',
        models: ['Irizar i8'],
        tier: 'luxury'
    },
    {
        company: 'Estrella de Oro Diamante',
        models: ['Scania Irizar i8 Efficient', 'Volvo 9800'],
        tier: 'luxury'
    },
    {
        company: 'Omnibus de Mexico Plus',
        models: ['Volvo 9800', 'Volvo 9800 DD'],
        tier: 'luxury'
    },
    {
        company: 'Noreste Plus',
        models: ['Volvo 9800', 'Volvo 9800 DD'],
        tier: 'luxury'
    },
    {
        company: 'Pullman De Morelos Ejecutivo Dorado',
        models: ['Volvo 9800', 'Volvo 9700 Grand L'],
        tier: 'luxury'
    },
    {
        company: 'Transpais Vista',
        models: ['Marcopolo Mexico G8 Paradiso 1800 DD', 'Marcopolo Mp 180 MX'],
        tier: 'luxury'
    },
    {
        company: 'Futura Select',
        models: ['Irizar i8 Efficient', 'Volvo 9800 MY DD', 'Volvo 9800 DD', 'Scania Irizar i8'],
        tier: 'luxury'
    },
    {
        company: 'Primera Plus',
        models: ['Volvo 9800 Euro 6', 'Irizar i8 Efficient'],
        tier: 'luxury'
    },
    {
        company: 'Parhikuni Platinum',
        models: ['Volvo 9800', 'Scania Irizar i8'],
        tier: 'luxury'
    },

    // ========== PREMIUM/STANDARD TIER ==========
    {
        company: 'Oriente Select',
        models: ['MB Irizar i8', 'Marcopolo G7 Paradiso 1200'],
        tier: 'premium'
    },
    {
        company: 'Senda TDN Diamante',
        models: ['Irizar i6', 'Marcopolo G7 MP 1200'],
        tier: 'premium'
    },
    {
        company: 'ADO',
        models: ['Irizar i8 Efficient', 'Volvo 9800'],
        tier: 'premium'
    },
    {
        company: 'ADO GL',
        models: ['Irizar i8 Efficient', 'Irizar i8'],
        tier: 'premium'
    },
    {
        company: 'Futura',
        models: ['Marcopolo G7 MP 1200'],
        tier: 'premium'
    },
    {
        company: 'Pullman De Morelos',
        models: ['Volvo 9800'],
        tier: 'premium'
    },
    {
        company: 'Omnibus de Mexico',
        models: ['Volvo 9700 Luxury', 'Irizar Pb'],
        tier: 'premium'
    },
    {
        company: 'Chihuahenses Select',
        models: ['Irizar i8'],
        tier: 'premium'
    },
    {
        company: 'Tufesa Plus',
        models: ['Volvo 9800'],
        tier: 'premium'
    },
    {
        company: 'Tufesa Megaplus',
        models: ['Volvo 9800 DD'],
        tier: 'premium'
    },
    {
        company: 'Estrella de Oro',
        models: ['Volvo 9700 Luxury'],
        tier: 'standard'
    },
    {
        company: 'Estrella de Oro Plus',
        models: ['Volvo 9800', 'Irizar i8'],
        tier: 'premium'
    },
    {
        company: 'Autovias',
        models: ['Volvo 9800', 'Marcopolo Mexico G8 Paradiso 1800 DD'],
        tier: 'premium'
    },
    {
        company: 'La Linea',
        models: ['Marcopolo Mp 180 MX'],
        tier: 'standard'
    },

    // ========== REGIONAL/ECONOMY TIER ==========
    {
        company: 'OCC',
        models: ['Irizar i6'],
        tier: 'standard'
    },
    {
        company: 'Caminante',
        models: ['Volvo 9800', 'Irizar i8'],
        tier: 'standard'
    },
    {
        company: 'Conexion',
        models: ['Marcopolo G7 Paradiso 1200'],
        tier: 'standard'
    },
    {
        company: 'Noreste',
        models: ['Volvo 9700 Grand L', 'Irizar i8'],
        tier: 'standard'
    },
    {
        company: 'Anahuac',
        models: ['Irizar i8'],
        tier: 'standard'
    },
    {
        company: 'Aguacaliente',
        models: ['Irizar i8'],
        tier: 'standard'
    },
    {
        company: 'Transportes Frontera',
        models: ['Irizar i6'],
        tier: 'economy'
    },
    {
        company: 'Transpais',
        models: ['Marcopolo Paradiso G7 1200'],
        tier: 'standard'
    },
    {
        company: 'Del Norte',
        models: ['Volvo 9700 Grand L'],
        tier: 'standard'
    },
    {
        company: 'Coordinados',
        models: ['Irizar i6', 'Irizar Pb'],
        tier: 'economy'
    },

    // ========== USA COMPANIES (Defaults for now) ==========
    {
        company: 'Greyhound',
        models: ['Volvo 9700', 'Mercedes-Benz Tourismo RHD'],
        tier: 'standard'
    },
    {
        company: 'Flixbus',
        models: ['Volvo 9700', 'Scania K124'],
        tier: 'standard'
    },
    {
        company: 'Tornado Bus',
        models: ['Volvo 9700'],
        tier: 'standard'
    },
    {
        company: 'El Expreso',
        models: ['Volvo 9700'],
        tier: 'standard'
    },
    {
        company: 'Omex VIP',
        models: ['Volvo 9800'],
        tier: 'premium'
    },
];

// Helper function to get fleet for a company
export function getCompanyFleet(companyName: string): CompanyFleet | undefined {
    return COMPANY_FLEET_MAPPING.find(
        fleet => fleet.company.toLowerCase() === companyName.toLowerCase()
    );
}

// Helper function to get all possible models for a company
export function getCompanyModels(companyName: string): string[] {
    const fleet = getCompanyFleet(companyName);
    return fleet?.models || [];
}
