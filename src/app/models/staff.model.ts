export type TipoStaff =
  | 'ALLENATORE'
  | 'ALLENATORE_IN_SECONDA'
  | 'DIRIGENTE_ACCOMPAGNATORE'
  | 'DIRIGENTE_ARBITRO'
  | 'MASSAGGIATORE';

export const TUTTI_TIPI_STAFF: TipoStaff[] = [
  'ALLENATORE',
  'ALLENATORE_IN_SECONDA',
  'DIRIGENTE_ACCOMPAGNATORE',
  'DIRIGENTE_ARBITRO',
  'MASSAGGIATORE'
];

export const ETICHETTE_TIPO_STAFF: Record<TipoStaff, string> = {
  ALLENATORE: 'Allenatore',
  ALLENATORE_IN_SECONDA: 'Allenatore in seconda',
  DIRIGENTE_ACCOMPAGNATORE: 'Dirigente accompagnatore',
  DIRIGENTE_ARBITRO: 'Dirigente arbitro',
  MASSAGGIATORE: 'Massaggiatore'
};

export interface Staff {
  id: number;
  tipo: TipoStaff;
  nome: string;
  tipoDocumento: string;
  numeroDocumento: string;
}
