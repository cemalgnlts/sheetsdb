import fetch from "node-fetch";

const TYPES = {
    "String": String,
    "Number": Number
};

let baseUrl = null;

export class Schema {
    constructor(schema) {
        this.schema = schema;
    }

    getSchema() {
        Object.keys(this.schema).forEach(key => {
            let schemaData = this.schema[key];

            if(schemaData.constructor.name === "Object") {

            } else if(schemaData.constructor.name === "Function") {
                this.schema[key] = schemaData.name;
            }
        });
        
        return this.schema;
    }
}

function Model(name, schema) {
    const schemaKeys = Object.keys(schema);
    const self = this;

    const loadRow = (data) => {
        if(!res.data)
            return;
        
        self._id = data.shift();
        
        data.forEach(cell => {
            const [name, value, type] = cell.split(";");
            console.log(name, value, type);
            self[name] = TYPES[type](value);
        });
    }

    this.create = async (data) => {
        const req = await sendRequest("create", name, schema, data);
        return req.json();
    }

    this.insertMany = async (data) => {
        const req = await sendRequest("insertMany", name, schema, data);
        return req.json();
    }

    this.find = async (data) => {
        const req = await sendRequest("find", name, {}, data);
        const res = await req.text();
        console.log(res);
    }

    this.findOne = async (data) => {
        const req = await sendRequest("findOne", name, {}, data);
        const res = await req.json();
        
        loadRow(res.data);

        return self;
    }

    this.findById = async (id) => {
        const req = await fetch(`${baseUrl}?action=findById&sheetName=${name}&id=${id}`);
        const res = await req.json();

        loadRow(res.data);

        return self;
    }
}

export async function connect(dbId) {
    baseUrl = `https://script.google.com/macros/s/${dbId}/exec`;
    const req = await new fetch(`${baseUrl}?action=ping`);
    return req.json();
}

export function model(name, schemaClass) {
    return new Model(name, schemaClass.getSchema());
}

function sendRequest(action, name, schema, data) {
    return fetch(`${baseUrl}?action=${action}&sheetName=${name}&hl=tr`, {
        method: "POST",
        headers: {
            // To avoid getting stuck with the CORS policy.
            "Content-Type": "text/plain"
        },
        body: JSON.stringify({ schema, data })
    });
}