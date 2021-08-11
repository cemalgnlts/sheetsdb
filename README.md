# SheetsDB

Google Sheets object modeling for JavaScript is like Mongoose.

# Preview

## Initial
```js
const sheetsdb = require("sheetsdb");
```

## Connect

```js
sheetsdb
    .connect("[Apps Script ID]")
    .then(res => console.log("Connected", res.status))
    .catch(res => console.log("Error when connecting", res));
```

## Schema
```js
const kittyScheme = new sheetsdb.Schema({
    name: String,
    age: Number,
    gender: String
});
```

## Model
```js
const Kitten = sheetsdb.model("Kitten", kittyScheme);
```

## Create
```js
Kitten.create({
    name: "Silence",
    age: 3,
    gender: "M"
})
  .then(console.log)
  .catch(console.log)
```

## Insert Many
```js
Kitten.insertMany([
    {
        name: "Silence",
        age: 3,
        gender: "M"
    }, {
        name: "Blue",
        age: 2,
        gender: "F"
    }
])
  .then(console.log)
  .catch(console.log)
```

## Find By Id

```js
const res = await Kitten.findById(1628676210478);
console.log(res.name)
console.log(res);
```