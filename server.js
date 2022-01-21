// Here I am noting that the server is using express.js 
// The following line instatiates the server 
// These two lines of code basically set-up the server 
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

// This was used to create a "route" that the front-end can request data from 
const { animals } = require('./data/animals');

// Created this function as a Query to filter certain components of the array 
function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    // Note that we save the animalsArray as filteredResults here:
    let filteredResults = animalsArray;
    if (query.personalityTraits) {
        // Save personalityTraits as a dedicated array.
        // If personalityTraits is a string, place it into a new array and save. 
        if (typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits];
        } else {
            personalityTraitsArray = query.personalityTraits;
        }
        // Loop through each trait in the personalityTraits array; 
        personalityTraitsArray.forEach(trait => {
            // Check the trait against each animal in the filteredResults array.
            // Remember, it is initially a copy of the animalsArray, 
            // but here we're updating it for each trait in the .forEach() loop.
            // For each trait being targeted by the filter, the filteredResults 
            // array will then contain only the entries that contain the trait, 
            // so at the end we'll have an array of animals that have every one
            // of the traits when the .forEach() loop is finished.
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
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    // return the filtered results: 
    return filteredResults;
}

// This function is being used to tell how to find the animal ID 
// The const states that the results will filter for the animal ID
// It will also go through a loop? 
function findById(id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
}

// This is used to "add the route"
app.get('/api/animals', (req, res) => {
    // Alright, here, I am 'Calling the function' that I created earlier, 
    // and I am doing so with the first arguement 'query' 
    // The variable 'results' will give me the animal
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results)
    };
    res.json(animals);
});

// This is another "route" that I created
// it is used in getting specific ID's of animals 
app.get('/api/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    // Here the code was updated
    // if/else statement was added
    // displays either a object from the json
    // else a 404 error appears 
    if (result) {
    res.json(result);
    } else {
        res.send(404);
    }
});


// This was added to "chain" 
// I took out the hardcoded PORT valueo of 3001 
// Chained the PORT variable I created on top of the page 
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});