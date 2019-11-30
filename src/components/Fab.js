import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import SaveIcon from '@material-ui/icons/Save';
import ShareIcon from '@material-ui/icons/Share';
import html2canvas from 'html2canvas';
import domtoimage from 'dom-to-image';


const useStyles = makeStyles((theme) => ({
  speedDial: {
    position: 'fixed',
    '& .MuiFab-primary': {
      backgroundColor: '#1DB954',
    },
    '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
      top: theme.spacing(2),
      left: theme.spacing(2),
    },
  },
}));

const Fab = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSave = () => {
    domtoimage.toPng(document.body)
      .then((dataUrl) => {
        const img = new Image();
        img.src = dataUrl;
        document.body.appendChild(img);
      })
      .catch((error) => {
        console.error('oops, something went wrong!', error);
      });
  };

  const handleShare = () => {};

  const actions = [
    { icon: <SaveIcon />, name: 'Save', onClick: handleSave },
    { icon: <ShareIcon />, name: 'Share', onClick: handleShare },
  ];

  return (
    <SpeedDial
      ariaLabel="SpeedDial example"
      className={classes.speedDial}
      icon={<SpeedDialIcon />}
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
      direction="up"
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={action.onClick}
        />
      ))}
    </SpeedDial>
  );
};

export default Fab;
