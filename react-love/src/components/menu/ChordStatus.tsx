import Box from '@mui/system/Box';

type ChordStatusProps = {
  playingChord: number | null
}
const ChordStatus = ({playingChord}: ChordStatusProps) => {
  return (
    <Box
      sx={{ maxWidth: '8rem' }}
      className="cell"
      id="play-color">
      { playingChord !== null ? "Chord " + playingChord : "Not playing" }
    </Box>
  )
}

export default ChordStatus;
