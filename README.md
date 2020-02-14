# React/React Native Stripe Client

React/React Native Stripe wrapper for using Stripe in Web/iOS/Android.

## Installation

```javascript
npm install react-native-stripe-client --save
```

[Example](https://codesandbox.io/s/react-native-stripe-client-example-dw9c9)

## Usage

`import stripe from 'react-native-stripe-client'`

`const stripeClient = stripe("YOUR_PUBLISHABLE_STRIPE_API_KEY");`

## Creating a token [:link:](https://stripe.com/docs/api/tokens/create_card)

```javascript
const response = await stripeClient.createToken({
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
const information = {
  bank_account: {
    country: "US",
    currency: "usd",
    account_holder_name: "saroj s",
    account_holder_type: "individual",
    routing_number: "110000000",
    account_number: "000123456789"
  }
};
const bank = await stripeClient.createToken(information);
```

### Creating a PII token [:link:](https://stripe.com/docs/api/tokens/create_pii)

```javascript
var information = {
  pii: {
    personal_id_number: "000000000"
  }
};
const pii = await stripeClient.createToken(information);
```

### Create a PaymentMethod [:link:](https://stripe.com/docs/api/payment_methods/create)

```javascript
const response = await stripeClient.createPaymentMethod("card", {
  number: "4242424242424242",
  exp_month: 12,
  exp_year: 2020,
  cvc: "123"
});
```

### Create a SetupIntent [:link:](https://stripe.com/docs/api/setup_intents/create)

```javascript
const intentResponse = await stripe.handleCardSetup(
  setupIntentId,
  id, //PaymentMethod id
  clientSecret
);
```
