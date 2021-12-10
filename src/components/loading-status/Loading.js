import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  loading: {
    width: '100%',
    height: '100vh',
    position: 'relative',
  },
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
  },
  spinner: {
    width: 80,
    height: 80,
    color: '#fb4226',
  },
}));

export default function Loading() {
  const classes = useStyles();
  return (
    <div className={classes.loading}>
      <div className={classes.content}>
        <CircularProgress className={classes.spinner} />
        <h3>Loading...</h3>
      </div>
    </div>
  );
}
