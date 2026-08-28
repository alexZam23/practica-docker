async function cargarDashboard() {
  const res = await fetch('/api/dashboard');
  const data = await res.json();

  document.getElementById('cards').innerHTML = `
    <div class="card"><div class="value">${data.total_productos}</div><div class="label">Total productos</div></div>
    <div class="card"><div class="value">$${data.precio_promedio}</div><div class="label">Precio promedio</div></div>
    <div class="card"><div class="value">${data.stock_total}</div><div class="label">Stock total</div></div>
    <div class="card"><div class="value">${data.producto_mas_economico.nombre}</div><div class="label">Más económico ($${data.producto_mas_economico.precio})</div></div>
    <div class="card"><div class="value">${data.producto_mas_costoso.nombre}</div><div class="label">Más costoso ($${data.producto_mas_costoso.precio})</div></div>
  `;

  document.getElementById('top3-economicos').innerHTML = data.top3_economicos
    .map(p => `<li>${p.nombre} — $${p.precio}</li>`).join('');

  document.getElementById('top5-vendidos').innerHTML = data.top5_mas_vendidos
    .map(p => `<li>${p.nombre} — ${p.unidades_vendidas} unidades</li>`).join('');
}

async function cargarCatalogo() {
  const res = await fetch('/api/products');
  const productos = await res.json();

  document.getElementById('tabla-productos').innerHTML = productos.map(p => `
    <tr>
      <td>${p.id}</td>
      <td>${p.nombre}</td>
      <td>${p.categoria}</td>
      <td>$${p.precio}</td>
      <td>${p.stock}</td>
      <td>${p.unidades_vendidas}</td>
    </tr>
  `).join('');
}

cargarDashboard();
cargarCatalogo();
