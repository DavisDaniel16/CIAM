# Videos promocionales (formato vertical)

Coloca aquí los videos verticales de la academia (tipo Reels / TikTok / Shorts).
El sitio los busca con **nombres fijos**, así que basta con copiar los archivos
en esta carpeta:

| Archivo | Contenido sugerido | Miniatura |
|---|---|---|
| `promo-01.mp4` | Clases de piano | `promo-01.jpg` |
| `promo-02.mp4` | Ensayo de canto | `promo-02.jpg` |
| `promo-03.mp4` | Noche de adoración | `promo-03.jpg` |
| `promo-04.mp4` | Taller de batería | `promo-04.jpg` |

Hasta que un archivo exista, su tarjeta muestra un marcador
«Video próximamente» (nada se rompe).

## Especificaciones recomendadas

- **Formato:** MP4 (códec H.264 + audio AAC), extensión `.mp4`.
- **Relación de aspecto:** 9:16 vertical (ej. **1080 × 1920** px).
- **Duración:** entre 10 y 45 segundos (ideal para redes).
- **Peso:** menos de **8 MB** por video para que cargue rápido en móvil.
- **Miniatura:** JPG/PNG de 1080 × 1920, mismo nombre que el video (`.jpg`).
- **Audio:** si el video lleva música, usa audio libre de derechos.

> Los videos **no se reproducen solos**. Se muestra la miniatura y el usuario
> toca el botón ▶ para reproducirlo **con sonido**; al salir de pantalla se
> pausa automáticamente y solo uno puede sonar a la vez.

## Cómo agregar más videos (o cambiar títulos)

1. En `index.html`, dentro de `<div class="reels-rail">`, copia un bloque
   `<article class="reel">…</article>` completo.
2. Cambia el `src` y el `poster` del `<video>`.
3. Ajusta la etiqueta (`.reel-badge`), el título (`.reel-caption strong`)
   y la sede (`.reel-caption span`).
4. Opcional: usa `data-delay="5"` y `data-delay="6"` para la animación de entrada.
