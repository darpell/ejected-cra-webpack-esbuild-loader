import React, { useMemo, useState } from 'react';
import _ from 'lodash';

interface Obj {
    user: {
        value: string;
    };
}

enum Region {
    AU = 'AU',
    UK = 'UK',
    US = 'US',
}

const AppConfig = {
    DEFAULT: {
        InferTwoDigitYear: true,
        ErrorPopup: {
            Generic: "generika",
        },
        DefaultTimezone: 'Australia/Sydney',
        CareplanVoidTimeRestriction: 168,
    },
    AU: {
        InferTwoDigitYear: false,
        ErrorPopup: {
            Generic:
                "We encountered an error. Please refresh the page. If the issue persists, please contact GenesisCare IT support: <a href='mailto:genesiscare.itservicedesk@genesiscare.com.au'>genesiscare.itservicedesk@genesiscare.com.au</a>",
            ClinicalProfile: "AU Profile",
            Default: "Hi lo AU Profile",
        },
    },

    US: {
        InferTwoDigitYear: true,
        ErrorPopup: {
            Generic:
                "We encountered an error. Please refresh the page. If the issue persists, please contact GenesisCare IT support: <a href='mailto:genesiscare.itservicedesk@genesiscare.com.au'>genesiscare.itservicedesk@genesiscare.com.au</a>",
            ClinicalProfile: "US Profile",
            Default: "Hi lo US Profile",
        },
        ReferringPhysicians: {
            oncologist: 'Responsible Physician',
            generalPractitioner: 'Primary Physician (GP)',
            referringSurgeon: 'Referring Physician 1',
            referringSurgeon2: 'Referring Physician 2',
            referringSurgeon3: 'Referring Physician 3',
        },
    },
};

const DefaultAppConfig = {
    InferTwoDigitYear: 'default false',
    ErrorPopup: {
        Generic: "generika",
    },
    DefaultTimezone: 'Australia/Sydney',
    CareplanVoidTimeRestriction: 168,
}

const AUAppConfigOverride = {
    InferTwoDigitYear: 'au true',
    ErrorPopup: {
        Generic:
            "We encountered an error. Please refresh the page. If the issue persists, please contact GenesisCare IT support: <a href='mailto:genesiscare.itservicedesk@genesiscare.com.au'>genesiscare.itservicedesk@genesiscare.com.au</a>",
        ClinicalProfile: "AU Profile",
        Default: "Hi lo AU Profile",
    },
}

const USAppConfigOverride = {
    InferTwoDigitYear: 'us true',
    ErrorPopup: {
        Generic:
            "We encountered an error. Please refresh the page. If the issue persists, please contact GenesisCare IT support: <a href='mailto:genesiscare.itservicedesk@genesiscare.com.au'>genesiscare.itservicedesk@genesiscare.com.au</a>",
        ClinicalProfile: "US Profile",
        Default: "Hi lo US Profile",
    },
    ReferringPhysicians: {
        oncologist: 'Responsible Physician',
        generalPractitioner: 'Primary Physician (GP)',
        referringSurgeon: 'Referring Physician 1',
        referringSurgeon2: 'Referring Physician 2',
        referringSurgeon3: 'Referring Physician 3',
    },
}


const Something = () => {
    const [obj, setObj] = useState<Obj>({ user: { value: 'true' } });

    const showYes = useMemo(() => {
        return obj.user.value;
    }, [obj]);

    // console.log(_.merge(AppConfig.DEFAULT, AppConfig[Region.AU]));
    // console.log(_.merge(AppConfig.DEFAULT, AppConfig[Region.US]));

    // console.log(AppConfig.AU);
    // console.log(AppConfig.US);

    // console.log(_.merge(AppConfig[Region.AU], AppConfig[Region.US]));
    // console.log(_.merge(AppConfig[Region.US], AppConfig[Region.AU]));

    console.log(AUAppConfigOverride);
    console.log(USAppConfigOverride);

    console.log(_.merge(DefaultAppConfig, AUAppConfigOverride));
    console.log(_.merge(AUAppConfigOverride, USAppConfigOverride));
    console.log(_.merge(USAppConfigOverride, AUAppConfigOverride));


    return (
        <div>
            <div>
                Showing Something
            </div>
            <div>
                {showYes}
            </div>
            <div>
                <input onChange={(e) => {
                    // console.log(e.target.value);
                    let a: Obj = {
                        user: {
                            value: e.target.value
                        }
                    };

                    setObj(a)
                }} />
            </div>
        </div>
    );
}

export default Something;