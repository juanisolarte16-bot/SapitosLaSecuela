export default function Footer() {
  return (
    <footer className="footer">
      <div>
        <a className="brand footer-brand" href="#inicio">
          <img className="brand-logo" src="/catalogo/logo-sapitos.jpg" alt="" />
          <span>Sapitos la secuela</span>
        </a>
        <p>Accesorios artesanales personalizados, regalos únicos y piezas hechas con cariño.</p>
      </div>
      <div>
        <h3>Redes</h3>
        <a href="https://instagram.com/sapitoslasecuela" target="_blank" rel="noreferrer">@sapitoslasecuela</a>
        <a href="https://www.tiktok.com/@sapitoslasecuela" target="_blank" rel="noreferrer">TikTok Sapitos</a>
        <a href="https://wa.me/573001234567" target="_blank" rel="noreferrer">WhatsApp pedidos</a>
        <a href="mailto:hola@sapitoslasecuela.com">hola@sapitoslasecuela.com</a>
      </div>
      <div>
        <h3>Ayuda</h3>
        <a href="#faq">Preguntas frecuentes</a>
        <a href="#politicas">Políticas de envío</a>
        <a href="#politicas">Cambios y devoluciones</a>
        <a href="#politicas">Términos y condiciones</a>
      </div>
    </footer>
  );
}
