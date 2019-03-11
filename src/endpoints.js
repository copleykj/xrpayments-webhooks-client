import EndPoint from "./endpoint-class";

// endpont definition for getting list of subscriptions
export const subscriptionsEndpoint = new EndPoint({
  method: "get",
  url: "/subscriptions"
});

export const subscriptionsEndpoints = {
  // endpoint definition for creating a new subscription.
  create: new EndPoint({
    method: "post",
    url: "/subscriptions",
    bodyParams: {
      Address: String
    }
  }),
  // endpoint definition for deleting a subscription
  delete: new EndPoint({
    method: "delete",
    url: "/subscriptions/:subscription_id",
    urlParams: {
      subscription_id: Number
    }
  })
};

// endpoint definition for getting list of webhooks
export const webhooksEndpoint = new EndPoint({
  method: "get",
  url: "/webhooks"
});

export const webhooksEndpoints = {
  // endpont definition for creating a new webhook
  create: new EndPoint({
    method: "post",
    url: "/webhooks",
    bodyParams: {
      url: String
    }
  }),
  // endpoint definition for deleting a webhook
  delete: new EndPoint({
    method: "delete",
    url: "/webhooks/:webhook_id",
    bodyParams: {
      webhook_id: Number
    }
  })
};
