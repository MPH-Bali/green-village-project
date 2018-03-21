/* eslint-disable */

// Since settings is an object, it can be stored in the realtime database
const settings = {
  name: 'Facility 1',
  village: 'Canggu',
  importantVillageGuy: getPerson('Tu4SFfDhBUgAwGsvfopc'),
  houseTypes: [ //needed?
    { name: 'Villa', collectionFee: 20000 },
    { name: 'Local House', collectionFee: 1000 },
    { name: 'Business', collectionFee: 2500 }
  ],
  materials: [
    { name: 'Material 1', pricePerKilo: 2000 },
    { name: 'Material 2', pricePerKilo: 3000 }
    //...
  ],
  trucks: [
    { name: 'Truck 1', plate: 'ABC123', model: 'Toyota Trucki' },
    { name: 'Truck 2', plate: 'DEF456', model: 'Toyota Trucki' }
  ],
  banjars: [
    {
      name: 'Banjar Name',
      pickupTimes: {
        mon: '6am-2pm',
        tue: '6am-2pm'
        //...
      }
    }
  ]
}

// The rest is collections and can be stored in firestore
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
      employee:false,
      client:false,
      community_manager:false,
      facility_manager:false,
      super_admin: true
    },
    house: getHouseType('Tu4SFfDhBUgAwGsvfopc') // only for clients

  }
]

const deliveryCollection = [
  {
    timestamp: '2018-03-15T09:55:48.942Z',
    organic: 12.5,
    anorganic: 12.5,
    truck: getTruck('Tu4SFfDhBUgAwGsvfopc'),
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

const feesCollection = [
  {
    timestamp: '2018-03-15T09:55:48.942Z',
    monthly_fee: 50,
    total_paid: 200,
    paid_until: '2018-07-15T09:55:48.942Z'
  }
]
