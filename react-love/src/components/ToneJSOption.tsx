type OptionProps = {
  synthToggle: Function
}
const ToneJSOption = ({synthToggle}: OptionProps) => {
  return (
    <div className="cell" id="synth-option" onClick={() => synthToggle()}>Turn ToneJs On</div>
  )
}

export default ToneJSOption;
