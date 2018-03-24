/* eslint-disable */

// All collections and are stored in the firestore
const settings = {
  name: 'Facility 1',
  village: 'Pererenan',
  importantVillageGuy: getPerson('Tu4SFfDhBUgAwGsvfopc')
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
    house: getHouseType('Tu4SFfDhBUgAwGsvfopc') // only for clients

  }
]

const deliveryCollection = [
  {
    timestamp: '2018-03-15T09:55:48.942Z',
    organic: 12.5,
    anorganic: 12.5,
    driver: getPeron('Tu4SFfDhBUgAwGsvfopc'),
    banjar: getBanjar('Tu4SFfDhBUgAwGsvfopc')
  }
]

const workedHoursCollection = [
  {
    employee: getPeron('Tu4SFfDhBUgAwGsvfopc'),
    in: '2018-03-15T09:55:48.942Z',
    out: null
  }
]

const stockCollection = [
  {
    timestamp: '2018-03-15T09:55:48.942Z',
    material: getMaterial('Tu4SFfDhBUgAwGsvfopc'),
    amount: 200
  }
]
const expenseCollection = [
  {
    description: 'Limited Furby Collection',
    amount: 20000000,
    person: getPerson('Tu4SFfDhBUgAwGsvfopc')
  }
]

const saleCollection = [
  {
    buyer: getPerson('Tu4SFfDhBUgAwGsvfopc'),
    materials: [
      {
        material: getMaterial('Tu4SFfDhBUgAwGsvfopc'),
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
