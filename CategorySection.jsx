import { categories } from '../data/products.js';

export default function CategorySection() {
  return (
    <section className="section" id="categorias">
      <div className="section-heading">
        <p className="eyebrow">Elige tu mood Sapitos</p>
        <h2>Encuentra tu pieza favorita</h2>
      </div>
      <div className="category-grid">
        {categories.map((category) => (
          <article className="category-card" key={category.id}>
            <img src={category.image} alt={category.name} />
            <div>
              <h3>{category.name}</h3>
              <p>{category.description}</p>
              <a className="mini-link" href={`#catalogo?categoria=${category.id}`}>
                Ver piezas
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
