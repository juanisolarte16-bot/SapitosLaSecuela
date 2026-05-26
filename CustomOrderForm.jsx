import { useState } from 'react';
import { openWhatsApp } from '../utils/whatsapp.js';

const initialForm = {
  name: '',
  whatsapp: '',
  productType: 'Aretes',
  idea: '',
  date: '',
  reference: ''
};

export default function CustomOrderForm() {
  const [form, setForm] = useState(initialForm);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function submitRequest(event) {
    event.preventDefault();
    const message = [
      'Hola Sapitos, quiero una solicitud personalizada:',
      `Nombre: ${form.name}`,
      `WhatsApp: ${form.whatsapp}`,
      `Tipo de producto: ${form.productType}`,
      `Idea: ${form.idea}`,
      `Fecha deseada: ${form.date || 'Sin fecha definida'}`,
      `Referencia: ${form.reference || 'Adjunto/comparto por este chat'}`
    ].join('\n');
    openWhatsApp(message);
  }

  return (
    <section className="custom-section" id="personalizados">
      <div className="custom-copy">
        <p className="eyebrow">Pedido personalizado</p>
        <h2>Cuéntanos la idea, aunque todavía esté medio loca.</h2>
        <p>
          El formulario arma automáticamente un mensaje para WhatsApp con todos tus datos. El
          campo de imagen queda como referencia de nombre de archivo para que luego puedas integrar
          subida real con backend o servicio de formularios.
        </p>
      </div>
      <form className="custom-form" onSubmit={submitRequest}>
        <label>
          Nombre
          <input required value={form.name} onChange={(event) => updateField('name', event.target.value)} />
        </label>
        <label>
          WhatsApp
          <input required value={form.whatsapp} onChange={(event) => updateField('whatsapp', event.target.value)} />
        </label>
        <label>
          Tipo de producto
          <select value={form.productType} onChange={(event) => updateField('productType', event.target.value)}>
            <option>Aretes</option>
            <option>Llavero</option>
            <option>Accesorio para mascota</option>
            <option>Personaje personalizado</option>
            <option>Regalo</option>
            <option>Otro</option>
          </select>
        </label>
        <label>
          Fecha deseada de entrega
          <input type="date" value={form.date} onChange={(event) => updateField('date', event.target.value)} />
        </label>
        <label className="form-wide">
          Descripción de la idea
          <textarea
            required
            rows="5"
            value={form.idea}
            onChange={(event) => updateField('idea', event.target.value)}
            placeholder="Personaje, colores, nombre, medidas, ocasión, presupuesto..."
          />
        </label>
        <label className="form-wide">
          Imagen de referencia
          <input
            type="file"
            accept="image/*"
            onChange={(event) => updateField('reference', event.target.files?.[0]?.name || '')}
          />
        </label>
        <button className="button button-dark form-wide" type="submit">Enviar solicitud por WhatsApp</button>
      </form>
    </section>
  );
}
