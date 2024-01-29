const Option = (choice: number, key: number) => {
  return (
    <option value={choice} key={key}>{choice}</option>
  )
}

export default Option;
