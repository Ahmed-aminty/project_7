/* Global Variables */

// Create a new date instance dynamically with JS
const d = new Date();
const newDate = (d.getMonth()+1) + "." + d.getDate() + "." + d.getFullYear();

//the url to retrieve weather information from his api country

const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";

//&units=metric to get celsius temp
//personal api key for open weather map
const apiKey = ",&appid=ca00eb283561e8381b1fc23d7f25984b&units=metric";

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', generateInf);

function generateInf() {
  //get value after click
  const zip = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;

  //getWeatherData to return promise
  getInfoData(zip).then(function(data) {
    
      postData('/temp', {
        temp:data.main.temp,
        city:data.name,
        date:newDate,
        content:feelings
      })
      .then(updatingUI());
    
  });
};


//function called by even listener
//function to get web api
const getInfoData = async (zip)=>{
  const res = await fetch(baseURL+zip+apiKey);
  try {
    const data = await res.json();
     document.getElementById('error').innerHTML= "";
     return data;
  } catch (error) {
    console.log("error",error);
    document.getElementById('error').innerHTML="Incorrect Zip Code";
  }
};

//function to post data
const postData = async ( url = '', data = {})=>{
  const response = await fetch(url, {
  method: 'POST', 
  credentials:'same-origin', 
  headers: {
  'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
});
  try {
    const newData = await response.json();
    document.getElementById('error').innerHTML="";
    return newData
  }catch(error) {
  document.getElementById('error').innerHTML ="Incorrect Zip Code";
  console.log("error", error);
  
}
};

//function to get project data
//updating ui by this data
const updatingUI = async () => {
const res = await fetch("/getRequest");

  try {
    let keepData = await res.json();
    console.log(keepData);
    document.getElementById("date").innerHTML = keepData.date;
    document.getElementById("city1").innerHTML = keepData.city;
    document.getElementById("tempr").innerHTML = keepData.temp + "&degC";
    document.getElementById("content").innerHTML = keepData.content;
  } catch (error) {
   console.log("error", error);
   document.getElementById('error').innerHTML = "Incorrect Zip Code";
  }
};
