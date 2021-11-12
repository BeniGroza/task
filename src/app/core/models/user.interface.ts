export interface IUser {
    id: number;
    name: string;
    phone: string;
    username: string;
    website: string;
    address: IAddress;
    company: ICompany;
}

interface IAddress {
    city: string;
    geo: IGeo;
    street: string;
    suite: string;
    zipcode: string;
}

interface IGeo {
    lat: string;
    lng: string;
}

interface ICompany {
    bs: string;
    catchPhrase: string;
    name: string;
}