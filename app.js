const fetch = require("node-fetch")

const resultData = () => {fetch("https://s3-ap-southeast-1.amazonaws.com/he-public-data/books8f8fe52.json").then(res => res.json())
.then(body => console.log(body));
}

window.indexedDB = window.indexedDB;
const dbName = "test-db";
const request = window.indexedDB.open(dbName);


request.onerror = (e) => {
    console.error(e);
}

request.onsuccess = (e) => {
    const dbData = request.result;
    console.log(dbData);
}

request.onupgradeneeded = (e) => {
    const db = e.target.result;
    let objectStore = db.objectStore("Movies", {keypath : "id"});

    for (const i in resultData) {
        if (Object.hasOwnProperty.call(resultData, i)) {
            const ele = resultData[i];
            objectStore.add(ele);
        }
    }
}