import { useState } from 'react';
import Box from '@mui/system/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import Examples from '../../songs'
import ChordInfo from '../../types/ChordInfo';

type ChangeSongProps = {
  chords: ChordInfo[]
  setChords: Function
}

const ChangeSong = ({chords, setChords}: ChangeSongProps) => {
  const [open, setOpen] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [errors, setErrors] = useState("");

  const songIsSaved = Examples.map(e => JSON.stringify(e.chords)).includes(JSON.stringify(chords));

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

  const selectChords = (selectedChordsString?: string) => {
    if (selectedChordsString !== undefined) {
        const selectedChords: ChordInfo[] = JSON.parse(selectedChordsString);
        setChords(selectedChords);
        setUserInput(JSON.stringify(selectedChords));
        handleClose();
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
    '& textarea':
    {
      fontFamily: 'monospace',
    }
  }

  const examples = Examples.map((option, index) => <MenuItem key={index+1} value={JSON.stringify(option.chords)}>{option["name"]}</MenuItem>)

  examples.push(<MenuItem key={0} value={undefined}>Custom</MenuItem>);

  return (
  <>
  <Button sx={{
    '&.MuiButton-root:hover': {backgroundColor: 'blue'},
    color: 'white',
    padding: '1rem',
    backgroundColor: 'blue'
  }} onClick={handleOpen}>Change Song</Button>
  <Modal
    sx={{backgroundColor: 'white', p: 2, fontFamily: 'monospace'}}
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    >
    <form onSubmit={(e) => handleSubmitTune(e)}>
      <Stack>
        <Box>{errors}</Box>
        <FormControl fullWidth>
          <InputLabel id="simple-song-select-label">Saved Song</InputLabel>
          <Select
            labelId="simple-song-select-label"
            id="song-select"
            label="Saved Song"
            value={songIsSaved ? JSON.stringify(chords) : undefined}
            onChange={e => selectChords((e.target as HTMLInputElement).value)}
            >
            {examples}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained">Use Tune Below</Button>
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
