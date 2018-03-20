/* eslint-disable */

// Since settings is an object, it can be stored in the realtime database
var settings = {
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
var personCollection = [
  {
    login: firebaseUserId, // Only for people with a login
    name: 'Test User',
    phone: '+62 123 123 123',
    address: 'Jalan Batu Mejan No. 88, Canggu, Kuta Utara, Kabupaten Badung, Bali 80361',
    email: 'some@address.com',
    geolaction: {
      latitude: '8.39111',
      longitude: '115.07361'
    },
    type: 'employee | client | community manager | facility manager | super admin | village guy',
    house: getHouseType('Tu4SFfDhBUgAwGsvfopc') // only for clients
  }
]

var deliveryCollection = [
  {
    timestamp: '2018-03-15T09:55:48.942Z',
    organic: 12.5,
    anorganic: 12.5,
    truck: getTruck('Tu4SFfDhBUgAwGsvfopc'),
    driver: getPeron('Tu4SFfDhBUgAwGsvfopc'),
    banjar: getBanjar('Tu4SFfDhBUgAwGsvfopc')
  }
]

var workedHoursCollection = [
  {
    employee: getPeron('Tu4SFfDhBUgAwGsvfopc'),
    in: '2018-03-15T09:55:48.942Z',
    out: null
  }
]

var stockCollection = [
  {
    timestamp: '2018-03-15T09:55:48.942Z',
    material: getMaterial('Tu4SFfDhBUgAwGsvfopc'),
    amount: 200
  }
]
var expenseCollection = [
  {
    description: 'Limited Furby Collection',
    amount: 20000000,
    person: getPerson('Tu4SFfDhBUgAwGsvfopc')
  }
]

var saleCollection = [
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
