import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { shiftService } from '../services/shifts-api';
import { common } from '../components/common/common';
import Divider from '@material-ui/core/Divider';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
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

function AvailableShifts() {
  const classes = useStyles();
  const [shifts, setShifts] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [requestIndex, setRequestIndex] = React.useState(null);

  useEffect(() => {
    shiftService
      .getShifts()
      .then((response) => {
        response.sort((a, b) => (a.endTime > b.endTime && 1) || -1);
        setShifts(response);
      })
      .catch((e) => {
        setMessage(e);
        setOpen(true);
      });
  }, []);

  function bookShift(shift, index) {
    setRequestIndex(index);
    shiftService
      .bookShifts(shift)
      .then(() => {
        shiftService
          .getShifts()
          .then((response) => {
            response.sort((a, b) => (a.endTime > b.endTime && 1) || -1);
            setShifts(response);
          })
          .catch((e) => {
            setMessage(e);
            setOpen(true);
          });
      })
      .catch((e) => {
        setMessage(e);
        setOpen(true);
      })
      .finally(() => {
        setRequestIndex(null);
      });
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Card className={classes.root} variant="outlined">
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {message}
        </Alert>
      </Snackbar>

      {shifts.map((element, index) => {
        return (
          <Grid key={element.id}>
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
              <Grid className="right-item">
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
                  [
                    new Date(element.startTime) <= new Date() ? (
                      <Typography>Shift Passed</Typography>
                    ) : (
                      <BookButton
                        variant="outlined"
                        onClick={() => {
                          bookShift(element, index);
                        }}
                      >
                        {requestIndex === index ? (
                          <Typography>BOOKING...</Typography>
                        ) : (
                          <Typography>BOOK</Typography>
                        )}
                      </BookButton>
                    ),
                  ]
                )}
              </Grid>
            </Grid>
            <Divider />
          </Grid>
        );
      })}
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

const BookButton = withStyles((theme) => ({
  root: {
    color: '#16a64d',
    backgroundColor: '#FFF',
    '&:hover': {
      backgroundColor: '#55cb82',
    },
  },
}))(Button);

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default AvailableShifts;
