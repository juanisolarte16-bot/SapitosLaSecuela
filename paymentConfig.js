export const paymentConfig = {
  sandbox: true,
  currency: 'COP',
  publicKeys: {
    wompi: import.meta.env.VITE_WOMPI_PUBLIC_KEY || 'pub_test_reemplazar_en_env',
    mercadoPago: import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY || 'TEST-reemplazar-en-env'
  },
  methods: [
    {
      id: 'wompi',
      name: 'Wompi',
      description: 'Preparado para checkout real con llave pública y backend de transacciones.'
    },
    {
      id: 'mercadopago',
      name: 'Mercado Pago',
      description: 'Preparado para redirigir a una preferencia generada desde backend.'
    },
    {
      id: 'pse',
      name: 'PSE',
      description: 'Pago bancario disponible al conectar el proveedor en backend.'
    },
    {
      id: 'card',
      name: 'Tarjeta débito/crédito',
      description: 'Captura segura debe ocurrir con SDK oficial del proveedor.'
    },
    {
      id: 'manual',
      name: 'Nequi/Daviplata manual',
      description: 'Simulación funcional para confirmar pedido por WhatsApp.'
    }
  ]
};

export function simulatePayment(order) {
  return {
    ok: true,
    reference: `SAP-${Date.now().toString().slice(-7)}`,
    order,
    message:
      'Pedido registrado en modo simulación. Conecta un backend para crear transacciones reales y validar pagos.'
  };
}
