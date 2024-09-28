Métodos

GET
http://localhost:3000

POST
http://localhost:3000/comprar_celular

{
  "imei": 1020,
  "modelo": "11 PRO MAX",
  "marca": "Iphone",
  "precio": 2000000,
  "propietario": {
    "id_propietario": 100348451,
    "nombres": "Johan Pinta"
  },
  "estaReportado": false
}

POST
http://localhost:3000/revender_celular

{
  "IMEI": 1020,
  "precio": 121212,
  "idPropietario": 111,
  "nombreNuevoPropietario": "camilo"
}

GET
http://localhost:3000/comprobar_robo/1020

PUT
http://localhost:3000/reportar_robo/1020/111