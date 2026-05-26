const fallbackNumber = '573001234567';

export const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || fallbackNumber;

export function openWhatsApp(message) {
  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/${whatsappNumber}?text=${encoded}`, '_blank', 'noopener,noreferrer');
}

export function productMessage(product, notes = '') {
  return [
    `Hola Sapitos, quiero pedir: ${product.name}`,
    `Precio: ${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(product.price)}`,
    `Categoría: ${product.type}`,
    notes ? `Notas: ${notes}` : '',
    '¿Me cuentan cómo seguimos?'
  ]
    .filter(Boolean)
    .join('\n');
}

export function cartMessage(items, shipping, total) {
  const lines = items.map(
    (item) => `- ${item.name} x${item.quantity}: ${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(item.price * item.quantity)}`
  );

  return [
    'Hola Sapitos, quiero comprar este pedido:',
    ...lines,
    `Envío estimado: ${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(shipping)}`,
    `Total: ${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(total)}`,
    'Quedo pendiente para confirmar datos y pago.'
  ].join('\n');
}
