# [green-village-project](http://mph-bali.org/en/pererenan-project/)
Powering MPH recycling and composting facilities in Bali

[Persona Real Time Board](https://realtimeboard.com/app/board/o9J_k0Yt1AU=/)

---

### Tentative Stack

- [Carbon Design Systems](http://www.carbondesignsystem.com/)
-- [GitHub](https://github.com/carbon-design-system/)
-- [Design](https://github.com/carbon-design-system/carbon-design-kit)

# Front End

- #### [Vue](https://vuejs.org/)
	State management: [Vuex](https://vuex.vuejs.org/en/)

	UI Components Framework: [Vueifiy](https://vuetifyjs.com/en/)

	Routing: [Vue-router](https://router.vuejs.org/en/)

	Internalization: [Vue-i18n](https://kazupon.github.io/vue-i18n/en/)

	Form validation: [Vuelidate](https://monterail.github.io/vuelidate/)

	Firebase integration: [Vuefire](https://github.com/vuejs/vuefire)

	Initial build setup: [Vue-CLI](https://github.com/vuejs/vue-cli/blob/dev/docs/README.md)

# Back End

- #### AWS

-- EC2
-- S3

- #### Firebase

-- Authentication
--- SMS
--- Email
--- Facebook

-- Client Hosting

-- Storage Buckets

-- DataStore

- #### Docker?
-- Probably not

-- Analytics

-- Notifications

-- Predictions

-- AdMob

-- Dynamic Links

-- Stability
--- Crashlytics
--- Performance
--- Test Lab

-- Develop

---

### TODO

- Setup Google Firebase hosting

---

## Stack Proposal

### Core
- [react](https://github.com/facebook/react)
- [react-router](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-a-router)
- [mobx](https://github.com/mobxjs/mobx)
- [mobx-react](https://github.com/mobxjs/mobx-react)
- [styled-components](https://github.com/styled-components/styled-components)

### Code Formatting
- [Prettier](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#formatting-code-automatically)

### Internationalization
- [react-i18next](https://github.com/i18next/react-i18next)

### Analytics
- [Google Analytics](https://analytics.google.com/analytics/web/)
- [react-ga](https://github.com/react-ga/react-ga)

### Creation
- [create-react-app](https://zeit.co/docs/examples/create-react-app)

### Hosting/Deployment
- [Google Cloud](cloud.google.com)
- [now](https://zeit.co/docs/examples/create-react-app)

### Environment variable managment
- [dotenv](https://github.com/motdotla/dotenv)

### Continuous Integration
- [Travis CI](https://docs.travis-ci.com)

### Code decorators? (Great with mobx)
- [Can i use?](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#can-i-use-decorators)

---

## Data Model Propsal

![Proposed Data Model](https://imgur.com/8G40S01.png)

---

## TODO
- Write back end spec
  - I propse we use [node](https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/) and keep our stack all javascript
