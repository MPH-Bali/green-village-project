export default {
  tables: {
    headers: {
      name: 'Name',
      timeIn: 'Time In',
      timeOut: 'Time Out',
      actions: 'Actions',
      time: 'Time',
      worker: 'Worker',
      inorganic: 'Inorganic',
      organic: 'Organic',
      banjar: 'Banjar',
      type: 'Type',
      cost: 'Cost',
      notes: 'Notes'
    }
  },
  houseTypes: {
    villa: 'Villa',
    business: 'Business',
    household: 'Household',
    publicFacility: 'Public Facility',
    businesses: 'Businesses',
    facilities: 'Facilities'
  },
  models: {
    fees: {
      labels: {
        timestamp: 'Date Time',
        totalPaid: 'Total Paid',
        paidUntil: 'Paid Until',
        monthlyFee: 'Monthly Fee'
      }
    },
    customers: {
      labels: {
        name: 'Customer Name',
        email: 'Email',
        houseType: 'Type',
        address: 'Address',
        notes: 'Notes',
        whatsapp: 'Whatsapp',
        phone: 'SMS/Call',
        company: 'Company'
      }
    }
  },
  forms: {
    joinus: 'Join Us',
    save: 'Save',
    cancel: 'Cancel',
    collectFee: 'Collect Fee',
    sendEmail: 'Send Email',
    approve: 'Approve',
    decline: 'Decline',
    ok: 'Ok'
  },
  toasts: {
    feeAdded: 'Fee Added'
  },
  headers: {
    paymentHistory: 'Payment History',
    newsletterSignup: 'Newsletter Signup',
    delivery: 'Delivery',
    materialKg: 'Material Kg',
    workerHours: 'Workers Hours',
    addExpense: 'Add Expense',
    dailyStock: 'Daily Stock',
    revenue: 'Revenue',
    expenses: 'Expenses',
    income: 'Income',
    collection: 'Collection',
    team: 'Team',
    workingHours: 'Working Hours',
    bannerMaterials: 'Banner Materials',
    facilityData: 'Facility Data',
    pickups: 'Pickups',
    tons: 'Tons',
    members: 'Members',
    recyclingEfficiency: 'Recycling Efficiency',
    pickupSchedule: 'Pickup Schedule'
  },
  // @desc these keys MUST coorlate with the @/router Router.routes.children.name value
  routeNames: {
    login: 'Login',
    dailyLog: 'Daily Log',
    dailyLogHistory: 'Daily Log History',
    deliveryForm: 'Delivery Form',
    addMaterial: 'Add material',
    workerHours: 'Check workers',
    addStock: 'Add Stock',
    editStockForm: 'Edit Stock Form',
    customerDetail: 'Customer Detail',
    buyers: 'Buyers',
    'buyer-edit': 'Add/Edit Buyer',
    'buyer-details': 'Buyer Details',
    addExpense: 'Add Expense',
    menu: 'Menu',
    customers: 'Customers',
    newCustomer: 'New Customer'
  },
  // example string
  home: {
    welcome: 'welcome'
  },
  // the most common terms shared throughout components in the app
  common: {
    members: "We're already a lot, but we want all {count} Pererenan households to join us!",
    facility: '{facility} Facility',
    pickups: 'Pickups for {facility} are scheduled as follow:',
    downloadInfo: "Download information and PDF to understand what we're doing",
    details: 'Details',
    timestamp: 'Time',
    newsletterSignup: 'Sign up and stay up to date with it',
    pickupSchedule: 'Pickup Schedule',
    signup: 'Sign Up',
    language: 'Language',
    sendFeedback: 'Send Feedback',
    contactUs: 'Contact Us',
    contribute: 'Contribute',
    faq: 'FAQ',
    number: 'no.',
    notes: 'notes',
    time: 'time',
    edit: 'edit',
    paper: 'paper',
    type: 'type',
    add: 'add',
    cost: 'cost',
    compost: 'compost',
    metal: 'metal',
    plastic: 'plastic',
    name: 'name',
    in: 'in',
    out: 'out',
    tapToCollapse: 'tap to collapse',
    neighborhood: 'banjar',
    neighborhoods: 'banjar(s)',
    driver: 'driver',
    villas: 'villas',
    households: 'households',
    businesses: 'businesses',
    facilities: 'facilities',
    comments: 'comments',
    back: 'back',
    cancel: 'cancel',
    worker: 'worker',
    organic: 'organic',
    anorganic: 'inorganic',
    error: 'error',
    save: 'save',
    update: 'update',
    total: 'total',
    hours: 'hours',
    morning: 'morning',
    afternoon: 'afternoon',
    evening: 'evening',
    customer: 'customer',
    customers: 'customers',
    create: 'create',
    sale: 'sale',
    email: 'email',
    'Email': 'Email',
    quantity: 'quantity',
    fuel: 'fuel',
    maintenance: 'fuel',
    month: 'month',
    address: 'address',
    fullName: 'full name',
    paidUntil: 'paid until',
    totalPaid: 'total paid',
    collectFee: 'collectFee',
    sortByName: 'sort by name',
    aToZ: 'a-z',
    typeBuyerName: 'type buyer name',
    phoneNumber: 'phone number',
    'PhoneNumber': 'Phone Number',
    payment: 'payment',
    history: 'history',
    decline: 'decline',
    approve: 'approve',
    sendEmail: 'send email',
    monthly: 'monthly',
    fee: 'fee',
    search: 'Search',
    Company: 'Company',
    Whatsapp: 'Whatsapp',
    Notes: 'Notes',
    Send: 'Send',
    Date: 'Date',
    Save: 'Save',
    Cancel: 'Cancel',
    Name: 'Name',
    NoData: 'No Data',
    Add: 'Add'
  },
  // 01.0
  login: {
    headerTitle: 'login',
    instructions: 'to login, please enter phone number',
    inputPlaceholder: 'type your phone number',
    label: 'phone number',
    button: 'continue'
  },
  // 01.1
  loginEnterCode: {
    headerTitle: 'login',
    instructions: 'please enter the code we sent you via sms',
    codeInputLabel: 'code',
    codeInputPlaceholder: '012345',
    resendCodeLink: 'resend code',
    button: 'login'
  },
  // 02.0
  main: {
    headerTitle: 'daily log',
    instructions: '',
    codeInputLabel: '',
    codeInputPlaceholder: '',
    resendCodeLink: '',
    button: ''
  },
  // 02.0a Menu
  menu: {
    title: 'menu',
    sendDayReport: 'Send Day Report',
    addDelivery: 'Add Delivery',
    addDailyNote: 'add daily note',
    weighMaterial: 'Weigh Material',
    customersList: 'Customers List',
    workersHours: 'Workers Hours',
    buyersList: 'Buyers List',
    addStock: 'Add Stock',
    contactAdmin: 'Contact Admin',
    createSale: 'Create Sale',
    logout: 'Logout',
    addExpense: 'Add Expense'
  },
  // 02.0b
  dailyLog: {
    deliveries: 'deliveries',
    material: 'material',
    stock: 'stock',
    sales: 'sales',
    expenses: 'expenses',
    workers: 'workers hours',
    currency: 'idr',
    weightUnit: 'kg'
  },
  // deliveries section of the daily log
  deliveries: {
    villas: 'villas',
    households: 'households',
    businesses: 'businesses',
    facilities: 'facilities',
    time: 'time',
    details: 'details',
    edit: 'edit'
  },
  buyers: {
    numberOfSales: 'No. of Sales',
    lastPurchase: 'Last purchase',
    buyer: 'Buyer',
    materialCompost: 'Material/Compost',
    kg: 'kg',
    costKg: 'Cost/Kg',
    FinalPrice: 'Final Price',
    NoBuyers: 'No Buyers'
  },
  sales: {
    NoSales: 'No Sales'
  },
  // material section of the daily log
  material: {
    worker: 'worker',
    angorganic: 'angorganic',
    organic: 'organic'
  }
}
