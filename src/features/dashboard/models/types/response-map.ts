type Location = {
  id: string;
  name: string;
  description: string;
  coordinates: [number, number];
  category: string;
  address: string;
  icon: string;
  color: string;
};

export type MapResponse = {
  data: {
    center: [number, number];
    zoom: number;
    locations: Location[];
  };
};
