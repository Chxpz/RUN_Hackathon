import React, { useState, useEffect } from 'react';
import krypto from './krypto.png';
import avatar1 from './avatars/avatar1.svg';
import avatar2 from './avatars/avatar2.svg';
import avatar3 from './avatars/avatar3.svg';
import avatar4 from './avatars/avatar4.svg';
import avatar5 from './avatars/avatar5.svg';
import './App.css';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Sliders from './components/Sliders';
import Dialog from './components/Dialog';
import MoneyButton from '@moneybutton/react-money-button'


function App() {
  const avatars = [
    {image : avatar1, txid: '3993ee15f7b59e71e9cc0283e6b7a79ecc6d8659f1d8d826164ce349b07d03d1'},
    {image : avatar2, txid: '078f9540a77dac2dbcd0c6dbcca1f5fe5f46a090823ae0080d5b7deef7035d16'},
    {image : avatar3, txid: 'a51060b631f1f7981389adf94daed4b25672a7c28511cf92d4ea595bf45784b1'},
    {image : avatar4, txid: '121c7ea63b7a6ecdaaac7c262550c9177b28895c838dac84ba5cb3083be0fadf'},
    {image : avatar5, txid: 'b26be179d3b01e6eb0cc5c37db8564135ba71a73eb0c19e8af7f81901830c1a9'}
  ]
     
  const skills = ['Power', 'Shield', 'Speed']
  const initialState = {
    Power: 0,
    Shield: 0,
    Speed: 0,
  }
  const initialFields = {
    kryptonian: '',
    author: '',
    id: ''
  }
  const [selected, setSelected] = useState();
  const [state, setState] = useState(initialState);
  const [points, setPoints] = useState(20);
  const [display, setDisplay] = useState(false);
  const [{kryptonian, author, id}, setFields] = useState(initialFields);

  const changeField = e => {
    const { name, value } = e.target;
    setFields(prevState => ({ ...prevState, [name]: value }));
  };

  const createNFT = async () => {
    return await fetch(`http://localhost:8888/createNFT`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
          name: kryptonian,
          author: author,
          image: selected,
          owner: id,
          additionalData: {state},
          points

        })
			})
			.then((response) => { if(response.status === 200) setDisplay(false); return response.json()})
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={krypto} className="App-logo" alt="logo" /><h1 className="App-logo"> KRYPTONIANS</h1>
      </header>
      <main>
      <form noValidate autoComplete="off">
        <TextField name="kryptonian" label="Kryptonian`s name" value={kryptonian} style={{width: '400px', margin: '20px'}} onChange={changeField}/>
        <TextField name="author" label="Your Name (Author)" value={author} style={{width: '400px', margin: '20px'}} onChange={changeField}/>
        <TextField name="id" label="Public Key" value={id} style={{width: '400px', margin: '20px'}} onChange={changeField}/>
      </form>
        <h2 >Choose your Kryptonian</h2>
        {avatars.map(avatar => 
          <Button 
            variant="outlined" 
            color={selected === avatar.txid ? 'secondary' : ''} 
            style={{ margin: '10px'}} 
            onClick={() => setSelected(avatar.txid)}
          >
            <img 
              src={avatar.image} 
              width="200px" 
              style={ {margin: '10px', borderRadius: '10px'}}
            />
          </Button>
        )}
        <div style={{ padding: '20px 0px 20px 0px'}}>
          <h2>Skills (<span style={points < 0 ? {color: 'red'} : {color: 'black'}}>{points}</span> Kryptos left)</h2>
          <br/>
            {skills.map((skill) => 
            <div style={{ maxWidth: '50%', margin: 'auto', backgroundColor: 'rgb(240,248,255)', marginBottom: '20px', padding: '10px', borderRadius: '10px'}}>
              <Sliders name={skill} action={setState} state={state} setPoints={setPoints}/>
            </div>
            )}
        </div>
        <div style={display ? { display: 'block' } : { display: 'none'}}><Dialog content="Go Kryptonian!" action={createNFT}/></div>
        <div style={display ? { display: 'none' } : { display: 'block'}}>
          <MoneyButton
            to='48272@moneybutton.com'
            amount='0.01'
            currency='USD'
            onPayment={() => setDisplay(true)}
            label='Pay'
            />
        </div>

      </main>
    </div>
  );
}

export default App;
