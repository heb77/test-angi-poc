export interface MaccInfo {
    time?: Date;
    containers?: Container[];
}

export interface Container {
    containerId?: string;
    name?: string;
    number?: string;
    product?: string;
    referenceCurrency?: string;
    positions?: Position[];
}

export interface Position {
    positionId?: string;
    productId?: string;
    name?: string;
    number?: string;
    referenceCurrency?: string;
    isOrdinario?: boolean;
    iban?: string;
    currentValueBusinessUnit?: string;
    accrualBusinessUnit?: string;
    balanceCHF?: string;
    quantity?: string;
    assetName?: string;
    assetObjectSubType?: string;
    assetType?: string;
    moneyAccountType?: string;
    investmentCategory?: string;
    currencyCategory?: string;
    interestRates?: InterestRate[];
}


export interface InterestRate {
    componentId?: string;
    componentStructure?: string;
    interestRate?: string;
}


