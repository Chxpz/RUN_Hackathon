import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    margin: 'auto'
  },
  typo: {
    fontSize: '1.3em'
  }
  
});

function valuetext(value) {
  return `${value}`;
}

export default function Sliders({name, action, state, setPoints}) {
  const classes = useStyles();
  const { Power, Shield, Speed } = state;

  return (
    <div className={classes.root}>
      <Typography id="discrete-slider" className={classes.typo} gutterBottom>
        {name}: {state[name]}
      </Typography>
      <Slider
        defaultValue={0}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={1}
        marks
        min={0}
        max={10}
        onChange={(_e, value) => { action({...state, [name]: value}); setPoints(20 - Power - Shield - Speed)}}
      />
    </div>
  );
}
