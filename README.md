# norman

## Installation
run `npm install norman-model`

## Normalization
Modeling an object requires two things: a blueprint and a JSON object. E.g.

```javascript
N.model(
  {
    id: "id",
    name: "name",
    capital: "capitalCity",
    region: ["adminregion", "value"]
  },
  countries.data[1]
);
```

The prop in the blueprint refers to the prop the object will be normalized to and the value refers to the JSON prop the value models value will be derived from.

The model returns a curried function that takes a function as an argument. 

## Model Helpers
