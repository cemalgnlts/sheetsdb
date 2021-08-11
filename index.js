const sheetsdb = require("./dist/sheetsdb-node.min.js");

sheetsdb
    .connect("AKfycbzBl3xjUyUIeWrw4Oh1gN9HnNtdfRjXxIf5ll2q6xnISKBE9YEmHnfNLvWcZWaevFQf")
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
    afterConnect();
}

async function afterConnect() {
    const res = await Kitten.findOne({ name: "Blue" });
    console.log(res);
}

