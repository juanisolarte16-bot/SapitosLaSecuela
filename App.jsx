import { useEffect, useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import CategorySection from './components/CategorySection.jsx';
import ProductGrid from './components/ProductGrid.jsx';
import ProductModal from './components/ProductModal.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import CustomOrderForm from './components/CustomOrderForm.jsx';
import Checkout from './components/Checkout.jsx';
import Footer from './components/Footer.jsx';
import { products } from './data/products.js';
import { openWhatsApp } from './utils/whatsapp.js';

const storageKey = 'sapitos-cart';

function readCart() {
  try {
    return JSON.parse(localStorage.getItem(storageKey)) || [];
  } catch {
    return [];
  }
}

export default function App() {
  const [cart, setCart] = useState(readCart);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [globalSearch, setGlobalSearch] = useState('');

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(cart));
  }, [cart]);

  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart]
  );

  function addToCart(product, quantity = 1, notes = '') {
    if (product.status === 'agotado') return;
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id && item.notes === notes);
      if (existing) {
        return current.map((item) =>
          item.id === product.id && item.notes === notes
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [
        ...current,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          status: product.status,
          notes,
          quantity
        }
      ];
    });
    setIsCartOpen(true);
  }

  function updateQuantity(id, quantity, notes = '') {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id && item.notes === notes
            ? { ...item, quantity: Math.max(0, quantity) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeItem(id, notes = '') {
    setCart((current) => current.filter((item) => !(item.id === id && item.notes === notes)));
  }

  return (
    <>
      <Header
        cartCount={cartCount}
        onCartOpen={() => setIsCartOpen(true)}
        onSearch={setGlobalSearch}
      />
      <main>
        <Hero />
        <CategorySection />
        <section className="drop-band" id="drops">
          <div>
            <p className="eyebrow">Nuevo drop</p>
            <h2>Mini piezas para regalar, coleccionar o pedir a tu manera.</h2>
          </div>
          <a className="button button-dark" href="#catalogo">Ver novedades</a>
        </section>
        <ProductGrid
          products={products}
          globalSearch={globalSearch}
          onAddToCart={addToCart}
          onViewDetail={setSelectedProduct}
        />
        <CustomOrderForm />
        <Checkout cart={cart} />
        <section className="about-section" id="sobre-sapitos">
          <div className="about-copy">
            <p className="eyebrow">Sobre Sapitos</p>
            <h2>Hecho a mano para ideas con historia propia.</h2>
            <p>
              Sapitos la secuela transforma referencias, gustos raros, colores favoritos y
              pequeños chistes internos en accesorios artesanales. Cada pieza se piensa como un
              objeto emocional: algo que puedes usar, regalar o guardar porque se siente tuyo.
            </p>
          </div>
          <div className="process-card" aria-label="Espacio para foto del taller o proceso">
            <img src="/catalogo/taller-placeholder.svg" alt="Proceso artesanal Sapitos" />
            <span>Reemplaza esta imagen por foto de taller, manos o proceso.</span>
          </div>
        </section>
        <section className="faq-section" id="faq">
          <p className="eyebrow">FAQ</p>
          <h2>Preguntas frecuentes</h2>
          <div className="faq-grid">
            {[
              ['¿Cuánto tarda un pedido personalizado?', 'Entre 4 y 12 días hábiles según complejidad y agenda de producción.'],
              ['¿Qué materiales usan?', 'Porcelanicron, arcilla polimérica, acero inoxidable, acrílico, murano, resina y herrajes seleccionados.'],
              ['¿Hacen envíos?', 'Sí. El valor de envío se confirma según ciudad y método de entrega.'],
              ['¿Cómo se paga?', 'Puedes pagar por transferencia manual y el checkout queda preparado para Wompi, Mercado Pago, PSE y tarjeta.'],
              ['¿Puedo mandar referencias?', 'Sí. Puedes subir una imagen en el formulario y el mensaje de WhatsApp incluye la nota de referencia.'],
              ['¿Qué pasa si quiero un personaje específico?', 'Se revisa la referencia, tamaño, nivel de detalle y fecha para darte precio y tiempo real.']
            ].map(([question, answer]) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="policies-section" id="politicas">
          <p className="eyebrow">Políticas</p>
          <h2>Compra con claridad</h2>
          <div className="policy-grid">
            <article>
              <h3>Envíos</h3>
              <p>El valor final se confirma por ciudad. Los tiempos empiezan a contar cuando el pedido queda pago y aprobado.</p>
            </article>
            <article>
              <h3>Cambios y devoluciones</h3>
              <p>Las piezas personalizadas no tienen devolución salvo falla de fabricación. Las piezas disponibles se revisan caso a caso.</p>
            </article>
            <article>
              <h3>Términos</h3>
              <p>Los colores pueden variar un poco por pantalla y cada pieza handmade puede tener pequeñas diferencias naturales.</p>
            </article>
          </div>
        </section>
      </main>
      <Footer />
      <button
        className="floating-whatsapp"
        type="button"
        onClick={() => openWhatsApp('Hola Sapitos, quiero hacer un pedido')}
      >
        WhatsApp
      </button>
      <CartDrawer
        cart={cart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onQuantityChange={updateQuantity}
        onRemove={removeItem}
      />
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}
    </>
  );
}
