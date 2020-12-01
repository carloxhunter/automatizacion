import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DibujarAnaliticas from './DibujarAnaliticas';

let dic =new Map();
dic.set('Tobalaba al sur','https://fotosplataforma.s3.us-east-2.amazonaws.com/Tobalaba_al_sur.png');
dic.set('Sector calle Aldaba','https://fotosplataforma.s3.us-east-2.amazonaws.com/Sector_calle_Aldaba.jpg');
dic.set('Seccion bodega materiales Mardom','https://fotosplataforma.s3.us-east-2.amazonaws.com/Seccion_bodega_materiales_Mardom.png');
dic.set('Recepcion Mardom','https://fotosplataforma.s3.us-east-2.amazonaws.com/Recepcion_Mardom.png');
dic.set('Sector calle las Condes','https://fotosplataforma.s3.us-east-2.amazonaws.com/Sector_calle_las_Condes.png');

export default function ModalDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [message, setMen] = React.useState();
  const [colorbutton, setColorbutton] = React.useState('secondary');


  const handleClickOpen = () => {
    setOpen(true);
  };

  const {Callback} = props;

  const handleClose = () => {
    setOpen(false);
    setColorbutton("primary")
    Callback(message);
  };

  const callbackFunction = (childData) => {
    setMen(childData)
  }

  return (
    <React.Fragment>
      <Button variant="outlined" color={colorbutton} onClick={handleClickOpen}>
        + Analiticas
      </Button>
      <Dialog
        fullWidth={true}
        maxWidth={'xl'}
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">Definicion de analiticas + {props.camaraName}</DialogTitle>
        <DialogContent>
          <DibujarAnaliticas Callback={callbackFunction} fotoUrl={dic.get(props.camaraName)}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Enviar analiticas
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
