import React, { useEffect, useState } from 'react';
import { Typography } from '@material-ui/core';
import { shiftService } from '../services/shifts-api';

function MyShifts() {
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

  return <Typography>Available Shifts</Typography>;
}

export default MyShifts;
