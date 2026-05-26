import { useMemo, useState } from 'react';
import { formatCOP } from '../data/products.js';
import { cartMessage, openWhatsApp } from '../utils/whatsapp.js';

export default function CartDrawer({ cart, isOpen, onClose, onQuantityChange, onRemove }) {
  const [shipping, setShipping] = useState(12000);
  const subtotal = useMemo(
    () => cart.reduce((total, item) => total + item.price * item.quantity, 0),
    [cart]
  );
  const total = subtotal + Number(shipping || 0);

  return (
    <aside className={isOpen ? 'cart-drawer cart-open' : 'cart-drawer'} aria-hidden={!isOpen}>
      <div className="cart-header">
        <div>
          <p className="eyebrow">Tu pedido</p>
          <h2>Carrito</h2>
        </div>
        <button type="button" className="close-button" onClick={onClose} aria-label="Cerrar carrito">×</button>
      </div>
      <div className="cart-items">
        {cart.length === 0 && <p className="empty-cart">Aún no hay productos en el carrito.</p>}
        {cart.map((item) => (
          <article className="cart-item" key={`${item.id}-${item.notes}`}>
            <img src={item.image} alt={item.name} />
            <div>
              <h3>{item.name}</h3>
              {item.notes && <p>Notas: {item.notes}</p>}
              <span>{formatCOP(item.price)}</span>
              <div className="quantity-control">
                <button type="button" onClick={() => onQuantityChange(item.id, item.quantity - 1, item.notes)}>-</button>
                <strong>{item.quantity}</strong>
                <button type="button" onClick={() => onQuantityChange(item.id, item.quantity + 1, item.notes)}>+</button>
              </div>
            </div>
            <button type="button" className="remove-button" onClick={() => onRemove(item.id, item.notes)}>
              Eliminar
            </button>
          </article>
        ))}
      </div>
      <div className="cart-summary">
        <label>
          Costo de envío editable
          <input
            type="number"
            min="0"
            value={shipping}
            onChange={(event) => setShipping(Number(event.target.value))}
          />
        </label>
        <p><span>Subtotal</span><strong>{formatCOP(subtotal)}</strong></p>
        <p><span>Envío</span><strong>{formatCOP(Number(shipping || 0))}</strong></p>
        <p className="cart-total"><span>Total</span><strong>{formatCOP(total)}</strong></p>
        <a className="button button-dark" href="#checkout" onClick={onClose}>Ir a pagar</a>
        <button
          type="button"
          className="button button-light"
          disabled={cart.length === 0}
          onClick={() => openWhatsApp(cartMessage(cart, Number(shipping || 0), total))}
        >
          Comprar por WhatsApp
        </button>
      </div>
    </aside>
  );
}
