import { useState } from 'react';
import Box from '@mui/system/Box';
import Button from '@mui/material/Button';
import { ChordInfo } from '../board/Chord'
import { Input } from '@mui/base/Input';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

type ChangeSongProps = {
  chords: ChordInfo[]
  setChords: Function
}

const modalStyle = {
  bgcolor: 'white',
  boxShadow: 1,
  borderRadius: 2,
  p: 2,
  minWidth: 300,
};

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

  return (
  <>
  <Button sx={{ color: 'white', padding: '1rem' }} onClick={handleOpen}>Change Song</Button>
  <Modal
    sx={modalStyle}
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    >
    <form onSubmit={(e) => handleSubmitTune(e)}>
      <Box>{errors}</Box>
      <Button type="submit" variant="contained">Click to enter tune</Button>
      <Input
        multiline
        rows={20}
        defaultValue={JSON.stringify(chords)}
        onInput={populateUserInput}
        />
    </form>
  </Modal>
  </>
  )
}

export default ChangeSong;
