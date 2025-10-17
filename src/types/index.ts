export type Place = {
  id: string;
  imgSrc: string;
  mark?: string;
  priceValue: number;
  priceText: string;
  description: string;
  type: string;
}

export type CityPlaces = {
  cityName: string;
  places: Place[];
}
