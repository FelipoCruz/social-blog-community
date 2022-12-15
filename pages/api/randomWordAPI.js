export default function handler(req, res) {
  const word1 = randomWordAPI();
  const word2 = randomWordAPI2();
  res.status(200).json([`${word1}`, `${word2}`]);


} 

const randomWordAPI = () => {
  const character = allCharacters[Math.floor(Math.random()*allCharacters.length)]
  return character;
}

const randomWordAPI2 = () => {
  const mood = allMoods[Math.floor(Math.random()*allMoods.length)]
  return mood;
}

const allCharacters = [
  // fictional characters
  "Super-Man",
  "Batman",
  "Harry Potter",
  "Iron Man",
  "Spider-Man",
  "Wonder Woman",
  "Gandalf",
  "Captain America",
  "Hercules",
  "Pegasus",
  "Mickey Mouse",
  "James Bond",
  "Bugs Bunny",
  "Peter Pan",
  "Indiana Jones",
  "Rocky Balboa",
  "Vito Corleone",
  "Homer Simpson",
  "King Kong",
  "Fredy Krueger",
  "Goku",

  // animals
  "Dog",
  "Cat",
  "Horse",
  "Mouse",
  "Hypo",
  "Lion",
  "Tiger",
  "Elephant",
  "Wolf",
  "Dolphin",
  "Octopus",
  "Shark",
  "Turtle",
  "Coyote",
  "Elk",
  "Snake",
  "Crocodile",
  "Racoon",
  "Bear",
  "Monkey",
  "Seahorse",
  "Rabbit",
  "Parrot",
  "Mouse",

  // generic subjects
  "Astronaut",
  "Artist",
  "Soccer Player",
  "Chef",
  "Detective",
  "Rock Star",
  "Pilot",
  "Scientist",
  "Teacher",
  "Doctor",
  "Soldier",
  "Police officer",
  "Firefighter",
  "Business man",
  "Veterinarian",
  "Plumber",
  "Dancer",
]

const allMoods = [
  "happy",
  "sad",
  "angry",
  "excited",
  "worried",
  "anxious",
  "scared",
  "mad",
  "bitter",
  "frustrated",
  "horrified",
  "offended",
  "surprised",
  "astonished",
  "relaxed",
  "pleased",
  "afraid",
  "depressed",
  "bored",
  "tired",
  "distracted",
  "interested",
  "pride",
  "guilt",
  "shame",
  "grief",
  "embarrased",
  "jealous",
  "agonizing",
  "loving",
  "arrogant",
  "cheerful",
  "confident",
  "confused",
  "demoralized",
  "suspicious",
  "vengeful",
  "weak",
  "strong",
  "silly",

  // places
  "universe",
  "lake",
  "tree",
  "desert",
  "Mars",
  "moon",
  "galaxy",
  "beach",
  "volcano",
  "fire",
  "himalayas",
  "taj mahal",
  "statue of liberty",
  "machu pichu",
  "corcovado christ",
  "colosseum",
  "Eiffel Tower",
  "Big Ben",
  "leaning tower of Pisa",
  "pyramids of Gyza",
  "Sagrada Familia",
  "Arc de Triomphe",
  "Mount Rushmore"
]