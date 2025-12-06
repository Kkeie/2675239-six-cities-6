function getPlacesLabel(count: number): string {
  return `${count} place${count === 1 ? '' : 's'}`;
}

export default getPlacesLabel;
