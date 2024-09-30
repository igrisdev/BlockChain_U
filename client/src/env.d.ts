/// <reference path="../.astro/types.d.ts" />

export type CadenaCelulares = {
  ok:     boolean;
  listar: Listar[];
}

export type Listar = {
  data:         Data;
  index:        number;
  previousHash: string;
  hash:         string;
  date:         Date;
}

export type Data = {
  estaReportado: boolean;
  propietario?:  Propietario;
  imei?:         number;
  modelo?:       string;
  marca?:        string;
  precio?:       number;
}

export type Propietario = {
  id_propietario: number;
  nombres:        string;
}
