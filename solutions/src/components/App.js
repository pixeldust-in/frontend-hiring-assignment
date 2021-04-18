import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import MyShifts from './MyShifts';
import AvailableShifts from './AvailableShifts';
import { Grid } from '@material-ui/core';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import './styles.css';

function App() {
  const [value, setValue] = React.useState(0);
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: purple[500],
      },
      secondary: {
        main: green[500],
      },
    },
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid className="main">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="My Shifts" {...a11yProps(0)} />
          <Tab label="Available Shifts" {...a11yProps(1)} />
        </Tabs>

        <TabPanel value={value} index={0}>
          <MyShifts setValue={setValue} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <AvailableShifts />
        </TabPanel>
      </Grid>
    </ThemeProvider>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Grid
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </Grid>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default App;
