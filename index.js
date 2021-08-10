const sheetsdb = require("./dist/sheetsdb-node.min.js");

sheetsdb
    .connect("AKfycbxwpM6Qw1yvv_OyQ9INRSB4CQgDd-lTFBxJiM1kqimeYj6h-PHtelbcYWbqCGbMowLK")
    .then(onReady)
    .catch(res => console.log("Error when connecting", res));

const kittyScheme = new sheetsdb.Schema({
    name: String,
    age: Number,
    gender: String
});

async function onReady() {
    console.log("connected!");
    const Kitten = await sheetsdb.model("Kitten", kittyScheme);
    Kitten.create({
        name: "Silence",
        age: 3,
        gender: "M"
    })
        .then(console.log)
        .catch(console.log)
}

