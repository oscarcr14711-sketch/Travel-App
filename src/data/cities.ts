export interface City {
    name: string;
    state?: string;
    country: string;
}

export const CITIES: City[] = [
    // USA - All 50 States (Capital + Largest City when different)
    // Alabama
    { name: 'Birmingham', state: 'AL', country: 'United States' },
    { name: 'Montgomery', state: 'AL', country: 'United States' },
    // Alaska
    { name: 'Anchorage', state: 'AK', country: 'United States' },
    { name: 'Juneau', state: 'AK', country: 'United States' },
    // Arizona
    { name: 'Phoenix', state: 'AZ', country: 'United States' },
    { name: 'Tucson', state: 'AZ', country: 'United States' },
    { name: 'Mesa', state: 'AZ', country: 'United States' },
    { name: 'Scottsdale', state: 'AZ', country: 'United States' },
    // Arkansas
    { name: 'Little Rock', state: 'AR', country: 'United States' },
    // California
    { name: 'Los Angeles', state: 'CA', country: 'United States' },
    { name: 'San Francisco', state: 'CA', country: 'United States' },
    { name: 'San Diego', state: 'CA', country: 'United States' },
    { name: 'San Jose', state: 'CA', country: 'United States' },
    { name: 'Sacramento', state: 'CA', country: 'United States' },
    { name: 'Oakland', state: 'CA', country: 'United States' },
    { name: 'Fresno', state: 'CA', country: 'United States' },
    { name: 'Long Beach', state: 'CA', country: 'United States' },
    { name: 'Burbank', state: 'CA', country: 'United States' },
    { name: 'Ontario', state: 'CA', country: 'United States' },
    // Colorado
    { name: 'Denver', state: 'CO', country: 'United States' },
    { name: 'Colorado Springs', state: 'CO', country: 'United States' },
    // Connecticut
    { name: 'Hartford', state: 'CT', country: 'United States' },
    { name: 'Bridgeport', state: 'CT', country: 'United States' },
    // Delaware
    { name: 'Wilmington', state: 'DE', country: 'United States' },
    { name: 'Dover', state: 'DE', country: 'United States' },
    // Florida
    { name: 'Miami', state: 'FL', country: 'United States' },
    { name: 'Orlando', state: 'FL', country: 'United States' },
    { name: 'Tampa', state: 'FL', country: 'United States' },
    { name: 'Jacksonville', state: 'FL', country: 'United States' },
    { name: 'Fort Lauderdale', state: 'FL', country: 'United States' },
    { name: 'West Palm Beach', state: 'FL', country: 'United States' },
    // Georgia
    { name: 'Atlanta', state: 'GA', country: 'United States' },
    { name: 'Savannah', state: 'GA', country: 'United States' },
    // Hawaii
    { name: 'Honolulu', state: 'HI', country: 'United States' },
    { name: 'Maui', state: 'HI', country: 'United States' },
    // Idaho
    { name: 'Boise', state: 'ID', country: 'United States' },
    // Illinois
    { name: 'Chicago', state: 'IL', country: 'United States' },
    { name: 'Springfield', state: 'IL', country: 'United States' },
    // Indiana
    { name: 'Indianapolis', state: 'IN', country: 'United States' },
    // Iowa
    { name: 'Des Moines', state: 'IA', country: 'United States' },
    // Kansas
    { name: 'Kansas City', state: 'KS', country: 'United States' },
    { name: 'Wichita', state: 'KS', country: 'United States' },
    // Kentucky
    { name: 'Louisville', state: 'KY', country: 'United States' },
    { name: 'Frankfort', state: 'KY', country: 'United States' },
    // Louisiana
    { name: 'New Orleans', state: 'LA', country: 'United States' },
    { name: 'Baton Rouge', state: 'LA', country: 'United States' },
    // Maine
    { name: 'Portland', state: 'ME', country: 'United States' },
    { name: 'Augusta', state: 'ME', country: 'United States' },
    // Maryland
    { name: 'Baltimore', state: 'MD', country: 'United States' },
    { name: 'Annapolis', state: 'MD', country: 'United States' },
    // Massachusetts
    { name: 'Boston', state: 'MA', country: 'United States' },
    // Michigan
    { name: 'Detroit', state: 'MI', country: 'United States' },
    { name: 'Grand Rapids', state: 'MI', country: 'United States' },
    { name: 'Lansing', state: 'MI', country: 'United States' },
    // Minnesota
    { name: 'Minneapolis', state: 'MN', country: 'United States' },
    { name: 'Saint Paul', state: 'MN', country: 'United States' },
    // Mississippi
    { name: 'Jackson', state: 'MS', country: 'United States' },
    // Missouri
    { name: 'Kansas City', state: 'MO', country: 'United States' },
    { name: 'St. Louis', state: 'MO', country: 'United States' },
    // Montana
    { name: 'Billings', state: 'MT', country: 'United States' },
    // Nebraska
    { name: 'Omaha', state: 'NE', country: 'United States' },
    { name: 'Lincoln', state: 'NE', country: 'United States' },
    // Nevada
    { name: 'Las Vegas', state: 'NV', country: 'United States' },
    { name: 'Reno', state: 'NV', country: 'United States' },
    // New Hampshire
    { name: 'Manchester', state: 'NH', country: 'United States' },
    { name: 'Concord', state: 'NH', country: 'United States' },
    // New Jersey
    { name: 'Newark', state: 'NJ', country: 'United States' },
    { name: 'Jersey City', state: 'NJ', country: 'United States' },
    // New Mexico
    { name: 'Albuquerque', state: 'NM', country: 'United States' },
    { name: 'Santa Fe', state: 'NM', country: 'United States' },
    // New York
    { name: 'New York', state: 'NY', country: 'United States' },
    { name: 'Buffalo', state: 'NY', country: 'United States' },
    { name: 'Rochester', state: 'NY', country: 'United States' },
    { name: 'Albany', state: 'NY', country: 'United States' },
    // North Carolina
    { name: 'Charlotte', state: 'NC', country: 'United States' },
    { name: 'Raleigh', state: 'NC', country: 'United States' },
    { name: 'Durham', state: 'NC', country: 'United States' },
    // North Dakota
    { name: 'Fargo', state: 'ND', country: 'United States' },
    { name: 'Bismarck', state: 'ND', country: 'United States' },
    // Ohio
    { name: 'Columbus', state: 'OH', country: 'United States' },
    { name: 'Cleveland', state: 'OH', country: 'United States' },
    { name: 'Cincinnati', state: 'OH', country: 'United States' },
    // Oklahoma
    { name: 'Oklahoma City', state: 'OK', country: 'United States' },
    { name: 'Tulsa', state: 'OK', country: 'United States' },
    // Oregon
    { name: 'Portland', state: 'OR', country: 'United States' },
    { name: 'Salem', state: 'OR', country: 'United States' },
    // Pennsylvania
    { name: 'Philadelphia', state: 'PA', country: 'United States' },
    { name: 'Pittsburgh', state: 'PA', country: 'United States' },
    { name: 'Harrisburg', state: 'PA', country: 'United States' },
    // Rhode Island
    { name: 'Providence', state: 'RI', country: 'United States' },
    // South Carolina
    { name: 'Charleston', state: 'SC', country: 'United States' },
    { name: 'Columbia', state: 'SC', country: 'United States' },
    // South Dakota
    { name: 'Sioux Falls', state: 'SD', country: 'United States' },
    { name: 'Pierre', state: 'SD', country: 'United States' },
    // Tennessee
    { name: 'Nashville', state: 'TN', country: 'United States' },
    { name: 'Memphis', state: 'TN', country: 'United States' },
    // Texas
    { name: 'Houston', state: 'TX', country: 'United States' },
    { name: 'Dallas', state: 'TX', country: 'United States' },
    { name: 'San Antonio', state: 'TX', country: 'United States' },
    { name: 'Austin', state: 'TX', country: 'United States' },
    { name: 'Fort Worth', state: 'TX', country: 'United States' },
    { name: 'El Paso', state: 'TX', country: 'United States' },
    { name: 'Arlington', state: 'TX', country: 'United States' },
    // Utah
    { name: 'Salt Lake City', state: 'UT', country: 'United States' },
    // Vermont
    { name: 'Burlington', state: 'VT', country: 'United States' },
    { name: 'Montpelier', state: 'VT', country: 'United States' },
    // Virginia
    { name: 'Washington', state: 'VA', country: 'United States' },
    { name: 'Virginia Beach', state: 'VA', country: 'United States' },
    { name: 'Norfolk', state: 'VA', country: 'United States' },
    { name: 'Richmond', state: 'VA', country: 'United States' },
    // Washington
    { name: 'Seattle', state: 'WA', country: 'United States' },
    { name: 'Spokane', state: 'WA', country: 'United States' },
    { name: 'Olympia', state: 'WA', country: 'United States' },
    // West Virginia
    { name: 'Charleston', state: 'WV', country: 'United States' },
    // Wisconsin
    { name: 'Milwaukee', state: 'WI', country: 'United States' },
    { name: 'Madison', state: 'WI', country: 'United States' },
    // Wyoming
    { name: 'Jackson', state: 'WY', country: 'United States' },
    { name: 'Cheyenne', state: 'WY', country: 'United States' },

    // Mexico - Major Cities
    { name: 'Mexico City', country: 'Mexico' },
    { name: 'Guadalajara', country: 'Mexico' },
    { name: 'Monterrey', country: 'Mexico' },
    { name: 'Puebla', country: 'Mexico' },
    { name: 'Tijuana', country: 'Mexico' },
    { name: 'León', country: 'Mexico' },
    { name: 'Juárez', country: 'Mexico' },
    { name: 'Zapopan', country: 'Mexico' },
    { name: 'Mérida', country: 'Mexico' },
    { name: 'San Luis Potosí', country: 'Mexico' },
    { name: 'Aguascalientes', country: 'Mexico' },
    { name: 'Hermosillo', country: 'Mexico' },
    { name: 'Saltillo', country: 'Mexico' },
    { name: 'Mexicali', country: 'Mexico' },
    { name: 'Culiacán', country: 'Mexico' },
    { name: 'Cancún', country: 'Mexico' },
    { name: 'Querétaro', country: 'Mexico' },
    { name: 'Acapulco', country: 'Mexico' },
    { name: 'Cuernavaca', country: 'Mexico' },
    { name: 'Morelia', country: 'Mexico' },
    { name: 'Veracruz', country: 'Mexico' },
    { name: 'Chihuahua', country: 'Mexico' },
    { name: 'Reynosa', country: 'Mexico' },
    { name: 'Mazatlán', country: 'Mexico' },
    { name: 'Toluca', country: 'Mexico' },
    { name: 'Puerto Vallarta', country: 'Mexico' },
    { name: 'Cabo San Lucas', country: 'Mexico' },

    // Canada - Major Cities
    { name: 'Toronto', country: 'Canada' },
    { name: 'Montreal', country: 'Canada' },
    { name: 'Vancouver', country: 'Canada' },
    { name: 'Calgary', country: 'Canada' },
    { name: 'Edmonton', country: 'Canada' },
    { name: 'Ottawa', country: 'Canada' },
    { name: 'Winnipeg', country: 'Canada' },
    { name: 'Quebec City', country: 'Canada' },
];
