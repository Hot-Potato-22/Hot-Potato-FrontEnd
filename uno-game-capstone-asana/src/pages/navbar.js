
import React, { useState} from 'react';
import { Navbar, NavbarToggler} from 'reactstrap';
import '../style/navbar.css'
import Context from "../context/Context"

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function NavbarFunc(props){


  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
 

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          Its a little dissapointing if you dont know how to play Uno but here it is:

          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <p>A player wins once they run out of cards.</p>
            <p>If you have 2 cards left click the Uno button then play your card if not you will get 2 more cards. </p>
            <p>A card may only be played if it is a  matching color, number, or symbol on the previous card </p>
            <ul>
              <li>Draw 2</li>
              <p>Opponent must draw 2 cards and forfeit his/her turn.</p>
              <li>Draw 4</li>
              <p>This card allows you to call the next color played and requires the next player to pick 4 cards from the DRAW pile and forfeit his/her turn.</p>
              <li>Reverse</li>
              <p>This card reverses direction of play.</p>
              <li>Skip</li>
              <p>Opponent loses his/her turn and is "skipped".</p>
              <li>Wild</li>
              <p>Change the color being played to any color (including the current color).</p> <p> *Tell your opponent what the color you choose in the chat!* </p>

            </ul>
          </Typography>
        </Box>
      </Modal>

      <Navbar className='navbar-container'>
        <div className='img'>
          <img src={require('../assets/logo.png')} width='100px'/>
        </div>
        <NavbarToggler onClick={toggle} />

        <h2 variant="contained" className='nav-name'onClick={handleOpen}>How To Play</h2>
          {/* <NavbarText className='nav-name'> How To Play </NavbarText>  */}

      </Navbar>
    </div>
  );
}



export default NavbarFunc;