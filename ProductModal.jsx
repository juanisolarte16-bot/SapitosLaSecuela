import { useEffect, useState } from 'react';
import { formatCOP } from '../data/products.js';
import { openWhatsApp, productMessage } from '../utils/whatsapp.js';

export default function ProductModal({ product, onClose, onAddToCart }) {
  const [activeImage, setActiveImage] = useState(product.gallery[0]);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    setActiveImage(product.gallery[0]);
    setNotes('');
  }, [product]);

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="product-title">
      <div className="product-modal">
        <button className="close-button" type="button" onClick={onClose} aria-label="Cerrar detalle">
          ×
        </button>
        <div className="modal-gallery">
          <img className="modal-main-image" src={activeImage} alt={product.name} />
          <div className="thumb-row">
            {product.gallery.map((image) => (
              <button type="button" key={image} onClick={() => setActiveImage(image)}>
                <img src={image} alt="" />
              </button>
            ))}
          </div>
        </div>
        <div className="modal-copy">
          <span className={`status status-${product.status.replace(' ', '-')}`}>{product.status}</span>
          <h2 id="product-title">{product.name}</h2>
          <strong>{formatCOP(product.price)}</strong>
          <p>{product.description}</p>
          <dl>
            <div>
              <dt>Materiales</dt>
              <dd>{product.materials}</dd>
            </div>
            <div>
              <dt>Tiempo de elaboración</dt>
              <dd>{product.productionTime}</dd>
            </div>
          </dl>
          <div className="custom-options">
            <h3>Opciones de personalización</h3>
            {product.customization.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <label>
            Notas para tu pedido
            <textarea
              rows="4"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Color, nombre, referencia, fecha especial..."
            />
          </label>
          <div className="modal-actions">
            <button
              type="button"
              className="button button-dark"
              onClick={() =>
                product.status === 'agotado'
                  ? openWhatsApp(`Hola Sapitos, me avisan cuando vuelva ${product.name} o si pueden hacer algo parecido.`)
                  : onAddToCart(product, 1, notes)
              }
            >
              {product.status === 'agotado' ? 'Avísame cuando vuelva' : 'Agregar al carrito'}
            </button>
            <button
              type="button"
              className="button button-light"
              onClick={() => openWhatsApp(productMessage(product, notes))}
            >
              Pedir por WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
