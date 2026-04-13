export const ADMIN_ROUTES = {
  home: "/admin",
  supply: {
    root: "/admin/pasokan",
    input: "/admin/pasokan/input",
    list: "/admin/pasokan/daftar",
  },
  masterData: {
    root: "/admin/input-data",
    gardens: "/admin/input-data/kebun",
    fertilizers: "/admin/input-data/pupuk",
    suppliers: "/admin/input-data/pemasok",
  },
  supplierInformation: "/admin/informasi-pemasok",
  gardenInformation: "/admin/informasi-kebun",
  delivery: "/admin/penerimaan",
  users: "/admin/users",
} as const;

export const KRANI_ROUTES = {
  home: "/krani",
  delivery: "/krani/penerimaan",
} as const;