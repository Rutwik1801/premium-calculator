import React, { useState } from 'react';
import axios from "axios"

function App() {
  const [plan, setPlan] = useState("select");
  const [tier, setTier] = useState("select");
  const [sumInsured, setSumInsured] = useState("select");
  const [adults, setAdults] = useState("select");
  const [children, setChildren] = useState("select");
  const [adultAges, setAdultAges] = useState([]);
  const [childAges, setChildAges] = useState([]);
  const [tenure,setTenure]=useState("select")
  const [premium, setPremium] = useState(null);

  const handleCalculate = (e) => {
    // SEND DATA TO BACKEND
    e.preventDefault();
    if (
      plan === "select" ||
      sumInsured === "select" ||
      tier === "select" ||
      adults === "select" ||
      children === "select"
    ) {
      alert("Please select valid values for all fields.");
      return;
    }
    // Prepare adult ages
    const adultAgesArray = adultAges.map((adult) => parseInt(adult.age));

    // Prepare child ages
    const childAgesArray = childAges.map((child) => parseInt(child.age));

    // Send user input to the backend to calculate premium
    axios.post('https://premium-calculator-sstf.vercel.app/calculate_premium', {
      plan: plan,
      tier: parseInt(tier.split("-")[1]),
      sumInsured: parseInt(sumInsured),
      adultAges: adultAgesArray,
      childAges: childAgesArray,
      tenure:parseInt(tenure)
    })
      .then(response => {
        // GET BACK THE PREMIUM
        setPremium(response.data.premium);
      })
      .catch(error => {
        console.error('Error calculating premium:', error);
      });
  };

  const handleAdultAgeChange = (index, age) => {
    // const validAge = Math.min(Math.max(parseInt(age), 25), 90);
    // const newAdultAges = [...adultAges];
    // newAdultAges[index].age = age;
    // setAdultAges(newAdultAges);
    const validAge = parseInt(age);
    const newAdultAges = [...adultAges];
  
    if (validAge <= 24) {
      newAdultAges[index].age = 25;
    } else if (validAge > 90) {
      newAdultAges[index].age = 90;
    } else {
      newAdultAges[index].age = validAge;
    }
  
    setAdultAges(newAdultAges);
  };


  const handleChildAgeChange = (index, age) => {
    // const validAge = Math.min(Math.max(parseInt(age), 0), 24);
    // const newChildAges = [...childAges];
    // newChildAges[index].age = age;
    // setChildAges(newChildAges);
    const validAge = parseInt(age);
    const newChildAges = [...childAges];
  
    if (validAge <= 0) {
      newChildAges[index].age = 0;
    } else if (validAge >= 24) {
      newChildAges[index].age = 24;
    } else {
      newChildAges[index].age = validAge;
    }
  
    setChildAges(newChildAges);
  };

  return (
    <div className="App" style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <form onSubmit={handleCalculate} style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: "20px" }}>
        <label>
          Plan
          <select value={plan} onChange={(e) => setPlan(e.target.value)}>
            <option value="select">Select</option>
            <option value="SilverSmart">SilverSmart</option>
          </select>
        </label>
        <label>
          Sum Insured
          <select value={sumInsured} onChange={(e) => setSumInsured(e.target.value)}>
            <option value="select">Select</option>
            <option value="300000">3,00,000</option>
            <option value="400000">4,00,000</option>
            <option value="500000">5,00,000</option>
          </select>
        </label>
        <label>
          Tenure
          <select value={tenure} onChange={(e) => setTenure(e.target.value)}>
            <option value="select">Select</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </label>
        <label>
          City Tier
          <select value={tier} onChange={(e) => setTier(e.target.value)}>
            <option value="select">Select</option>
            <option value="Tier-1">Tier-1</option>
            <option value="Tier-2">Tier-2</option>
          </select>
        </label>
        <label>
          Number Of Adults
          <select value={adults} onChange={(e) => {
            setAdults(e.target.value);
            let newAges = [];
            for (let i = 0; i < e.target.value; i++) {
              newAges.push({ idx: i, age: 25 });
            }
            setAdultAges(newAges);
          }}>
            <option value="select">Select</option>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </label>
        <label>
          Number Of Children
          <select value={children} onChange={(e) => {
            setChildren(e.target.value);
            let newAges = [];
            for (let i = 0; i < e.target.value; i++) {
              newAges.push({ idx: i, age: 10 });
            }
            setChildAges(newAges);
          }}>
            <option value="select">Select</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </label>

        {adultAges &&
          adultAges.map((adult) => {
            return (
              <label key={adult.idx}>
                Adult {adult.idx + 1} age:
                <input
                  type='number'
                  value={adult.age}
                  onChange={(e) => handleAdultAgeChange(adult.idx, e.target.value)}
                />
              </label>
            );

          })}

        {childAges &&
          childAges.map((child) => {
            return (
              <label key={child.idx}>
                Child {child.idx + 1} age:
                <input
                  type='number'
                  value={child.age}
                  onChange={(e) => handleChildAgeChange(child.idx, e.target.value)}
                />
              </label>
            );

          })}

        <button type='submit' >Calculate Premium</button>
        {premium !== null && <p>Expected Premium: {premium}</p>}
      </form>
    </div>
  );
}

export default App;
