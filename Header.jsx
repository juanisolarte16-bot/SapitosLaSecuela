import { useState } from 'react';

const navItems = [
  ['Inicio', '#inicio'],
  ['Catálogo', '#catalogo'],
  ['Personalizados', '#personalizados'],
  ['Mascotas', '#catalogo'],
  ['Regalos', '#catalogo'],
  ['Sobre Sapitos', '#sobre-sapitos'],
  ['FAQ', '#faq']
];

export default function Header({ cartCount, onCartOpen, onSearch }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="site-header">
      <a className="brand" href="#inicio" aria-label="Sapitos la secuela inicio">
        <img className="brand-logo" src="/catalogo/logo-sapitos.jpg" alt="" />
        <span>Sapitos la secuela</span>
      </a>
      <nav className={menuOpen ? 'nav nav-open' : 'nav'} aria-label="Navegación principal">
        {navItems.map(([label, href]) => (
          <a key={label} href={href} onClick={() => setMenuOpen(false)}>
            {label}
          </a>
        ))}
      </nav>
      <div className="header-actions">
        <div className={searchOpen ? 'search-box search-open' : 'search-box'}>
          <button
            type="button"
            className="icon-button"
            aria-label="Abrir búsqueda"
            onClick={() => setSearchOpen((value) => !value)}
          >
            <span aria-hidden="true">⌕</span>
          </button>
          <input
            aria-label="Buscar producto"
            placeholder="Buscar..."
            onChange={(event) => onSearch(event.target.value)}
          />
        </div>
        <button className="cart-button" type="button" onClick={onCartOpen} aria-label="Abrir carrito">
          <span aria-hidden="true">Carrito</span>
          <strong>{cartCount}</strong>
        </button>
        <button
          className="hamburger"
          type="button"
          aria-label="Abrir menú"
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
