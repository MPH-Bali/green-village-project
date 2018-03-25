# [green-village-project](http://mph-bali.org/en/pererenan-project/)

Powering MPH recycling and composting facilities in Bali.

Access the current deployed app at [FirebaseApp](https://mph-bali.firebaseapp.com/)
## Links

[Designs Trello Boars](https://trello.com/b/gbAYV7TV/mph-design)

[Persona Real Time Board](https://realtimeboard.com/app/board/o9J_k0Yt1AU=/)

[Wireframes - Facility Manager](https://www.figma.com/file/BciMKKjYcuDKnhUdayNdBwtA/Backend-Facility-Manager-Wires)

[Wireframes - backend super admin](https://www.figma.com/file/biyuSfQcDz7vw0Pgj9fVyY1T/Backend-Admin-Wires)

[Wireframes - public facing web](https://www.figma.com/file/VxhqIW4QCTTX3Q95ocSAis3l/Community-Public-Pages-Wires)

[Zepplin desings](https://app.zeplin.io/project/5a976d7c3ccf224b6dbd223b) Make sure you are registered and added to the project to view those. If you need adding to the project contact Daria (piggydoughnut) or Nick Sarafa (nicksarafa)

---
## How to contribute

### Git workflow

#### Internal team

- **master branch** - no one commits to master, master contains the currently deployed code
- **tags** - do not forget to tag each version that is deployed from master
- **develop branch** - code in development
- **new feature** = new branch, add an issues number in the name of the branch
- **pull requests** - once done with a feature, submit a pull request, add reviewers
- **tests** - make sure to write a test for the piece of functionality you created


#### External contributions

- fork the repository
- create a branch out of *develop*
- make your changes and create a Pull Request to the main repository to *develop*.

If you would like to become a part of our team and be added to the repository, please contact Daria (piggydoughnut) or Nick Sarafa (nicksarafa).

---
## Front End with [Vue.js ❤](https://vuejs.org/)
The frontend can be found in the *public* directory and was initialised using [Vue-CLI](https://github.com/vuejs/vue-cli/blob/dev/docs/README.md)  and the [vuetify/webpack](https://github.com/vuetifyjs/webpack) template.

### Dependencies
- [Vue.js](https://vuejs.org/) - Frontend Framework
- [Vueifiy](https://vuetifyjs.com/en/) - UI Components Framework
- [Vue-router](https://router.vuejs.org/en/) - Routing
- [Vue-i18n](https://kazupon.github.io/vue-i18n/en/) - Internalization
- [Vue-chartjs](https://github.com/apertureless/vue-chartjs) - Charts and Graphs
- [Vue-moment](https://github.com/brockpetrie/vue-moment) - Helper library for Dates
- [Firebasse SDK](https://github.com/firebase/firebase-js-sdk) - Firebase connector

### DEV Dependencies
- [Firebase-Tools](https://github.com/firebase/firebase-tools) - Deployment
- [Prettier](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#formatting-code-automatically) - Code Formatting
- [ESLint](https://github.com/eslint/eslint) - Linting using [standard conf](https://github.com/standard/eslint-config-standard)
- [Jest](https://facebook.github.io/jest/) - Testing

### Style guides
- [ES6](https://github.com/standard/eslint-config-standard)
- [Vue](https://vuejs.org/v2/style-guide/)

### Facility Manager - Architecture ###
The store is implemented using a single Vue instance that is made globably available through **$firestore**.

We're using firestore realtime data. Therefore all collections will be synced all the time and can be accessed from any component like this: **$firestore.COLLECTION_NAME**.

The following CRUD actions are available:
- **$firestore.get(COLLCTION_NAME, ID)** returns promise with the requested item
- **$firestore.remove(COLLCTION_NAME, ID)** deletes requested item, returns promise for success/error
- **$firestore.update(COLLCTION_NAME, DATA)** updates parts of object (needs to have DATA.ID)
- **$firestore.add(COLLCTION_NAME, DATA)** adds a record and returns promise with created object/error
- **$firestore.save(COLLCTION_NAME, DATA)** add or updates a record based on if it has DATA.ID

The app is designed to only look at a given day for all the forms and tables. The day can be changed using **$firestore.changeDate(DATE)**.

### Notifications
To use in-app toasts just $emit toast message to the manager component 
 - **$emit('message', { text: 'delivery saved', type: 'success', ding: true }))**

---

## Back End

### Tests

[Jest](https://facebook.github.io/jest/)

### Firebase Authentication

each user will have a corresponding user in Firebase

- OTP using SMS, 	[Firebase phone auth](https://firebase.google.com/docs/auth/web/phone-auth)

- #### [Vue](https://vuejs.org/)
	State management: [Vuex](https://vuex.vuejs.org/en/)

	UI Components Framework: [Vueifiy](https://vuetifyjs.com/en/)

	Routing: [Vue-router](https://router.vuejs.org/en/)

	Internalization: [Vue-i18n](https://kazupon.github.io/vue-i18n/en/)

	Form validation: [Vuelidate](https://monterail.github.io/vuelidate/)

	Firebase integration: [Vuefire](https://github.com/vuejs/vuefire)

	Initial build setup: [Vue-CLI](https://github.com/vuejs/vue-cli/blob/dev/docs/README.md)

### Security rules

[Cloud Firestore Security rules structure](https://firebase.google.com/docs/firestore/security/rules-structure) allow you to control access to documents and collections in your database.

- [Authorization](https://firebase.google.com/docs/database/security/#section-authorization)
- [Data validation](https://firebase.google.com/docs/database/security/#section-validation)

---

## Firebase - example data

```javascript
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
    whatsapp: '+62 123 123 123',
    address: 'Jalan Batu Mejan No. 88, Canggu, Kuta Utara, Kabupaten Badung, Bali 80361',
    email: 'some@address.com',
    geolocation: {
      latitude: '8.39111',
      longitude: '115.07361'
    },
    type: {
      employee: false,
      client: false,
      buyer: true
    },
    role: {
      communityManager: false,
      facilityManager: false,
      superAdmin: true
    },
    houseType: {
      id: 'Tu4SFfDhBUgAwGsvfopc',
      name: 'villa'
    },
    approved: false
  }
]

const deliveryCollection = [
  {
    timestamp: '2018-03-15T09:55:48.942Z',
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

const workerHoursCollection = [
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

const materialTypeCollection = [
  {
    name: 'Material 1',
    pricePerKilo: 2000
  }
]

const materialCollection = [
 {
	worker: {
	   id: 'Tu4SFfDhBUgAwGsvfopc',
	   name: 'Worker name'
	},
	banjar: {
	   id: 'Tu4SFfDhBUgAwGsvfopc',
	   name: 'Banjar name'
	},
	organic: 10,
	inorganic: 10,
	timestamp: '2018-03-15T09:55:48.942Z'
   }
]

// villa, household, business
const houseTypesCollection = [
  {
    name: 'Villa',
    collectionFee: 20000
  }
]
```
---

### User roles

#### Community manager

- Community manager works in the village and talks with customers, households, businesses, villas and public facilities. He educates the village and discusses the rule and role of separation, he collects fees, he is on the ground and the ears and eyes of the facility manager.

#### Facility manager

- The facility manager works at the facility. He manages the workers, the separation and weighing of delivered waste/materials, the sorting and weighing of plastics, paper and metal. He makes compost, he tracks worker hours

#### Super admin

- access to internal statistics, adding new facilities, changing default prices

#### Other

There are more people in the system but they are not system users (have no login in the system) -

- workers of the facility - people who sort materials, truck drivers
- clients - people who buy compost, plastic, etc
- Customers
	- household - locals
	- villas - bules :)
	- businesses - restaurants, hotels
	- public facilities - schools

---

## Predefined lists of values

- banjar list
- material type

---

## Functionality

#### Auth

1. Registration

	System users (community manager and facility manager) register using their mobile phone and an OTP sent to them via SMS.

2. Application to register

	Customers apply to be added to the system, however they do not become system users.

3. Authentication

	[Firebase phone auth](https://firebase.google.com/docs/auth/web/phone-auth)

	**Phone numbers that end users provide for authentication will be sent and stored by Google to improve our spam and abuse prevention across Google services, including but not limited to Firebase. Developers should ensure they have appropriate end-user consent prior to using the Firebase Authentication phone number sign-in service.**

	Users login through OTP. Users will only need to login if they change the device they are using.

#### Facility (community and facility managers)

1. Add/edit delivery
	- driver (non system user, person)
	- banjar name(predefined list of values in db)
	- #villas
	- #households
	- #businesses
	- #public facilities
	- comment

2. Add/edit material

	- worker (non system user, person)
	- inorganic material kg
	- organic material kg
	- banjar name (predefined list of values in db)

3. Add/edit stock

	- weight kg
	- type of material (predefined list of values in db)
	- comment

4. Add/edit worker hours

	- name
	- type
	- note
	- morning in/out hours
	- afternoon in/out hours

5. Add/edit a new buyer

	- name
	- email
	- company
	- sms/call
	- whatsapp
	- address
	- notes
6. Add/edit a sale

	- buyer name (chosen from existing customers in the database)
	- records with:
		- material name
		- kg
		- price per kg
		- total price
		- final price (can be negotiated to be different than adviced price)

7. Add/edit an expense
	- type (predefined list of values in db, e.g. fuel, maintenance)
	- cost
	- notes

8. Add/edit a customer - automatically prefilled from a customer application

	- name
	- type (household, villa, business)
	- email
	- company
	- sms/call
	- whatsapp
	- address
	- notes

9. Approve customer application (community manager)

	add "approved" flag to the customer detail

10. Collect the fee from a customer (community manager)

	1. Add a fee collection record
		- date time
		- monthly fee
		- total paid ?
		- paid until

	2. Send a confirmation email to the customer

11. Add/edit daily note
	- note text

12. User actions log


#### Community public page

1. Submission of a feedback/contact us form

---

## Cloud Functions

- sending emails - Welcome email, EOD notification
- daily gathering of data for graphs

---

## Definitions

- Delivery - delivery of the collected trash around the village
- Buyer - anyone who wants to buy the facility products - compost, plastic, etc.
