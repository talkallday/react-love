export const convertVolume = (sliderVolume: number) => {
  const r1 = [0, 10];
  const r2 = [-20, 0];
  if (sliderVolume === 0) {
    return -Infinity;
  }
  return (((sliderVolume - r1[0]) * (r2[1] - r2[0])) / (r1[1] - r1[0])) + r2[0];
}
