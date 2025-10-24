import { MapResponse } from '../../models/types/response-map';
import { CardClientMap } from './card';
import { MapFilters } from './filters';
import { MapLibreGl } from './map';

export function ClientMap({ data }: MapResponse) {
  return (
    <CardClientMap filters={<MapFilters />}>
      <MapLibreGl data={data} />
    </CardClientMap>
  );
}
