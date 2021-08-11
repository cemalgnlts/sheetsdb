const sheetsdb = require("./dist/sheetsdb-node.min.js");

sheetsdb
    .connect("AKfycbxjMEDV_6zcVhjp4gF4LPqlMar5tIocqKL0C9FqUBhA-JyqVXyImKafxtsp-LCZNneV")
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

async function saveData() {
    const res = await Kitten.findById(1628676210478);
    console.log(res);
}

