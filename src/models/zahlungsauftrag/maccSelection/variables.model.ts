export interface selectMaccVariables {
    variables: {
        zahlungstyp: {
            type: string,
            value: string
        },
        positionId: {
            type: string,
            value: string
        },
        positionName: {
            type: string,
            value: string
        }
    }
}

export interface selectInlandVariables {
    variables: {
        zahlungsauftrag: {
            type: string,
            value: string
        },
        zahlungsauftragIban: {
            type: string,
            value: string
        }
    }
}

export interface selectSwiftVariables {
    variables: {
        zahlungsauftrag: {
            type: string,
            value: string
        },
        zahlungsauftragIban: {
            type: string,
            value: string
        }
    }
}