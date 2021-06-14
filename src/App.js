import './App.css';
import ChartRace from 'react-chart-race';
import React, { useState, useEffect } from 'react'


function App() {

  let master_covid = []
  let master_date = []
  let index = 0;
  let currentDate = "5/13/21"
  let [date, setDate] = useState("");
  const [data,setData] = useState([])
  let randomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;


  fetchData()
  useEffect(() => {

    const timer = setInterval(() => {
      currentDate = master_date[index]
      setDate(currentDate)
      setData(getData(currentDate))
      if (index == 29) {
        clearInterval(timer)
      }
      index++;
    }, 1000)

    

  }, [])

  // logic covert 
  // 
  async function fetchData() {
    let covidData = []
    let dateArray = []
    try {
      const res = await fetch('https://disease.sh/v3/covid-19/historical?lastdays=30');
      covidData = await res.json()

      Object.entries(covidData).forEach(([key, value]) => {

        let dat = value.timeline.cases;
        Object.entries(dat).forEach((key, value) => {

          if (dateArray.includes(key[0])) {

          } else {
            dateArray.push(key[0])
          }

        })
      })

    } catch (err) {
      console.log(err);
    }

    master_covid = covidData
    master_date = dateArray

  }



  function getData(date) {
    const data = []
    Object.entries(master_covid).forEach(([key, value]) => {

      let con = {
        id: key, title: value.country, value: value.timeline.cases[date], color: randomColor()
      }

      data.push(con) //push specific data to new array
    }
    );

    return data.sort(function(a, b){return b.value-a.value}).slice(0,12);
  }



  return (
    <div className="App">
      <h1>Covid Global Cases by SGN</h1>
      <label>{date}</label>
      <ChartRace
        data={data}
        backgroundColor='white'
        width={760}
        padding={12}
        itemHeight={58}
        gap={12}
        titleStyle={{ font: 'normal 400 13px Arial', color: 'rgb(0 0 0)' }}
        valueStyle={{ font: 'normal 400 11px Arial', color: 'rgb(0 0 0)' }}
      /> 


    </div>
  );
}

export default App;
