# React/React Native Stripe Client

React/React Native Stripe wrapper for using Stripein Web/iOS/Android.

## Installation

```javascript
npm install react-native-stripe-client --save
```

## Creating a token [:link:](https://stripe.com/docs/api/tokens/create_card)

```javascript
const stripe = require("stripe-client")("YOUR_PUBLISHABLE_STRIPE_API_KEY");
const response = stripe.createToken({
  card: {
    number: "4242424242424242",
    exp_month: 12,
    exp_year: 2020,
    cvc: "123"
  }
});
```

### Creating a bank account token [:link:](https://stripe.com/docs/api/tokens/create_bank_account)

```javascript
const stripe = require("stripe-client")("YOUR_PUBLISHABLE_STRIPE_API_KEY");
const information = {
  bank_account: {
    country: "US",
    currency: "usd",
    account_holder_name: "saroj s",
    account_holder_type: "individual",
    routing_number: "220000000",
    account_number: "00012234334"
  }
};
const bank = await stripe.createToken(information);
const token = bank.id;
```

### Creating a PII token [:link:](https://stripe.com/docs/api/tokens/create_pii)

```javascript
var stripe = require("stripe-client")("YOUR_PUBLISHABLE_STRIPE_API_KEY");
var information = {
  pii: {
    personal_id_number: "000000000"
  }
};
const pii = await stripe.createToken(information);
const token = pii.id;
```

### Create a PaymentMethod [:link:](https://stripe.com/docs/api/payment_methods/create)

```javascript
const response = stripe.createPaymentMethod("card", {
  number: "4242424242424242",
  exp_month: 12,
  exp_year: 2020,
  cvc: "123"
});
```

### Create a SetupIntent [:link:](https://stripe.com/docs/api/setup_intents/create)

```javascript
const intentResponse = stripe.handleCardSetup(
  setupIntentId,
  id, //PaymentMethod id
  clientSecret
);
```
