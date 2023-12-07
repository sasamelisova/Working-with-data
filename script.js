                                                               // PART ONE

const czechFirstNames = [
  "Jakub", "Eliška", "Adam", "Tereza", "Matěj", "Karolína", "Tomáš", "Anna", "Petr", "Lucie",
  "Filip", "Kateřina", "Martin", "Veronika", "Michal", "Barbora", "Jan", "Markéta", "Ondřej", "Adéla",
  "Václav", "Zuzana", "David", "Nela", "Eva", "Lukáš", "Petra", "Jiří", "Karolína", "Pavel",
  "Marie", "Ladislav", "Alžběta", "Marek", "Klára", "Ondřej", "Lucie", "Patrik", "Elena", "Roman",
  "Nina", "Vojtěch", "Kateřina", "Daniel", "Michaela", "Jiří", "Dominik", "Veronika", "Tomáš", "Alexandra"
];

const czechLastNames = [
  "Novák", "Svobodová", "Dvořák", "Procházková", "Kučera", "Pospíšilová", "Černý", "Marečková", "Liška", "Hájková",
  "Kratochvíl", "Machová", "Šimek", "Růžičková", "Křížek", "Havelková", "Malý", "Tomášová", "Konečný", "Fialová",
  "Janda", "Horáčková", "Svoboda", "Pospíchalová", "Novotný", "Kučerová", "Doležal", "Štěpánová", "Nový",
  "Králová", "Rychlý", "Beranová", "Černý", "Kučerová", "Němec", "Nováková", "Procházka", "Pospíšilová", "Horák",
  "Záhorská", "Štěpánek", "Vlková", "Hlaváček", "Černá", "Vaněk", "Holubová", "Štěpán", "Král", "Navrátilová", "Janda"
];

// Input data
const dtoIn = {
  count: 5,
  age: {
    min: 19,
    max: 35
  }
};

// Creating constant arrays
const gender = ['male', 'female'];
const workload = [10, 20, 30, 40];


// Creating generateEmployees data function
function generateEmploeeData(dtoIn) {
  let dtoOut = [];
  let startAge = dtoIn.age.min;
  let endAge = dtoIn.age.max;
  let count = dtoIn.count;
  // An iteration: while the length of the output array is less than a count, it will repeat
  while (dtoOut.length < count) {
      // finding random values
      let randomFirstName = czechFirstNames[Math.floor(Math.random() * czechFirstNames.length)];
      let randomLastName = czechLastNames[Math.floor(Math.random() * czechLastNames.length)];
      let randomGender = gender[Math.floor(Math.random() * gender.length)];
      let randomWorkload = workload[Math.floor(Math.random() * workload.length)];
      let randomDate = new Date(Math.floor(Math.random() * Date.now()));

      // finding the age variable from the random date of birth
      let monthDiff = Date.now() - randomDate.getTime();
      let ageDate = new Date(monthDiff);
      let year = ageDate.getFullYear();
      let age = Math.abs(year - 1970);

      // checking if the age of the random person correlates with the input values range
      if (age >= startAge && age <= endAge) {
          // preparing the output values
          let myDictionary = {
              "gender": randomGender,
              "birthdate": randomDate.toISOString(),
              "name": randomFirstName,
              "surname": randomLastName,
              "workload": randomWorkload,
              "age": age
          };
      // adding the values to the dtoOut array
      dtoOut.push(myDictionary);
  }
}
  return dtoOut;
};

                                                            // PART TWO

// saving the output of generateEmploeeeData in a variable generatedList
let generatedList = generateEmploeeData(dtoIn);

// creating empty arrays to store the data
let workloadArray = [];
let emptyArray10 = [];
let emptyArray20 = [];
let emptyArray30 = [];
let emptyArray40 = [];
let ageArray = [];
let workloadWomenArray = [];

// Creting function getEmployeeStatistics which takes the generated list as an input and ouputs the statistics
function getEmployeeStatistics(generatedList) {

  // Creating a empty dictionary to store the output data
  let dToOut = {};

  // Iterating through the generated list and finding the required values
  for (let i = 0; i < generatedList.length; i++) {

    // Addind the worload walues to workload array variable
    workloadArray.push(generatedList[i].workload);

    // Checking if the workload equals to 10, 20, 30, 40 for adding to separate arrays
    if (workloadArray[i] == 10) {
      emptyArray10.push(workloadArray[i]);
    };
    if (workloadArray[i] == 20) {
      emptyArray20.push(workloadArray[i]);
    };
    if (workloadArray[i] == 30) {
      emptyArray30.push(workloadArray[i]);
    };
    if (workloadArray[i] == 40) {
      emptyArray40.push(workloadArray[i]);
    };

    // Adding the age values to age array
    ageArray.push(generatedList[i].age);

    // Finding the median, creating a function
    function countMedian(arr) {
      arr.sort((a, b) => a - b);
      const middleIndex = Math.floor(arr.length / 2);
      if (arr.length % 2 === 0) {
          return (arr[middleIndex - 1] + arr[middleIndex]) / 2;
      } else {
          return arr[middleIndex];
      }
    };
    // If gender = female, add values to the workload women array 
    if (generatedList[i].gender == "female") {
      workloadWomenArray.push(generatedList[i].workload);
    }
  };

  // Creating the average age variable
  let avgAge = ageArray.reduce((a, b) => a + b, 0) / ageArray.length;

  // Creating the average women workload variable
  let avgWomenWorkload = workloadWomenArray.reduce((a, b) => a + b, 0) / workloadWomenArray.length;

  // Preparing the required output 
  dToOut["total"] = dtoIn.count;
  dToOut["workload10"] = emptyArray10.length;
  dToOut["workload20"] = emptyArray20.length;
  dToOut["workload30"] = emptyArray30.length;
  dToOut["workload40"] = emptyArray40.length;
  dToOut["averageAge"] = Math.round(avgAge*10)/10;
  dToOut["minAge"] = Math.min(...ageArray);
  dToOut["maxAge"] = Math.max(...ageArray);
  dToOut["medianAge"] = countMedian(ageArray);
  dToOut["medianWorkload"] = countMedian(workloadArray);
  dToOut["averageWomenWorkload"] = Math.round(avgWomenWorkload*10)/10;
  dToOut["sortedByWorkload"] = generatedList.sort((a, b) => a.workload - b.workload);

  // Returning the output values
  return dToOut;
};
// Creating the main function that takes dtoIn as an input and outputs the array of dictionaries with output values
function main(dtoIn) {
  return getEmployeeStatistics(generateEmploeeData(dtoIn));
};
// Checking if the output is correct
console.log(JSON.stringify(main(dtoIn), null, 2));
