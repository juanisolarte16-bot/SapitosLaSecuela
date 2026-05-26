import { useMemo, useState } from 'react';
import { formatCOP } from '../data/products.js';
import { paymentConfig, simulatePayment } from '../utils/paymentConfig.js';
import { cartMessage, openWhatsApp } from '../utils/whatsapp.js';

const initialCheckout = {
  fullName: '',
  email: '',
  whatsapp: '',
  address: '',
  city: '',
  delivery: 'Envío nacional',
  payment: 'manual',
  notes: ''
};

export default function Checkout({ cart }) {
  const [form, setForm] = useState(initialCheckout);
  const [result, setResult] = useState(null);
  const [accepted, setAccepted] = useState(false);
  const subtotal = useMemo(
    () => cart.reduce((total, item) => total + item.price * item.quantity, 0),
    [cart]
  );
  const shipping = cart.length ? 12000 : 0;
  const total = subtotal + shipping;

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function submitCheckout(event) {
    event.preventDefault();
    const paymentResult = simulatePayment({
      customer: form,
      items: cart,
      subtotal,
      shipping,
      total
    });
    setResult(paymentResult);
  }

  return (
    <section className="checkout-section" id="checkout">
      <div className="section-heading">
        <p className="eyebrow">Finaliza tu pedido</p>
        <h2>Escoge tu método de pago y confirma tus datos.</h2>
      </div>
      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={submitCheckout}>
          <label>
            Nombre completo
            <input required value={form.fullName} onChange={(event) => updateField('fullName', event.target.value)} />
          </label>
          <label>
            Email
            <input type="email" required value={form.email} onChange={(event) => updateField('email', event.target.value)} />
          </label>
          <label>
            WhatsApp
            <input required value={form.whatsapp} onChange={(event) => updateField('whatsapp', event.target.value)} />
          </label>
          <label>
            Ciudad
            <input required value={form.city} onChange={(event) => updateField('city', event.target.value)} />
          </label>
          <label className="form-wide">
            Dirección
            <input required value={form.address} onChange={(event) => updateField('address', event.target.value)} />
          </label>
          <label>
            Método de entrega
            <select value={form.delivery} onChange={(event) => updateField('delivery', event.target.value)}>
              <option>Envío nacional</option>
              <option>Entrega local acordada</option>
              <option>Recoger en punto acordado</option>
            </select>
          </label>
          <label>
            Método de pago
            <select value={form.payment} onChange={(event) => updateField('payment', event.target.value)}>
              {paymentConfig.methods.map((method) => (
                <option value={method.id} key={method.id}>{method.name}</option>
              ))}
            </select>
          </label>
          <label className="form-wide">
            Notas del pedido
            <textarea rows="4" value={form.notes} onChange={(event) => updateField('notes', event.target.value)} />
          </label>
          <div className="payment-methods form-wide">
            {paymentConfig.methods.map((method) => (
              <button
                type="button"
                key={method.id}
                className={form.payment === method.id ? 'payment-chip payment-chip-active' : 'payment-chip'}
                onClick={() => updateField('payment', method.id)}
              >
                <strong>{method.name}</strong>
                <span>{method.description}</span>
              </button>
            ))}
          </div>
          <p className="integration-note form-wide">
            Pagos reales disponibles próximamente. Por ahora puedes confirmar pago manual por
            Nequi, Daviplata o transferencia.
          </p>
          <label className="policy-check form-wide">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(event) => setAccepted(event.target.checked)}
              required
            />
            Acepto políticas de compra y tiempos de elaboración.
          </label>
          <button className="button button-dark form-wide" type="submit" disabled={cart.length === 0 || !accepted}>
            Confirmar pedido
          </button>
        </form>
        <aside className="order-summary">
          <h3>Resumen del pedido</h3>
          {cart.length === 0 && <p>Agrega productos para habilitar el checkout.</p>}
          {cart.map((item) => (
            <p key={`${item.id}-${item.notes}`}>
              <span>{item.name} x{item.quantity}</span>
              <strong>{formatCOP(item.price * item.quantity)}</strong>
            </p>
          ))}
          <p><span>Subtotal</span><strong>{formatCOP(subtotal)}</strong></p>
          <p><span>Envío</span><strong>{formatCOP(shipping)}</strong></p>
          <p className="cart-total"><span>Total</span><strong>{formatCOP(total)}</strong></p>
          <button
            type="button"
            className="button button-light"
            disabled={cart.length === 0}
            onClick={() => openWhatsApp(cartMessage(cart, shipping, total))}
          >
            Confirmar por WhatsApp
          </button>
          {result && (
            <div className="checkout-result">
              <strong>Pedido recibido: {result.reference}</strong>
              <p>Te contactaremos por WhatsApp para validar pago, envío y tiempos de elaboración.</p>
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}
