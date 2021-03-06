# XRPayments Rest API Interface for NodeJS

This package provides a client for interacting with the Rest API at https://webhook.xrpayments.co

## Installation

```sh
$ npm i @xrpayments/webhooks-client
```

## Basic Usage

```js
import XRPayments from "@xrpayments/webhooks-client";

XRPayments.setAuthDetails({
  key: "69682cbf-85bd-4507-8cbd-f4ee63fed1dc",
  secret: "bWR3ajJSMWxwR3R5Nmd4cmtCaXNBQT09"
});

try {
  const response = await XRPayments.subscriptions();
  console.log(response.data);
} catch (error) {
  console.log(error.response.status);
}
```

## Methods

### Setup

**`setAuthDetails({key: String, secret: String})`** - Sets the API key and secret used to authorize requests. If this isn't setup, API methods will throw an Error.

```js
XRPayments.setAuthDetails({
  key: "69682cbf-85bd-4507-8cbd-f4ee63fed1dc",
  secret: "bWR3ajJSMWxwR3R5Nmd4cmtCaXNBQT09"
});
```

---

### Subscriptions

**`subscriptions()`** - Returns a list of the current Activity type subscriptions.

```js
const response = await XRPayments.subscriptions();
```

**`subscriptions.create({ address: String })`** - Subscribes the app to all events for the provided address for all transaction types. After activation, all transactions for the requesting address will be sent to the provided webhook id via POST request.

```js
const response = await XRPayments.subscriptions.create({
  address: "rpEPpEr5ED6NzykYunBEJJoMdfjp1t3uf4"
});
```

**`subscriptions.delete({ subscription_id: Number })`** - Deactivates subscription(s) for the provided subscription ID and application for all activities. After deactivation, all events for the requesting subscription_id will no longer be sent to the webhook URL.

```js
const response = await XRPayments.subscriptions.delete({
  subscription_id: 34070368
});
```

---

### Webhooks

**`webhooks()`** - Returns a list of all webhook URLs and their statuses for the authenticating app.

```js
const response = await XRPayments.webhooks();
```

**`webhooks.create({ url: String })`** - Registers a webhook URL for all event types.

```js
const response = await XRPayments.webhooks.create({
  url: "http://yourappname.net/hooks"
});
```

**`webhooks.delete({ webhook_id: Number })`** - Removes the webhook from the provided application’s all subscription configuration.

```js
const response = await XRPayments.webhooks.delete({
  webhook_id: 4192294
});
```

## Show Some Love

If you like to show some love for this package, you can do so by sending me a tip on the XRP Tipbot App to my twitter handle [@XRPeezy](https://twitter.com/xRPeezy/). You can also scan the QR Code below with the XRP Tipbot App if you don't want to search.

![XRPeexy QR Code](https://gdurl.com/Bq1F)
