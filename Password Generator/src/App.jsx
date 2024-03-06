import React, { useState } from 'react';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import 'bootstrap/dist/css/bootstrap.min.css';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import './App.css';

function App() {
  const [password, setPassword] = useState('');
  const [T1, setT1] = useState(true);
  const [T2, setT2] = useState(true);
  const [length, setLength] = useState(8);

  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numberChars = '0123456789';
  const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  let chars = lowercaseChars + uppercaseChars;
  if (T1) chars += numberChars;
  if (T2) chars += specialChars;

  const handleChange = (event, value) => {
    setLength(value);
    let new_password = '';
    for (let i = 0; i < value; i++) {
      let num = Math.floor(Math.random() * chars.length);
      new_password += chars.charAt(num);
    }
    setPassword(new_password);
  };

  const handleToggle1 = () => {
    setT1(!T1);
  };

  const handleToggle2 = () => {
    setT2(!T2);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(password).then(() => {
      console.log('Text copied to clipboard:', password);
    }).catch((error) => {
      console.error('Failed to copy text to clipboard:', error);
    });
  };

  return (
    <div className='container p-4 d-flex flex-column align-items-center row-gap-3'>
      <p className='display-1'>Random Password Generator</p>
      <div className='align-items-center'>
        <Box sx={{ width: 300 }}>
          <Slider
            onChange={handleChange}
            defaultValue={8}
            valueLabelDisplay='on'
            min={8}
            max={15}
          />
        </Box>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={T1} onClick={handleToggle1} />}
            label='Include numbers'
          />
          <FormControlLabel
            control={<Checkbox checked={T2} onClick={handleToggle2} />}
            label='Include special characters'
          />
        </FormGroup>
        <div style={{ width: 300, overflow: 'auto' }}>
          {password}
        </div>
        <button onClick={handleCopyToClipboard}>Copy</button>
      </div>
    </div>
  );
}

export default App;
