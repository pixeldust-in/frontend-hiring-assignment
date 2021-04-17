import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { shiftService } from '../services/shifts-api';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    padding: '1em',
  },
  title: {
    fontSize: '0.9rem',
  },
  time: {
    fontSize: '1.2rem',
    fontWeight: 500,
  },
});

function MyShifts() {
  const classes = useStyles();
  const [shifts, setShifts] = useState([]);

  useEffect(() => {
    shiftService
      .getShifts()
      .then((response) => {
        console.log('object ->', response);
        setShifts(response);
      })
      .catch((e) => {
        console.log('e ->', e);
      });
  }, []);

  return (
    <Card className={classes.root} variant="outlined">
      {shifts.map((element, index) => {
        return (
          <div key={index}>
            <Grid
              style={{
                margin: '5px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Grid>
                <Typography className={classes.time} color="textSecondary">
                  {msToTime(element.startTime)} - {msToTime(element.endTime)}
                </Typography>
                <Typography className={classes.title} color="textSecondary">
                  {element.area}
                </Typography>
              </Grid>
              <Grid>
                <CancelButton disabled={element.booked} variant="outlined">
                  Cancel
                </CancelButton>
              </Grid>
            </Grid>
            <Divider />
          </div>
        );
      })}
    </Card>
  );
}

function msToTime(duration) {
  var minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  return hours + ':' + minutes;
}

const CancelButton = withStyles((theme) => ({
  root: {
    color: '#eb3a34',
    backgroundColor: '#FFF',
    '&:hover': {
      backgroundColor: '#ffb7b5',
    },
  },
}))(Button);

export default MyShifts;
