export interface ClientInfo {
    personId?: string;
    personKey?: string;
    vorname?: string;
    nachname?: string;
    name?: string;
    geschlecht?: string;
    geburtsdatum?: string;
    domiziladresse?: Domiziladresse;
    nationalitaet?: string;
    zivilstand?: string;
    gueterstand?: any;
    customerSegment?: string;
    bpId?: string;
    bpKey?: string;
    personenart?: string;
    rechtsform?: any;
    gruendungsdatum?: any;
    personSortNr?: string;
    bpKeyNr?: string;
    heimatort?: any;
    todesdatum?: any;
    adressListe?: AdressListe[];
    uid?: any;
    kube?: string;
    filiale?: any;
    rating?: string;
    ratingZusatz?: any;
    bilanzeinreichepflicht?: string;
    nogaV?: any;
    connections?: any[];
}

export interface Domiziladresse {
    addressId?: string;
    name?: string;
    salut?: string;
    salutLetter?: string;
    volleBriefanrede?: string;
    firm?: any;
    firstName?: string;
    secondname?: any;
    lastname?: string;
    additionalName?: any;
    street?: string;
    strNo?: string;
    addStreet?: any;
    poBox?: any;
    zip?: string;
    city?: string;
    country?: string;
    state?: string;
    fullAddr?: string;
    fullAddrLine?: string;
}

export interface AdressListe {
    addressId?: string;
    name?: string;
    salut?: string;
    salutLetter?: string;
    volleBriefanrede?: string;
    firm?: any;
    firstName?: string;
    secondname?: any;
    lastname?: string;
    additionalName?: any;
    street?: string;
    strNo?: string;
    addStreet?: any;
    poBox?: any;
    zip?: string;
    city?: string;
    country?: string;
    state?: string;
    fullAddr?: string;
    fullAddrLine?: string;
}