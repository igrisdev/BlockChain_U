Métodos

FABRICANTE
POST /registrar_celular

http://localhost:3000/fabricante/registrar_celular

{
  "fabricante": "Samsumg",
  "estado": "En fabrica",
  "imei": 5,
  "modelo": "3",
  "marca": "3"
}

DISTRIBUIDOR
POST /adquirir_celular

http://localhost:3000/distribuidor/adquirir_celular

{
  "imei": 5,
  "distribuidor": "Juan",
  "estado": "En distribución"
}

POST /vender_celular

http://localhost:3000/distribuidor/vender_celular

{
  "imei": 5,
  "id_propietario": 1,
  "nombres": "Juan",
  "estado": "En venta"
}

USUARIO