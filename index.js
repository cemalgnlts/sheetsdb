const sheetsdb = require("./dist/sheetsdb-node.min.js");

sheetsdb
    .connect("AKfycbyDF8oPT7aM4ezlblKPONLsiWtkmoM6TzT7PuVKf12jDJHY1nImBlIZ9sPbyn3DM3CV")
    .then(connect)
    .catch(res => console.log("Error when connecting", res));

const kittyScheme = new sheetsdb.Schema({
    name: String,
    age: Number,
    gender: String
});

const Kitten = sheetsdb.model("Kitten", kittyScheme);

function connect(res) {
    console.log("Connected", res.status);
    saveData();
}

function saveData() {
    Kitten.create({
        name: "Silence",
        age: 3,
        gender: "M"
    })
    .then(console.log)
    .catch(console.log)
}

