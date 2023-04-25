var data = JSON.stringify({
  collection: "pancake",
  database: "pancakes",
  dataSource: "Cluster0",
  projection: {
    _id: 1,
  },
});

var config = {
  method: "post",
  url: "https://data.mongodb-api.com/app/data-tjfvf/endpoint/data/beta/action/findOne",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Request-Headers": "*",
    "api-key":
      "0TRqzWJSlcuDeE9XFn5pQrqjWUDJHB0schLiOU9qFXcsXHjmFAedgjEnaJghqjrc",
  },
  data: data,
};

export default config;
