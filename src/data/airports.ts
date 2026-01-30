export interface Airport {
    code: string;
    name: string;
    city: string;
    country: string;
}

export const AIRPORTS: Airport[] = [
    // USA - Major Hubs (Top 20)
    { code: 'ATL', name: 'Hartsfield-Jackson Atlanta International Airport', city: 'Atlanta', country: 'United States' },
    { code: 'LAX', name: 'Los Angeles International Airport', city: 'Los Angeles', country: 'United States' },
    { code: 'ORD', name: 'O\'Hare International Airport', city: 'Chicago', country: 'United States' },
    { code: 'DFW', name: 'Dallas/Fort Worth International Airport', city: 'Dallas', country: 'United States' },
    { code: 'DEN', name: 'Denver International Airport', city: 'Denver', country: 'United States' },
    { code: 'JFK', name: 'John F. Kennedy International Airport', city: 'New York', country: 'United States' },
    { code: 'SFO', name: 'San Francisco International Airport', city: 'San Francisco', country: 'United States' },
    { code: 'SEA', name: 'Seattle-Tacoma International Airport', city: 'Seattle', country: 'United States' },
    { code: 'MCO', name: 'Orlando International Airport', city: 'Orlando', country: 'United States' },
    { code: 'LAS', name: 'Harry Reid International Airport', city: 'Las Vegas', country: 'United States' },
    { code: 'CLT', name: 'Charlotte Douglas International Airport', city: 'Charlotte', country: 'United States' },
    { code: 'EWR', name: 'Newark Liberty International Airport', city: 'Newark', country: 'United States' },
    { code: 'PHX', name: 'Phoenix Sky Harbor International Airport', city: 'Phoenix', country: 'United States' },
    { code: 'IAH', name: 'George Bush Intercontinental Airport', city: 'Houston', country: 'United States' },
    { code: 'MIA', name: 'Miami International Airport', city: 'Miami', country: 'United States' },
    { code: 'BOS', name: 'Logan International Airport', city: 'Boston', country: 'United States' },
    { code: 'MSP', name: 'Minneapolis-Saint Paul International Airport', city: 'Minneapolis', country: 'United States' },
    { code: 'DTW', name: 'Detroit Metropolitan Airport', city: 'Detroit', country: 'United States' },
    { code: 'PHL', name: 'Philadelphia International Airport', city: 'Philadelphia', country: 'United States' },
    { code: 'LGA', name: 'LaGuardia Airport', city: 'New York', country: 'United States' },

    // USA - All 50 States (at least 1 major airport per state)
    // Alabama
    { code: 'BHM', name: 'Birmingham-Shuttlesworth International Airport', city: 'Birmingham', country: 'United States' },
    // Alaska
    { code: 'ANC', name: 'Ted Stevens Anchorage International Airport', city: 'Anchorage', country: 'United States' },
    // Arizona (already have PHX)
    { code: 'TUS', name: 'Tucson International Airport', city: 'Tucson', country: 'United States' },
    // Arkansas
    { code: 'LIT', name: 'Bill and Hillary Clinton National Airport', city: 'Little Rock', country: 'United States' },
    // California (already have LAX, SFO)
    { code: 'SAN', name: 'San Diego International Airport', city: 'San Diego', country: 'United States' },
    { code: 'SJC', name: 'Norman Y. Mineta San Jose International Airport', city: 'San Jose', country: 'United States' },
    { code: 'OAK', name: 'Oakland International Airport', city: 'Oakland', country: 'United States' },
    { code: 'BUR', name: 'Hollywood Burbank Airport', city: 'Burbank', country: 'United States' },
    { code: 'ONT', name: 'Ontario International Airport', city: 'Ontario', country: 'United States' },
    { code: 'SMF', name: 'Sacramento International Airport', city: 'Sacramento', country: 'United States' },
    // Colorado (already have DEN)
    { code: 'COS', name: 'Colorado Springs Airport', city: 'Colorado Springs', country: 'United States' },
    // Connecticut
    { code: 'BDL', name: 'Bradley International Airport', city: 'Hartford', country: 'United States' },
    // Delaware (use PHL)
    // Florida (already have MIA, MCO)
    { code: 'FLL', name: 'Fort Lauderdale-Hollywood International Airport', city: 'Fort Lauderdale', country: 'United States' },
    { code: 'TPA', name: 'Tampa International Airport', city: 'Tampa', country: 'United States' },
    { code: 'JAX', name: 'Jacksonville International Airport', city: 'Jacksonville', country: 'United States' },
    { code: 'PBI', name: 'Palm Beach International Airport', city: 'West Palm Beach', country: 'United States' },
    // Georgia (already have ATL)
    { code: 'SAV', name: 'Savannah/Hilton Head International Airport', city: 'Savannah', country: 'United States' },
    // Hawaii
    { code: 'HNL', name: 'Daniel K. Inouye International Airport', city: 'Honolulu', country: 'United States' },
    { code: 'OGG', name: 'Kahului Airport', city: 'Maui', country: 'United States' },
    // Idaho
    { code: 'BOI', name: 'Boise Airport', city: 'Boise', country: 'United States' },
    // Illinois (already have ORD)
    { code: 'MDW', name: 'Chicago Midway International Airport', city: 'Chicago', country: 'United States' },
    // Indiana
    { code: 'IND', name: 'Indianapolis International Airport', city: 'Indianapolis', country: 'United States' },
    // Iowa
    { code: 'DSM', name: 'Des Moines International Airport', city: 'Des Moines', country: 'United States' },
    // Kansas
    { code: 'MCI', name: 'Kansas City International Airport', city: 'Kansas City', country: 'United States' },
    // Kentucky
    { code: 'SDF', name: 'Louisville Muhammad Ali International Airport', city: 'Louisville', country: 'United States' },
    // Louisiana
    { code: 'MSY', name: 'Louis Armstrong New Orleans International Airport', city: 'New Orleans', country: 'United States' },
    // Maine
    { code: 'PWM', name: 'Portland International Jetport', city: 'Portland', country: 'United States' },
    // Maryland
    { code: 'BWI', name: 'Baltimore/Washington International Airport', city: 'Baltimore', country: 'United States' },
    // Massachusetts (already have BOS)
    // Michigan (already have DTW)
    { code: 'GRR', name: 'Gerald R. Ford International Airport', city: 'Grand Rapids', country: 'United States' },
    // Minnesota (already have MSP)
    // Mississippi
    { code: 'JAN', name: 'Jackson-Medgar Wiley Evers International Airport', city: 'Jackson', country: 'United States' },
    // Missouri (already have MCI)
    { code: 'STL', name: 'St. Louis Lambert International Airport', city: 'St. Louis', country: 'United States' },
    // Montana
    { code: 'BIL', name: 'Billings Logan International Airport', city: 'Billings', country: 'United States' },
    // Nebraska
    { code: 'OMA', name: 'Eppley Airfield', city: 'Omaha', country: 'United States' },
    // Nevada (already have LAS)
    { code: 'RNO', name: 'Reno-Tahoe International Airport', city: 'Reno', country: 'United States' },
    // New Hampshire
    { code: 'MHT', name: 'Manchester-Boston Regional Airport', city: 'Manchester', country: 'United States' },
    // New Jersey (already have EWR)
    // New Mexico
    { code: 'ABQ', name: 'Albuquerque International Sunport', city: 'Albuquerque', country: 'United States' },
    // New York (already have JFK, LGA, EWR)
    { code: 'BUF', name: 'Buffalo Niagara International Airport', city: 'Buffalo', country: 'United States' },
    { code: 'ROC', name: 'Greater Rochester International Airport', city: 'Rochester', country: 'United States' },
    { code: 'ALB', name: 'Albany International Airport', city: 'Albany', country: 'United States' },
    // North Carolina (already have CLT)
    { code: 'RDU', name: 'Raleigh-Durham International Airport', city: 'Raleigh', country: 'United States' },
    // North Dakota
    { code: 'FAR', name: 'Hector International Airport', city: 'Fargo', country: 'United States' },
    // Ohio
    { code: 'CMH', name: 'John Glenn Columbus International Airport', city: 'Columbus', country: 'United States' },
    { code: 'CLE', name: 'Cleveland Hopkins International Airport', city: 'Cleveland', country: 'United States' },
    { code: 'CVG', name: 'Cincinnati/Northern Kentucky International Airport', city: 'Cincinnati', country: 'United States' },
    // Oklahoma
    { code: 'OKC', name: 'Will Rogers World Airport', city: 'Oklahoma City', country: 'United States' },
    { code: 'TUL', name: 'Tulsa International Airport', city: 'Tulsa', country: 'United States' },
    // Oregon
    { code: 'PDX', name: 'Portland International Airport', city: 'Portland', country: 'United States' },
    // Pennsylvania (already have PHL)
    { code: 'PIT', name: 'Pittsburgh International Airport', city: 'Pittsburgh', country: 'United States' },
    // Rhode Island
    { code: 'PVD', name: 'T. F. Green Airport', city: 'Providence', country: 'United States' },
    // South Carolina
    { code: 'CHS', name: 'Charleston International Airport', city: 'Charleston', country: 'United States' },
    // South Dakota
    { code: 'FSD', name: 'Sioux Falls Regional Airport', city: 'Sioux Falls', country: 'United States' },
    // Tennessee
    { code: 'BNA', name: 'Nashville International Airport', city: 'Nashville', country: 'United States' },
    { code: 'MEM', name: 'Memphis International Airport', city: 'Memphis', country: 'United States' },
    // Texas (already have DFW, IAH)
    { code: 'AUS', name: 'Austin-Bergstrom International Airport', city: 'Austin', country: 'United States' },
    { code: 'SAT', name: 'San Antonio International Airport', city: 'San Antonio', country: 'United States' },
    { code: 'ELP', name: 'El Paso International Airport', city: 'El Paso', country: 'United States' },
    { code: 'DAL', name: 'Dallas Love Field', city: 'Dallas', country: 'United States' },
    // Utah
    { code: 'SLC', name: 'Salt Lake City International Airport', city: 'Salt Lake City', country: 'United States' },
    // Vermont
    { code: 'BTV', name: 'Burlington International Airport', city: 'Burlington', country: 'United States' },
    // Virginia
    { code: 'IAD', name: 'Washington Dulles International Airport', city: 'Washington', country: 'United States' },
    { code: 'DCA', name: 'Ronald Reagan Washington National Airport', city: 'Washington', country: 'United States' },
    { code: 'ORF', name: 'Norfolk International Airport', city: 'Norfolk', country: 'United States' },
    { code: 'RIC', name: 'Richmond International Airport', city: 'Richmond', country: 'United States' },
    // Washington (already have SEA)
    { code: 'GEG', name: 'Spokane International Airport', city: 'Spokane', country: 'United States' },
    // West Virginia
    { code: 'CRW', name: 'Yeager Airport', city: 'Charleston', country: 'United States' },
    // Wisconsin
    { code: 'MKE', name: 'Milwaukee Mitchell International Airport', city: 'Milwaukee', country: 'United States' },
    // Wyoming
    { code: 'JAC', name: 'Jackson Hole Airport', city: 'Jackson', country: 'United States' },

    // Mexico - Major Cities
    { code: 'MEX', name: 'Mexico City International Airport', city: 'Mexico City', country: 'Mexico' },
    { code: 'CUN', name: 'Cancún International Airport', city: 'Cancún', country: 'Mexico' },
    { code: 'GDL', name: 'Guadalajara International Airport', city: 'Guadalajara', country: 'Mexico' },
    { code: 'MTY', name: 'Monterrey International Airport', city: 'Monterrey', country: 'Mexico' },
    { code: 'TIJ', name: 'Tijuana International Airport', city: 'Tijuana', country: 'Mexico' },
    { code: 'PVR', name: 'Puerto Vallarta International Airport', city: 'Puerto Vallarta', country: 'Mexico' },
    { code: 'SJD', name: 'Los Cabos International Airport', city: 'Cabo San Lucas', country: 'Mexico' },
    { code: 'MZT', name: 'Mazatlán International Airport', city: 'Mazatlán', country: 'Mexico' },

    // International - Major Hubs
    { code: 'LHR', name: 'Heathrow Airport', city: 'London', country: 'United Kingdom' },
    { code: 'CDG', name: 'Charles de Gaulle Airport', city: 'Paris', country: 'France' },
    { code: 'AMS', name: 'Amsterdam Airport Schiphol', city: 'Amsterdam', country: 'Netherlands' },
    { code: 'FRA', name: 'Frankfurt Airport', city: 'Frankfurt', country: 'Germany' },
    { code: 'DXB', name: 'Dubai International Airport', city: 'Dubai', country: 'United Arab Emirates' },
    { code: 'HND', name: 'Haneda Airport', city: 'Tokyo', country: 'Japan' },
    { code: 'NRT', name: 'Narita International Airport', city: 'Tokyo', country: 'Japan' },
    { code: 'SIN', name: 'Singapore Changi Airport', city: 'Singapore', country: 'Singapore' },
    { code: 'ICN', name: 'Incheon International Airport', city: 'Seoul', country: 'South Korea' },
    { code: 'YYZ', name: 'Toronto Pearson International Airport', city: 'Toronto', country: 'Canada' },
    { code: 'YVR', name: 'Vancouver International Airport', city: 'Vancouver', country: 'Canada' },
    { code: 'SYD', name: 'Sydney Airport', city: 'Sydney', country: 'Australia' },
];
