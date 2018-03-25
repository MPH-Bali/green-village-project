export default {
  /**
   * @desc these keys MUST coorlate with the @/router Router.routes.children.name value
   */
  routeNames: {
    dailyLog: 'Daily Log',
    dailyLogHistory: 'Daily Log History',
    deliveryForm: 'Delivery Form',
    addMaterial: 'Add material',
    customerDetail: 'Customer Detail',
    buyers: 'Buyers',
    'buyer-edit': 'Add/Edit Buyer',
    'buyer-details': 'Buyer Details',
    customers: 'Customers'
  },
  // example string
  home: {
    welcome: 'welcome'
  },
  // the most common terms shared throughout components in the app
  common: {
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
    anorganic: 'anorganic',
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
    payment: 'payment',
    history: 'history',
    decline: 'decline',
    approve: 'approve',
    sendEmail: 'send email',
    monthly: 'monthly',
    fee: 'fee'
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
    addDailyNote: 'add daily note',
    customerList: 'customer list',
    buyerList: 'buyer list',
    contactAdmin: 'contact admin',
    logout: 'logout'
  },
  // fixed menu located at the bottom of the screen
  bottomMenu: {
    addDelivery: 'add delivery',
    weighMaterials: 'weigh material',
    workersHours: 'workers hours',
    addStock: 'add stock',
    createSale: 'create sale',
    addExpense: 'add expense',
    settings: 'settings'
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

  },
  // material section of the daily log
  material: {
    worker: 'worker',
    angorganic: 'angorganic',
    organic: 'organic'
  }
}
