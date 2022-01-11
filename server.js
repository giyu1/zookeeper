// Created a route that front-end can collect data from 
const { animals } = require('./data/animals')
const express = require('express')

// Code added to instatiate? the server
const app = express();


// Created a filter function
function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    // Note that we save the animalArray as filteredResults down below: 
    // Here I set the variable equal to the animalArray
    let filteredResults = animalsArray;
    if (query.personalityTraits) {
        // Save personalityTraits dedicated to the array.
        // If personalityTrait is a string, place it into a new array and save.
        if (typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits];
        } else {
            personalityTraitsArray = query.personalityTraits
        }
        // Loop through each trait in the personalityTrait array: 
        personalityTraitsArray.forEach(trait => {
            // Check the trait against each animal in the filteredResults array.
            // Remember, it is initially a copy of the animalsArray,
            // but here we're updating it for each trait in the .forEach() loop.
            // For each trait being targeted by the filter, the filteredResults
            // array will then contain only the entries that contain the trait, 
            // so at the end we'll have an array of animals that every one 
            // of the traits when the .forEach() loop  is finished. 
            filteredResults = filteredResults.filter(
                animal => animal.personalityTraits.indexOf(trait) !== -1
            );
        });
    }
    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name)
    }
    return filteredResults;
}



// The app.get is the bridge for the route 
app.get('/api/animals', (req, res) => {
    let results = animals;
    console.log(req.query)
    // Added an 'if' statement  
    if (req.query) {
        results = filterByQuery(req.query, results)
    }
    // This was changed from 'send' to 'json' b/c it now taking large packets of data from the animal variable made    
    res.json(animals);
});

// This was added to "listen" to the server 
app.listen(3001, () => {
    console.log('API server now on port 3001');
});