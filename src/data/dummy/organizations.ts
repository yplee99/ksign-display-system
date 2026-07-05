export interface Organization {
  id: number;
  customerId: string;
  name: string;
  address: string;
  subtype: string;
  screens: number;
  devices: number;
}

export const ORGANIZATIONS: Organization[] = [
  { id: 1, customerId: "DE05375",  name: "Flo_1",                       address: "Rowa Straße 1-3, Kelberg",     subtype: "Service",  screens: 5,  devices: 0  },
  { id: 2, customerId: "DE01995",  name: "Flo_Device_Test",             address: "Rowa 1-3, Kelberg",             subtype: "Demo Unit", screens: 0,  devices: 0  },
  { id: 3, customerId: "FR02020",  name: "French Vidal Product Import", address: "test, test",                    subtype: "Pharmacy", screens: 4,  devices: 4  },
  { id: 4, customerId: "IT21001",  name: "Italy Test",                  address: "Via Castino 16, Milano",        subtype: "Pharmacy", screens: 2,  devices: 2  },
  { id: 5, customerId: "JP12042",  name: "Japanese Test",               address: "123123 destined",               subtype: "Pharmacy", screens: 1,  devices: 1  },
  { id: 6, customerId: "DE21231",  name: "Marc's Test Pharmacy",        address: "Debug Str. 42, Debugstadt",     subtype: "Pharmacy", screens: 2,  devices: 1  },
  { id: 7, customerId: "DE30425",  name: "Meine TestApotheke",          address: "Somewhere, in",                 subtype: "Pharmacy", screens: 4,  devices: 2  },
  { id: 8, customerId: "DE12020",  name: "MNI Test",                    address: "Somewhere, in",                 subtype: "Pharmacy", screens: 0,  devices: 0  },
  { id: 9, customerId: "DE22224",  name: "Neon Apotheke",               address: "Elephant Street 1234, Darmstadt", subtype: "Pharmacy", screens: 6, devices: 6 },
];
