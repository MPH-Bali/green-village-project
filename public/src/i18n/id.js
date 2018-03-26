export default {
  tables: {
    headers: {
      name: 'Nama',
      timeIn: 'Jam Masuk',
      timeOut: 'Jam Keluar',
      actions: 'Opsi',
      time: 'Jam',
      worker: 'Pekerja',
      inorganic: 'Non-organik',
      organic: 'Organik',
      banjar: 'Banjar',
      type: 'Jenis',
      cost: 'Biaya',
      notes: 'Catatan'
    }
  },
  houseTypes: {
    villa: 'Villa',
    business: 'Bisnis',
    household: 'Rumah Tangga',
    publicFacility: 'Fasilitas Umum',
    businesses: 'Bisnis',
    facilities: 'Fasilitas'
  },
  models: {
    fees: {
      labels: {
        timestamp: 'Tanggal Waktu',
        totalPaid: 'Total Pembayaran',
        paidUntil: 'Terbayar Sampai',
        monthlyFee: 'Biaya Bulanan'
      }
    },
    customers: {
      labels: {
        name: 'Nama Pelanggan',
        email: 'Email',
        houseType: 'Jenis',
        address: 'Alamat',
        notes: 'Catatan',
        whatsapp: 'Whatsapp',
        phone: 'SMS/Telepon',
        company: 'Perusahaan'
      }
    }
  },
  forms: {
    joinus: 'Bergabung Dengan Kami',
    save: 'Simpan',
    cancel: 'batal',
    collectFee: 'Pungut Biaya',
    sendEmail: 'Kirim Email',
    approve: 'Setujui',
    decline: 'batal',
    ok: 'Ok'
  },
  toasts: {
    feeAdded: 'tambah Biaya'
  },
  headers: {
    paymentHistory: 'Riwayat Pembayaran',
    newsletterSignup: 'Daftar Bulletin',
    delivery: 'Pengiriman',
    materialKg: 'Material Kg',
    workerHours: 'Jam Kerja',
    addExpense: 'tambah Pengeluaran',
    dailyStock: 'Stok Harian',
    revenue: 'Penghasilan',
    expenses: 'Pengeluaran',
    income: 'Pemasukkan',
    collection: 'Pengambilan',
    team: 'Tim',
    workingHours: 'Jam Kerja',
    bannerMaterials: 'Spanduk Material',
    facilityData: 'Data Fasilitas',
    pickups: 'Penjemputan',
    tons: 'Ton',
    members: 'Anggota',
    recyclingEfficiency: 'Efisiensi Daur Ulang',
    pickupSchedule: 'Jadwal Penjemputan'
  },
  routeNames: {
    dailyLog: 'Catatan Harian',
    dailyLogHistory: 'Riwayat Catatan Harian',
    deliveryForm: 'Formulir Pengiriman',
    addMaterial: 'tambah Material',
    workerHours: 'Cek Pekerja',
    customerDetail: 'Detail Pelanggan',
    newCustomer: 'Pelanggan Baru',
    buyers: 'Pembeli',
    'buyer-edit': 'Tambah/Sunting Pembeli',
    'buyer-details': 'Detail Pembeli',
    addExpense: 'tambah Pengeluaran',
    menu: 'Catatan Harian',
    customers: 'Pelanggan'
  },

  home: {
    welcome: 'selamat datang'
  },
  // the most common terms shared throughout components in the app
  common: {
    members: 'Jumlah kita sudah banyak, tapi kita ingin agar {count} rumah tangga di Pererenan untuk bergabung bersama kami!',
    facility: 'Fasilitas {facility}',
    pickups: 'Jemputan untuk {facility} telah terjadwal sebagai berikut:',
    downloadInfo: 'Unggah informasi dan PDF ini untuk mengerti tentang apa yang kami lakukan',
    details: 'Detail',
    timestamp: 'Tanggal Waktu',
    newsletterSignup: 'Daftar dan dapatkan kabar terbaru',
    pickupSchedule: 'Jadwal Penjemputan',
    signup: 'Registrasi',
    language: 'Bahasa',
    sendFeedback: 'Kirim Komentar',
    contactUs: 'Hubungi Kami',
    contribute: 'Ikut-serta',
    faq: 'FAQ',
    number: 'no.',
    notes: 'catatan',
    time: 'jam',
    edit: 'Sunting',
    paper: 'kertas',
    type: 'ketik',
    add: 'tambah',
    cost: 'biaya',
    compost: 'kompos',
    metal: 'logam',
    plastic: 'plastik',
    name: 'nama',
    in: 'masuk',
    out: 'keluar',
    tapToCollapse: 'klik untuk turunkan',
    neighborhood: 'banjar',
    neighborhoods: 'banjar',
    driver: 'sopir',
    villas: 'villa',
    households: 'rumah tangga',
    businesses: 'bisnis',
    facilities: 'fasilitas',
    comments: 'komentar',
    back: 'kembali',
    cancel: 'batal',
    worker: 'pekerja',
    organic: 'organik',
    inorganic: 'non-organik',
    error: 'error',
    save: 'simpan',
    update: 'perbarui',
    total: 'total',
    hours: 'jam',
    morning: 'pagi',
    afternoon: 'siang',
    evening: 'petang',
    customer: 'pelanggan',
    customers: 'pelanggan',
    create: 'buatkan',
    sale: 'penjualan',
    email: 'email',
    quantity: 'jumlah',
    fuel: 'perbaikan',
    maintenance: 'perbaikan',
    month: 'bulan',
    address: 'alamat',
    fullName: 'nama lengkap',
    paidUntil: 'dibayar sampai',
    totalPaid: 'total pembayaran',
    collectFee: 'pungut biaya',
    sortByName: 'atur berdasarkan nama',
    aToZ: 'a-z',
    typeBuyerName: 'ketik nama pembeli',
    phoneNumber: 'nomer telepon',
    payment: 'pembayaran',
    history: 'riwayat',
    decline: 'tolak',
    approve: 'setujui',
    sendEmail: 'kirim email',
    monthly: 'bulanan',
    fee: 'biaya'
  },
  // 01.0
  login: {
    headerTitle: 'masuk',
    instructions: 'untuk masuk, masukkan nomor telepon',
    inputPlaceholder: 'ketik nomor telpon anda',
    label: 'nomor telepon',
    button: 'lanjutkan'
  },
  // 01.1
  loginEnterCode: {
    headerTitle: 'masuk',
    instructions: 'masukkan kode yang telah dikirimkan melalui sms',
    codeInputLabel: 'kode',
    codeInputPlaceholder: '012345',
    resendCodeLink: 'kirim ulang kode',
    button: 'masuk'
  },
  // 02.0
  main: {
    headerTitle: 'catatan harian',
    instructions: '',
    codeInputLabel: '',
    codeInputPlaceholder: '',
    resendCodeLink: '',
    button: ''
  },
  // 02.0a Menu
  menu: {
    sendDayReport: 'Kirim Laporan Harian',
    title: 'menu',
    addDailyNote: 'tambah catatan harian',
    customerList: 'daftar pelanggan',
    buyerList: 'daftar pembeli',
    contactAdmin: 'hubungi admin',
    logout: 'keluar',
    addDelivery: 'Tambah Pengiriman',
    weighMaterial: 'Timbang Material',
    customersList: 'Daftar Pelanggan',
    workersHours: 'Jam Pekerja',
    buyersList: 'Daftar Pembeli',
    addStock: 'Tambah Stok',
    createSale: 'Buat Pembelian',
    addExpense: 'Tambah Pengeluaran'
  },
  // fixed menu located at the bottom of the screen
  bottomMenu: {
    addDelivery: 'tambah pengiriman',
    weighMaterials: 'berat material',
    workersHours: ' jam pekerja',
    addStock: 'tambah stok atau kompos',
    createSale: 'buat penjualan',
    addExpense: 'tambah biaya',
    settings: 'pengaturan'
  },
  // 02.0b
  dailyLog: {
    deliveries: 'pengiriman',
    material: 'material',
    stock: 'stok',
    sales: 'penjualan',
    expenses: 'biaya',
    workers: 'jam pekerja',
    currency: 'idr',
    weightUnit: 'kg'
  },
  // deliveries section of the daily log
  deliveries: {
    villas: 'villa',
    households: 'rumah tangga',
    businesses: 'bisnis',
    facilities: 'fasilitas',
    time: 'waktu',
    details: 'detail',
    edit: 'sunting'
  },
  // material section of the daily log
  material: {
    worker: 'pekerja',
    angorganic: 'non-organik',
    organic: 'organik'
  }
}
