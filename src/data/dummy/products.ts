export interface Product {
  id: number;
  name: string;
  code: string;
  manufacturer: string;
  dosageForm: string;
  packSize: string;
  price: number | null;
  discontinued?: boolean;
}

export const PRODUCTS: Product[] = [
  { id: 1,  name: "Aspirin Complex 10 St",          code: "00000001", manufacturer: "Bayer AG",            dosageForm: "Granulat",  packSize: "10 St",  price: 9.70  },
  { id: 2,  name: "Ibuprofen 400mg 20 St",           code: "00000002", manufacturer: "Ratiopharm GmbH",     dosageForm: "Tablette",  packSize: "20 St",  price: 5.34  },
  { id: 3,  name: "Vitamin C 1000 30 St",            code: "00000003", manufacturer: "Doppelherz",          dosageForm: "Tablette",  packSize: "30 St",  price: 12.50 },
  { id: 4,  name: "Paracetamol 500mg 10 St",         code: "00000004", manufacturer: "Hexal AG",            dosageForm: "Tablette",  packSize: "10 St",  price: 2.50  },
  { id: 5,  name: "Omeprazol 20mg 14 St",            code: "00000005", manufacturer: "Stada GmbH",          dosageForm: "Kapsel",    packSize: "14 St",  price: 6.90  },
  { id: 6,  name: "Loratadin 10mg 20 St",            code: "00000006", manufacturer: "Ratiopharm GmbH",     dosageForm: "Tablette",  packSize: "20 St",  price: 4.80  },
  { id: 7,  name: "Metformin 500mg 100 St",          code: "00000007", manufacturer: "Hexal AG",            dosageForm: "Tablette",  packSize: "100 St", price: 15.00 },
  { id: 8,  name: "Amoxicillin 500mg 20 St",         code: "00000008", manufacturer: "Stada GmbH",          dosageForm: "Kapsel",    packSize: "20 St",  price: 8.40  },
  { id: 9,  name: "Simvastatin 20mg 30 St",          code: "00000009", manufacturer: "Ratiopharm GmbH",     dosageForm: "Tablette",  packSize: "30 St",  price: 11.20 },
  { id: 10, name: "Diclofenac Gel 100g",             code: "00000010", manufacturer: "Novartis Pharma",     dosageForm: "Gel",       packSize: "100 g",  price: 7.30  },
  { id: 11, name: "Cetirizin 10mg 50 St",            code: "00000011", manufacturer: "Hexal AG",            dosageForm: "Tablette",  packSize: "50 St",  price: 6.10  },
  { id: 12, name: "Pantoprazol 40mg 30 St",          code: "00000012", manufacturer: "Stada GmbH",          dosageForm: "Tablette",  packSize: "30 St",  price: 9.90  },
  { id: 13, name: "Magnesium 400mg 60 St",           code: "00000013", manufacturer: "Doppelherz",          dosageForm: "Tablette",  packSize: "60 St",  price: 8.50  },
  { id: 14, name: "Old Product (Discontinued)",      code: "00000014", manufacturer: "Generic Co",          dosageForm: "Tablette",  packSize: "10 St",  price: 3.20, discontinued: true },
  { id: 15, name: "Zinc 25mg 90 St",                 code: "00000015", manufacturer: "Doppelherz",          dosageForm: "Tablette",  packSize: "90 St",  price: 10.40 },
];

export const PRODUCT_DETAIL = PRODUCTS[0];
