import { useMemo, useState } from 'react';
import { categories } from '../data/products.js';
import ProductCard from './ProductCard.jsx';

const categoryOptions = [{ id: 'todos', name: 'Todas' }, ...categories];

export default function ProductGrid({ products, globalSearch, onAddToCart, onViewDetail }) {
  const [category, setCategory] = useState('todos');
  const [availability, setAvailability] = useState('todos');
  const [price, setPrice] = useState(80000);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('recent');

  function clearFilters() {
    setCategory('todos');
    setAvailability('todos');
    setPrice(80000);
    setQuery('');
    setSort('recent');
  }

  const filteredProducts = useMemo(() => {
    const search = `${query} ${globalSearch}`.trim().toLowerCase();
    return products
      .filter((product) => category === 'todos' || product.category === category)
      .filter((product) => availability === 'todos' || product.status === availability)
      .filter((product) => product.price <= price)
      .filter((product) => !search || product.name.toLowerCase().includes(search))
      .sort((a, b) => {
        if (sort === 'low') return a.price - b.price;
        if (sort === 'high') return b.price - a.price;
        return Number(b.isNew) - Number(a.isNew);
      });
  }, [products, category, availability, price, query, globalSearch, sort]);

  return (
    <section className="section catalog-section" id="catalogo">
      <div className="section-heading catalog-heading">
        <div>
          <p className="eyebrow">Catálogo Sapitos</p>
          <h2>Piezas listas para comprar</h2>
        </div>
        <p>{filteredProducts.length} piezas encontradas</p>
      </div>
      <div className="catalog-layout">
        <aside className="filters" aria-label="Filtros del catálogo">
          <label>
            Buscar por nombre
            <input
              type="search"
              placeholder="Sapito, collar, lulo..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          <label>
            Categoría
            <select value={category} onChange={(event) => setCategory(event.target.value)}>
              {categoryOptions.map((option) => (
                <option value={option.id} key={option.id}>{option.name}</option>
              ))}
            </select>
          </label>
          <label>
            Disponibilidad
            <select value={availability} onChange={(event) => setAvailability(event.target.value)}>
              <option value="todos">Todas</option>
              <option value="disponible">Disponible</option>
              <option value="por encargo">Por encargo</option>
              <option value="agotado">Agotado</option>
            </select>
          </label>
          <label>
            Precio máximo
            <span className="price-readout">
              Hasta {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(price)}
            </span>
            <input
              type="range"
              min="5000"
              max="80000"
              step="1000"
              value={price}
              onChange={(event) => setPrice(Number(event.target.value))}
            />
          </label>
          <label>
            Ordenar por
            <select value={sort} onChange={(event) => setSort(event.target.value)}>
              <option value="recent">Más reciente</option>
              <option value="low">Menor precio</option>
              <option value="high">Mayor precio</option>
            </select>
          </label>
          <button className="button button-light" type="button" onClick={clearFilters}>
            Limpiar filtros
          </button>
        </aside>
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              product={product}
              key={product.id}
              onAddToCart={onAddToCart}
              onViewDetail={onViewDetail}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
