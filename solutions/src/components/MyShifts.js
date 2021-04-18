import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { shiftService } from '../services/shifts-api';
import { common } from '../components/common/common';
import Divider from '@material-ui/core/Divider';
import './styles.css';

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

function MyShifts(props) {
  const classes = useStyles();
  const [shifts, setShifts] = useState([]);
  const [requestIndex, setRequestIndex] = React.useState(null);

  useEffect(() => {
    shiftService.getShifts().then((response) => {
      setShifts(common.sortBookedList(response));
    });
  }, []);

  function cancelShift(shift, index) {
    setRequestIndex(index);
    shiftService
      .cancelShift(shift)
      .then((response) => {
        shiftService
          .getShifts()
          .then((response) => {
            setShifts(common.sortBookedList(response));
          })
          .finally(() => {
            setRequestIndex(null);
          });
      })
      .finally(() => {
        setRequestIndex(null);
      });
  }

  return (
    <Card className={classes.root} variant="outlined">
      {shifts.length > 0 ? (
        shifts.map((element, index) => {
          return (
            <Grid key={index}>
              <Grid className="row">
                <Grid>
                  <Typography className={classes.time} color="textSecondary">
                    {common.formatDateTime(new Date(element.startTime))} -{' '}
                    {common.formatDateTime(new Date(element.endTime))}
                  </Typography>
                  <Typography className={classes.title} color="textSecondary">
                    {element.area}
                  </Typography>
                </Grid>
                <Grid>
                  <CancelButton
                    disabled={new Date(element.endTime) <= new Date()}
                    variant="outlined"
                    onClick={() => {
                      cancelShift(element, index);
                    }}
                  >
                    {requestIndex === index ? (
                      <Typography>CANCELLING...</Typography>
                    ) : (
                      <Typography>CANCEL</Typography>
                    )}
                  </CancelButton>
                </Grid>
              </Grid>
              <Divider />
            </Grid>
          );
        })
      ) : (
        <Typography>
          You dont have any shifts booked. Goto 👉{' '}
          <span
            style={{ color: '#004fb4' }}
            onClick={() => {
              props.setValue(1);
            }}
          >
            available shifts
          </span>{' '}
          and book.
        </Typography>
      )}
    </Card>
  );
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
