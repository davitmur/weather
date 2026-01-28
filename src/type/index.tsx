export interface ICity {
    name: string,
    local_names: { [languageCode: string]: string; },
    lat: number,
    lon: number,
    country: string,
    state: string
}

export interface ICordinates {
    zip: string,
    name: string,
    lat: number,
    lon: number,
    country: string
}

export interface ILocation {
    lat: number,
    lng: number,
    name: string
};

export interface ICoords {
    lat: number,
    lon: number
}

export interface ICountry {
    name: {
        common: string,
        official: string,
        nativeName: {
            eng: {
                official: string,
                common: string
            }
        }
    }
}

export interface ICityState {
    city: ICity
}

export interface ICordinatesState {
    cordinates: ICordinates
}

export interface ICountryState {
    countries: ICountry[]
}

export interface IMap {
    address: string,
    lad: number,
    long: number
}

export interface IWeather {
    cod: number,
    message: number,
    cnt: number,
    list: [
        {
            dt: number,
            main: {
                temp: number,
                feels_like: number,
                temp_min: number,
                temp_max: number,
                pressure: number,
                sea_level: number,
                grnd_level: number,
                humidity: number,
                temp_kf: number
            },
            weather: [
                {
                    id: number,
                    main: string,
                    description: string,
                    icon: string
                }
            ],
            clouds: {
                all: number
            },
            wind: {
                speed: number,
                deg: number,
                gust: number
            },
            visibility: number,
            pop: number,
            sys: {
                pod: string
            },
            dt_txt: string
        }
    ],
    city: {
        id: number,
        name: string,
        coord: {
            lat: number,
            lon: number
        },
        country: string,
        population: number,
        timezone: number,
        sunrise: number,
        sunset: number
    }
}

export interface ILocation1 {
    city: string,
    latitude: number
    longitude: number
    country: string,
    //     asn: string,
    //     continent_code: string,
    //     country_area: 29800,
    //     country_calling_code:+374,
    //         country_capital: string,
    //             country_code: string
    // country_code_iso3: string
    // country_name: string
    // country_population: 3090500
    // country_tld:string
    // currency: string
    // currency_name: string
    // in_eu: false
    // ip: 78.109.73.146
    // languages: string
    // network: 78.109.64.0 / 20
    // org: GNC - Alfa CJSC
    // postal: null
    // region: Yerevan
    // region_code: ER
    // timezone: Asia / Yerevan
    // utc_offset: +0400
    // version: IPv4
}

