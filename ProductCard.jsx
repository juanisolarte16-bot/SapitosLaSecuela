import { formatCOP } from '../data/products.js';
import { openWhatsApp } from '../utils/whatsapp.js';

export default function ProductCard({ product, onAddToCart, onViewDetail }) {
  const isSoldOut = product.status === 'agotado';

  return (
    <article className={isSoldOut ? 'product-card product-card-disabled' : 'product-card'}>
      {isSoldOut && <span className="soldout-ribbon">Agotado</span>}
      <button className="image-button" type="button" onClick={() => onViewDetail(product)}>
        <img src={product.image} alt={product.name} />
      </button>
      <div className="product-info">
        <div className="product-meta">
          <span>{product.type}</span>
          <span className={`status status-${product.status.replace(' ', '-')}`}>
            {product.status}
          </span>
        </div>
        <h3>{product.name}</h3>
        <strong>{formatCOP(product.price)}</strong>
      </div>
      <div className="product-actions">
        <button type="button" className="button button-dark" disabled={isSoldOut} onClick={() => onAddToCart(product)}>
          {isSoldOut ? 'Agotado' : 'Agregar al carrito'}
        </button>
        {isSoldOut && (
          <button
            type="button"
            className="button button-light"
            onClick={() => openWhatsApp(`Hola Sapitos, me avisan cuando vuelva ${product.name} o si pueden hacer algo parecido.`)}
          >
            Avísame
          </button>
        )}
        <button type="button" className="button button-light" onClick={() => onViewDetail(product)}>
          Ver detalle
        </button>
      </div>
    </article>
  );
}
