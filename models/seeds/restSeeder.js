const db = require("../../config/mongoose")
const Rest = require("../rest")
const RestJSON = require("./restaurant.json")

db.once("open", () => {
    console.log("mongodb connected!")

    for(let i = 0; i < RestJSON.results.length; i ++) {
        Rest.create({
            name: RestJSON.results[i].name,
            name_en: RestJSON.results[i].name_en,
            category: RestJSON.results[i].category,
            image: RestJSON.results[i].image,
            location: RestJSON.results[i].location,
            phone: RestJSON.results[i].phone,
            google_map: RestJSON.results[i].google_map,
            rating: RestJSON.results[i].rating,
            description: RestJSON.results[i].description
        })
    }
    console.log("done!")
})