// Bus company to model and service class mapping
// Based on real 2024-2025 fleet data

import { BusServiceClass } from '../types/trip.types';

interface BusCompanyMapping {
    defaultModel: string;
    defaultClass: BusServiceClass;
    tier: 'economy' | 'standard' | 'premium' | 'luxury';
}

export const BUS_COMPANY_MAPPINGS: Record<string, BusCompanyMapping> = {
    // ========== LUXURY TIER ==========
    'ETN': {
        defaultModel: 'Volvo 9800 Euro 6',
        defaultClass: 'lujo',
        tier: 'luxury'
    },
    'Turistar Lujo': {
        defaultModel: 'Scania Marcopolo G8',
        defaultClass: 'lujo',
        tier: 'luxury'
    },
    'ADO Platino': {
        defaultModel: 'Irizar i8 Efficient',
        defaultClass: 'lujo',
        tier: 'luxury'
    },

    // ========== PREMIUM TIER (Ejecutivo) ==========
    'ADO GL': {
        defaultModel: 'Irizar i8 Efficient',
        defaultClass: 'ejecutivo',
        tier: 'premium'
    },
    'Futura': {
        defaultModel: 'Irizar i8 Efficient',
        defaultClass: 'ejecutivo',
        tier: 'premium'
    },
    'Primera Plus': {
        defaultModel: 'Irizar i8 Efficient',
        defaultClass: 'ejecutivo',
        tier: 'premium'
    },
    'Elite Select': {
        defaultModel: 'Irizar i8 Efficient',
        defaultClass: 'ejecutivo',
        tier: 'premium'
    },
    'Tufesa Platinum': {
        defaultModel: 'Irizar i8 (Scania K420)',
        defaultClass: 'ejecutivo',
        tier: 'premium'
    },
    'Senda TDN Diamante': {
        defaultModel: 'Irizar i8 (Scania K420)',
        defaultClass: 'ejecutivo',
        tier: 'premium'
    },
    'Estrella de Oro Plus': {
        defaultModel: 'Irizar i8 (Scania K420)',
        defaultClass: 'ejecutivo',
        tier: 'premium'
    },
    'Estrella de Oro Diamante': {
        defaultModel: 'Irizar i8 (Scania K420)',
        defaultClass: 'ejecutivo',
        tier: 'premium'
    },
    'Omnibus de Mexico Plus': {
        defaultModel: 'Irizar i8 (Scania K420)',
        defaultClass: 'ejecutivo',
        tier: 'premium'
    },
    'Oriente Select': {
        defaultModel: 'Irizar i8 (Scania K420)',
        defaultClass: 'ejecutivo',
        tier: 'premium'
    },
    'Transpais Vista': {
        defaultModel: 'Irizar i8 (Scania K420)',
        defaultClass: 'ejecutivo',
        tier: 'premium'
    },
    'Pullman De Morelos Ejecutivo Dorado': {
        defaultModel: 'Irizar i8 (Scania K420)',
        defaultClass: 'ejecutivo',
        tier: 'premium'
    },
    'Noreste Plus': {
        defaultModel: 'Irizar i8 (Scania K420)',
        defaultClass: 'ejecutivo',
        tier: 'premium'
    },

    // ========== STANDARD TIER ==========
    'ADO': {
        defaultModel: 'Volvo B11R',
        defaultClass: 'standard',
        tier: 'standard'
    },
    'Elite': {
        defaultModel: 'Irizar i8 (Scania K420)',
        defaultClass: 'standard',
        tier: 'standard'
    },
    'Tufesa': {
        defaultModel: 'Irizar i8 (Scania K420)',
        defaultClass: 'standard',
        tier: 'standard'
    },
    'Pullman De Morelos': {
        defaultModel: 'Irizar PB',
        defaultClass: 'standard',
        tier: 'standard'
    },
    'Omnibus de Mexico': {
        defaultModel: 'Irizar PB',
        defaultClass: 'standard',
        tier: 'standard'
    },
    'Estrella de Oro': {
        defaultModel: 'Mercedes-Benz LO-916',
        defaultClass: 'standard',
        tier: 'standard'
    },
    'Autovias': {
        defaultModel: 'Irizar PB',
        defaultClass: 'standard',
        tier: 'standard'
    },
    'La Linea': {
        defaultModel: 'Irizar i8 (Scania K420)',
        defaultClass: 'standard',
        tier: 'standard'
    },
    'Chihuahenses': {
        defaultModel: 'Irizar i8 (Scania K420)',
        defaultClass: 'standard',
        tier: 'standard'
    },
    'Anahuac': {
        defaultModel: 'Irizar i8 (Scania K420)',
        defaultClass: 'standard',
        tier: 'standard'
    },
    'Aguacaliente': {
        defaultModel: 'Irizar i8 (Scania K420)',
        defaultClass: 'standard',
        tier: 'standard'
    },
    'Transpais': {
        defaultModel: 'Irizar PB',
        defaultClass: 'standard',
        tier: 'standard'
    },

    // ========== ECONOMY TIER ==========
    'OCC': {
        defaultModel: 'Mercedes-Benz LO-916',
        defaultClass: 'economy',
        tier: 'economy'
    },
    'Frontera': {
        defaultModel: 'Mercedes-Benz LO-916',
        defaultClass: 'economy',
        tier: 'economy'
    },
    'Transportes Frontera': {
        defaultModel: 'Mercedes-Benz LO-916',
        defaultClass: 'economy',
        tier: 'economy'
    },
    'Caminante': {
        defaultModel: 'Mercedes-Benz LO-916',
        defaultClass: 'economy',
        tier: 'economy'
    },
    'Conexion': {
        defaultModel: 'Mercedes-Benz LO-916',
        defaultClass: 'economy',
        tier: 'economy'
    },
    'Noreste': {
        defaultModel: 'Mercedes-Benz LO-916',
        defaultClass: 'economy',
        tier: 'economy'
    },
    'Del Norte': {
        defaultModel: 'Mercedes-Benz LO-916',
        defaultClass: 'economy',
        tier: 'economy'
    },
    'Coordinados': {
        defaultModel: 'Mercedes-Benz LO-916',
        defaultClass: 'economy',
        tier: 'economy'
    },

    // ========== USA BUSES ==========
    'Greyhound': {
        defaultModel: 'MCI J4500',
        defaultClass: 'standard',
        tier: 'standard'
    },
    'Tornado Bus': {
        defaultModel: 'MCI J4500',
        defaultClass: 'standard',
        tier: 'standard'
    },
    'El Expreso': {
        defaultModel: 'Prevost X3-45',
        defaultClass: 'standard',
        tier: 'standard'
    },
    'Flixbus': {
        defaultModel: 'Prevost X3-45',
        defaultClass: 'standard',
        tier: 'standard'
    },
    'Omex VIP': {
        defaultModel: 'Prevost X3-45',
        defaultClass: 'standard',
        tier: 'standard'
    },
};

// Helper function to get bus model and class for a company
export const getBusInfoForCompany = (companyName: string): { busModel: string; busServiceClass: BusServiceClass } | null => {
    const mapping = BUS_COMPANY_MAPPINGS[companyName];
    if (!mapping) return null;

    return {
        busModel: mapping.defaultModel,
        busServiceClass: mapping.defaultClass
    };
};

// Helper to get company tier
export const getCompanyTier = (companyName: string): string => {
    return BUS_COMPANY_MAPPINGS[companyName]?.tier || 'standard';
};
