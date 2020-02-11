import React, {useState} from 'react';
import { useSubscription , useMutation } from '@apollo/react-hooks';

import './App.css';
import SUBSCRIPTIONVTO from "./subscribeVTO"
import updateVTO from "./updateVTO"

function App() {
  const [value, setValue] = useState("")

  useSubscription(SUBSCRIPTIONVTO,{
    onSubscriptionData: (result) => {
      let param = result.subscriptionData.data.getNode.node.name

      // Save Data to Mobx Store
      console.log("param", param)
      setValue(param)
    },
  })

  const [handleMutation] = useMutation(updateVTO);

  function handleClick(val) {
    // Save data to Mobx Store
    setValue(val)
  }

  function SaveDatatoBE() {
    // Send data to BE
    handleMutation({ 
      variables: { 
      id: "121d2240-5071-4802-93a5-dbc2274eeb7e",
      name: value
     } 
    });
  }
  
  return (
    <div className="App">
     <input value={value} onChange={e => handleClick(e.target.value)} onBlur={() => SaveDatatoBE()}/>

      <h2>{value}</h2>
    </div>
  );
}

export default App;
