import State from '../State.js';

type VolumeSliderProps = {
  volumeCallback: Function,
  volume: number
}

const VolumeSlider = ({volumeCallback, volume}: VolumeSliderProps) => {
  return (
    <input
      type="range"
      min={0}
      max={10}
      step={0.2}
      value={volume}
      onChange={(event) => volumeCallback(event.target.valueAsNumber)}
    />
  )
}

export default VolumeSlider;
