// All collections and are stored in the firestore
const settingsCollection = {
  name: 'Facility 1',
  village: 'Pererenan',
  importantVillageGuy: {
    id: 'Tu4SFfDhBUgAwGsvfopc', // person id
    name: 'Michael'
  }
  // + other information about the facility that we might need
}

const personCollection = [
  {
    login: firebaseUserId, // Only for people with a login
    name: 'Test User',
    phone: '+62 123 123 123',
    address: 'Jalan Batu Mejan No. 88, Canggu, Kuta Utara, Kabupaten Badung, Bali 80361',
    email: 'some@address.com',
    geolocation: {
      latitude: '8.39111',
      longitude: '115.07361'
    },
    type: {
      employee: false,
      client: false
    },
    role: {
      communityManager:false,
      facilityManager:false,
      superAdmin: true
    },
    houseType: 'Tu4SFfDhBUgAwGsvfopc' // house type id
  }
]

const deliveryCollection = [
  {
    timestamp: '2018-03-15T09:55:48.942Z',
    organic: 12.5,
    anorganic: 12.5,
    driver: {
      id: 'Tu4SFfDhBUgAwGsvfopc', // person id
      name: 'Michael'
    },
    banjar: {
      id: 'Tu4SFfDhBUgAwGsvfopc',
      name: 'Michael'
    }
  }
]

const workedHoursCollection = [
  {
    employee: {
      id: 'Tu4SFfDhBUgAwGsvfopc', // person id
      name: 'Michael'
    },
    in: '2018-03-15T09:55:48.942Z',
    out: null
  }
]

const stockCollection = [
  {
    timestamp: '2018-03-15T09:55:48.942Z',
    material: {
      id: 'Tu4SFfDhBUgAwGsvfopc',
      name: 'plastic'
    },
    amount: 200
  }
]
const expenseCollection = [
  {
    description: 'Limited Furby Collection',
    amount: 20000000,
    person: {
      id: 'Tu4SFfDhBUgAwGsvfopc',
      name: 'Michael'
    }
  }
]

const saleCollection = [
  {
    buyer: {
      id: 'Tu4SFfDhBUgAwGsvfopc',
      name: 'Michael'
    },
    materials: [
      {
        material: {
          id: 'Tu4SFfDhBUgAwGsvfopc',
          name: 'plastic'
        },
        kilo: 200,
        pricePerKilo: 20000
      }
    ]
  }
]

const feeCollection = [
  {
    timestamp: '2018-03-15T09:55:48.942Z',
    monthly_fee: 50,
    total_paid: 200,
    paid_until: '2018-07-15T09:55:48.942Z'
  }
]

const banjarCollection = [
  {
    name: 'Banjar Name',
    pickupTimes: [
      {
        day: 'Monday',
        time: '6am-2pm'
      },
      {
        day: 'Tuesday',
        time: '6am-2pm'
      }
    ]
  }
];

const materialCollection = [
  {
    name: 'Material 1',
    pricePerKilo: 2000
  }
]

// villa, household, business
const houseTypesCollection = [
    {
      name: 'Villa',
      collectionFee: 20000
    }
]
