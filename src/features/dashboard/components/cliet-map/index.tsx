import { MapData } from '@/features/dashboard/models/types/map-data';
import { CardClientMap } from './card';
import { MapFilters } from './filters';
import { MapLibreGl } from './map';

export function ClientMap() {
  const mockData: MapData = {
    center: [-34.8811, -8.0539],
    zoom: 12,
    locations: [
      {
        id: 'marco-zero',
        name: 'Marco Zero',
        description: 'Praça Rio Branco - Marco inicial de Pernambuco',
        coordinates: [-34.8717, -8.0631],
        category: 'tourism',
        address: 'Praça Rio Branco - Recife Antigo, Recife - PE',
        icon: 'map-pin',
        color: '#E74C3C',
      },
      {
        id: 'hosp-portugues',
        name: 'Real Hospital Português',
        description: 'Hospital Brasileiro, católico',
        coordinates: [-34.8981, -8.0643],
        category: 'sports',
        address: 'Av. Gov. Agamenon Magalhães - Paissandu, Recife - PE',
        icon: 'hospital',
        color: '#3498DB',
      },
      {
        id: 'aeroporto-guararapes',
        name: 'Aeroporto dos Guararapes',
        description: 'Aeroporto Internacional do Recife - Gilberto Freyre',
        coordinates: [-34.9238, -8.1263],
        category: 'transport',
        address: 'Praça Ministro Salgado Filho, s/n - Imbiribeira, Recife - PE',
        icon: 'plane',
        color: '#9B59B6',
      },
      {
        id: 'ufpe',
        name: 'UFPE - Cidade Universitária',
        description: 'Universidade Federal de Pernambuco - Campus Principal',
        coordinates: [-34.945029, -8.052091],
        category: 'education',
        address: 'Av. Prof. Moraes Rego, s/n - Cidade Universitária, Recife - PE',
        icon: 'graduation-cap',
        color: '#F39C12',
      },
      {
        id: 'alto-da-se',
        name: 'Alto da Sé',
        description: 'Centro histórico e patrimônio mundial da UNESCO em Olinda',
        coordinates: [-34.855, -8.008889],
        category: 'heritage',
        address: 'Rua Ladeira da Sé, s/n - Alto da Sé, Olinda - PE',
        icon: 'landmark',
        color: '#8E44AD',
      },
    ],
  };

  return (
    <CardClientMap filters={<MapFilters />}>
      <MapLibreGl data={mockData} />
    </CardClientMap>
  );
}
