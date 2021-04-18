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

function AvailableShifts() {
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
                  {/* {msToTime(element.startTime)} - {msToTime(element.endTime)} */}
                  {formatDateTime(new Date(element.startTime))} -{' '}
                  {formatDateTime(new Date(element.endTime))}
                </Typography>
                <Typography className={classes.title} color="textSecondary">
                  {element.area}
                </Typography>
              </Grid>
              <Grid
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {element.booked ? (
                  <>
                    <Typography
                      color="textSecondary"
                      style={{ marginRight: '10px' }}
                    >
                      <b>Booked</b>
                    </Typography>
                    <CancelButton disabled={!element.booked} variant="outlined">
                      Cancel
                    </CancelButton>
                  </>
                ) : (
                  <BookButton
                    variant="outlined"
                    onClick={() => {
                      bookShift(element);
                    }}
                  >
                    Book
                  </BookButton>
                )}
              </Grid>
            </Grid>
            <Divider />
          </div>
        );
      })}
    </Card>
  );
}

function bookShift(shift) {
  console.log('dddddddddddddd ->', shift);
  shiftService
    .bookShifts(shift)
    .then((response) => {
      // console.log('object ->', response);
      // setShifts(response);
    })
    .catch((e) => {
      // console.log('e ->', e);
    });
}

function formatDateTime(date) {
  const options = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  return date.toLocaleDateString('EN-us', options);
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

const BookButton = withStyles((theme) => ({
  root: {
    color: '#16a64d',
    backgroundColor: '#FFF',
    '&:hover': {
      backgroundColor: '#55cb82',
    },
  },
}))(Button);

export default AvailableShifts;
