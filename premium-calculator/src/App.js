// import logo from './logo.svg';
// import './App.css';
// import { useState } from 'react';

// function App() {
//   const [plan,setPlan]=useState("select");
//   const [tier,setTier]=useState("select");
//   const [sumInsured,setSumInsured]=useState("select");
//   const [adults,setAdults]=useState("select")
//   const [children,setChildren]=useState("select")
//   const [members,setMembers]=useState("select");
//  const [adultAges,setAdultAges]=useState([]);
//  const [childAges,setChildAges]=useState([]);
//   const handleClick=(e)=>{
//     e.preventDefault()
//   const resObject={
//     plan:plan,
//     tier:tier,
//     sumInsured:sumInsured,
//     members:members
//   }
//   console.log(resObject)
//   }
//   return (
//     <div className="App" style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
//       <form onSubmit={handleClick} style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",gap:"20px"}}>
//       <label>
//         Plan
//       <select value={plan} onChange={(e)=>setPlan(e.target.value)}>
//         <option>select</option>
//       <option >SilverSmart</option>
//      </select>
//       </label>
//       <label>
//         Sum Insured
//       <select value={sumInsured} onChange={(e)=>setSumInsured(e.target.value)}>
//       <option>select</option>
//       <option >10000</option>
//       <option >20000</option>
//       <option >30000</option>
//      </select>
//       </label>
//       <label>
//         City Tier
//       <select value={tier} onChange={(e)=>setTier(e.target.value)}>
//         <option>select</option>
//       <option >Tier-1</option>
//       <option >Tier-2</option>
//      </select>
//       </label>
//       {/* <label>
//         Number of members
//       <select value={members} onChange={(e)=>setMembers(e.target.value)}>
//       <option>select</option>
//         <option>1 adult</option>
//       <option>2 adults</option>
//       <option >1 adult + 1 child</option>
//       <option >1 adult+ 2 children</option>
//       <option>1 adult+ 3 children</option>
//       <option >1 adult+ 4 children</option>
//       <option >2 adults+ 1 child</option>
//       <option>2 adults+ 2 children</option>
//       <option >2 adults+ 3 children</option>
//       <option >2 adults+ 4 children</option>
//      </select>
//       </label> */}

// <label>
//         Number Of Adults
//       <select value={adults} onChange={(e)=>{
//         setAdults(e.target.value)
//         console.log(e.target.value)
//         let newAges=[]
//         for(let i=0;i<e.target.value;i++){
//           newAges.push({idx:i,age:25});
//         }
//         setAdultAges(newAges)
//         console.log(adultAges)
//         }}>
//         <option>select</option>
//       <option >1</option>
//       <option >2</option>
//      </select>
//       </label>
//       <label>
//         Number Of Children
//       <select value={children} onChange={(e)=>{
//         setChildren(e.target.value)
//         console.log(e.target.value)
//         let newAges=[]
//         for(let i=0;i<e.target.value;i++){
//           newAges.push({idx:i,age:25});
//         }
//         setChildAges(newAges)
//         console.log(childAges)
//         }}>
//         <option>select</option>
//         <option >0</option>
//         <option >1</option>
//         <option >2</option>
//         <option >3</option>
//         <option >4</option>
//      </select>
//       </label>
//    { adultAges && adultAges.map((adult)=>{
//      return(
//       <label>
//         Adult {adult.idx+1} age:
// <input type='text' key={adult.idx} value={adult.age}  />
//       </label>
//      );
     
//    })}

// { adultAges && childAges && childAges.map((child)=>{
//      return(
//       <label>
//         Child {child.idx+1} age:
// <input type='text' key={child.idx} value={child.age}  />
//       </label>
//      );
     
//    })}

//       <button type='submit' >Submit</button>
//       </form>
//     </div>
//   );
// }

// export default App;




import React, { useState } from 'react';

function App() {
  const [plan, setPlan] = useState("select");
  const [tier, setTier] = useState("select");
  const [sumInsured, setSumInsured] = useState("select");
  const [adults, setAdults] = useState("select");
  const [children, setChildren] = useState("select");
  const [members, setMembers] = useState("select");
  const [adultAges, setAdultAges] = useState([]);
  const [childAges, setChildAges] = useState([]);
  const [premium, setPremium] = useState(null);

  const handleCalculate = (e) => {
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
console.log({
  plan: plan,
  tier: tier,
  sumInsured: parseInt(sumInsured),
  adultAges: adultAgesArray,
  childAges: childAgesArray,
})
    // Send user input to the backend to calculate premium
    // axios.post('http://localhost:5000/calculate_premium', {
    //   plan: plan,
    //   tier: tier,
    //   sumInsured: parseInt(sumInsured),
    //   adultAges: adultAgesArray,
    //   childAges: childAgesArray,
    // })
    //   .then(response => {
    //     setPremium(response.data.premium);
    //   })
    //   .catch(error => {
    //     console.error('Error calculating premium:', error);
    //   });
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
            <option value="10000">10,000</option>
            <option value="20000">20,000</option>
            <option value="30000">30,000</option>
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