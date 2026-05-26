# Sapitos la secuela ecommerce

Tienda ecommerce hecha con React + Vite para accesorios artesanales, personalizados y juveniles.

## Uso

```bash
npm install
npm run dev
```

Si solo quieres ver una vista previa abriendo un archivo con doble clic, usa `preview.html`.
El `index.html` pertenece a Vite y necesita servidor de desarrollo para montar React.

## Reemplazar imágenes

Las imágenes del catálogo están en `public/catalogo`. Conserva los nombres actuales o actualiza `src/data/products.js`.

## Pagos

El checkout queda en modo simulación/sandbox. Las llaves públicas se leen desde variables de entorno:

```bash
VITE_WOMPI_PUBLIC_KEY=
VITE_MERCADOPAGO_PUBLIC_KEY=
VITE_WHATSAPP_NUMBER=
```

No coloques llaves privadas en el frontend. Para pagos reales, crea un backend que genere transacciones, firmas y preferencias de pago.
