import fetch from "node-fetch";

let baseUrl = null;

export class Schema {
    constructor(schema) {
        this.schema = schema;
    }
}

class Model {
    constructor(name, schema) {
        this._name = name;
        this._schema = schema;
        this._columnSize = Object.keys(schema).length;
    }

    async create(data) {
        const ret = await sendRequest("create", this._name, this._schema, data);
        return ret.text();
    }
}

export async function connect(dbId) {
    baseUrl = `https://script.google.com/macros/s/${dbId}/exec`;
    const req = await new fetch(baseUrl);
    return req.json();
}

export async function model(name, schema) {
    try{
        let req = await fetch(`${baseUrl}?action=init&sheetName=${name}`);
        const res = await req.json();
        console.log("data", res);
        if(res.status === true) {
            return new Model(name, schema);
        } else
            throw res.message;
    } catch(e) {
        throw e;
    }
}

function sendRequest(action, name, schema, data) {
    return fetch(`${baseUrl}?action=${action}&sheetName=${name}`, {
        method: "POST",
        headers: {
            // To avoid getting stuck with the CORS policy.
            "Content-Type": "text/plain"
        },
        body: JSON.stringify({schema, data})
    });
}