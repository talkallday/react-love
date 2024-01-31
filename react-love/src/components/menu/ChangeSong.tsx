import { useState } from 'react';
import Box from '@mui/system/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import ChordInfo from '../../types/ChordInfo';

type ChangeSongProps = {
  chords: ChordInfo[]
  setChords: Function
}

const ChangeSong = ({chords, setChords}: ChangeSongProps) => {
  const [open, setOpen] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [errors, setErrors] = useState("");

  const populateUserInput = (e: React.FormEvent<HTMLDivElement>) => {
    setUserInput((e.target as HTMLTextAreaElement).value);
  }

  const handleSubmitTune = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const tunes = userInput.replace(/(\r\n|\n|\r|\s)/gm, "");
      const jsonTune: ChordInfo[] = JSON.parse(tunes);
      setChords(jsonTune);
      handleClose();
    }
    catch(error) {
      if (error instanceof Error) {
        setErrors(error.message);
      }
    }
  }

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const inputStyle = {
    backgroundColor: 'white',
    '&.MuiOutlinedInput-input': {fontFamily: 'monospace'},
  }

  return (
  <>
  <Button sx={{
    '&.MuiButton-root:hover': {backgroundColor: 'blue'},
    color: 'white',
    padding: '1rem',
    backgroundColor: 'blue'
  }} onClick={handleOpen}>Change Song</Button>
  <Modal
    sx={{backgroundColor: 'white', p: 2}}
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    >
    <form onSubmit={(e) => handleSubmitTune(e)}>
      <Stack>
        <Box>{errors}</Box>
        <Button type="submit" variant="contained">Click to enter tune</Button>
        <TextField
          multiline
          sx={inputStyle}
          rows={10}
          defaultValue={JSON.stringify(chords)}
          onInput={populateUserInput}
          />
        <Button sx={{color: 'white'}} onClick={handleClose}>Close</Button>
      </Stack>
    </form>
  </Modal>
  </>
  )
}

export default ChangeSong;
