# Portfolio jurídico · Dra. Violeta de las Mercedes Anit

Sitio institucional desarrollado con Next.js, React y TypeScript. Incluye una portada con imagen original generada para el proyecto, áreas de práctica, presentación profesional, preguntas frecuentes y contacto.

## Ejecutar localmente

Requisitos: Node.js 20.9 o superior y npm.

```bash
npm install
npm run dev
```

Abrí `http://localhost:3000` en el navegador. Para generar la versión estática de producción (carpeta `out/`):

```bash
npm run build
```

## Antes de publicar

- La publicación gratuita usa GitHub Pages en `https://umaprojectejl.github.io/estudio-juridico-anit/`. En el plan gratuito, el repositorio debe ser público.
- Para publicar o actualizar el sitio, ejecutá `npm run deploy`. Git debe estar autenticado para enviar la rama `gh-pages`.
- El script define el prefijo de ruta y el dominio GitHub Pages para canonical, Open Graph, `robots.txt` y sitemap.
- Conectar un servicio de recepción para el formulario. Actualmente valida los campos en el navegador e incorpora un campo trampa antispam, pero no transmite ni guarda datos. El aviso lo explica y ofrece WhatsApp como alternativa.
- Revisar el texto institucional y las áreas de práctica con la profesional antes de publicar.
- Si se desea, añadir una fotografía profesional autorizada de la abogada y datos públicos adicionales que ella confirme. No se incluyeron domicilio, correo ni credenciales no proporcionadas.
- La foto de portada es una imagen original generada para este proyecto; el archivo optimizado está en `public/images/justicia-buenos-aires.jpg`.

## Contacto

El botón de WhatsApp abre `https://wa.me/5491152290878`. La zona declarada es CABA y Provincia de Buenos Aires.
