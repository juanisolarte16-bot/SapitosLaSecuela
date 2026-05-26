export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <span className="sticker sticker-one">hecho a mano</span>
      <span className="sticker sticker-two">sapito mood</span>
      <div className="hero-copy">
        <p className="eyebrow">Hecho a mano en modo cute</p>
        <h1>Accesorios hechos a mano para ideas que solo tú entiendes.</h1>
        <p>
          Aretes, collares, llaveros y regalos con carita de “esto lo pensé para ti”. Piezas listas
          y pedidos personalizados con el estilo de Sapitos la secuela.
        </p>
        <div className="hero-actions">
          <a className="button button-dark" href="#catalogo">Ver catálogo</a>
          <a className="button button-light" href="#personalizados">Hacer pedido personalizado</a>
        </div>
      </div>
      <div className="hero-art">
        <img src="/catalogo/logo-sapitos.jpg" alt="Logo de Sapitos la secuela" />
        <div className="hero-collage" aria-label="Collage de productos Sapitos">
          <img src="/catalogo/aretes-orquideas-rosadas.svg" alt="Aretes orquídeas rosadas" />
          <img src="/catalogo/llavero-sapito-culoncito.svg" alt="Llavero sapito culoncito" />
          <img src="/catalogo/collar-usahana.svg" alt="Collar Usahana" />
        </div>
      </div>
    </section>
  );
}
