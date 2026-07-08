# C.I.A.M. Adora-Sión - Academia de Música con Propósito

Este es el repositorio oficial del sitio web de **C.I.A.M. Adora-Sión**, una academia de música enfocada en la excelencia musical y el fundamento espiritual, con sedes en Puyo, Cajabamba y Guaranda, Ecuador.

## 🚀 Características Principales

*   **Diseño Moderno y Responsivo**: Optimizado para dispositivos móviles, tablets y computadoras utilizando **Bootstrap 5.3**.
*   **Hero Section Interactiva**: Incluye un video de fondo con controles dinámicos de audio (botón de activación de sonido con feedback visual).
*   **Efectos Visuales Avanzados**:
    *   Efecto Parallax suave en la sección principal.
    *   Animaciones de entrada al hacer scroll (Intersection Observer).
    *   Navegación dinámica que se adapta al desplazamiento.
*   **Galería con Lightbox**: Visualización de imágenes de programas y sedes en pantalla completa.
*   **Formularios de Inscripción Inteligentes**:
    *   Validación en tiempo real (nombres, teléfonos de 10 dígitos).
    *   Envío mediante AJAX para una experiencia sin recargas de página.
    *   Integración con Formspree para la gestión de mensajes.
*   **Botón Flotante de WhatsApp**: Acceso directo y rápido para soporte al cliente.

## 🛠️ Tecnologías Utilizadas

*   **HTML5**: Estructura semántica y optimización SEO.
*   **CSS3 (Vanilla)**: Estilos personalizados, variables de color y animaciones.
*   **JavaScript (ES6+)**: Lógica interactiva, control de video y validaciones de formulario.
*   **Bootstrap 5.3.3**: Framework para el diseño responsivo y componentes.
*   **Bootstrap Icons**: Biblioteca de iconos vectoriales.
*   **Google Fonts**: Tipografías 'Alfa Slab One' y 'Roboto'.

## 📂 Estructura del Proyecto

```text
├── carrusel/          # Imágenes para sliders y banners
├── instrumentos/      # Iconografía y fotos de instrumentos
├── logo/              # Identidad visual de la academia
├── sedesimg/          # Fotografías de las instalaciones
├── videos/            # Video de fondo para el Hero
├── index.html         # Página de inicio principal
├── inscripciones.html # Formulario de registro
├── programas.html     # Detalle de cursos ofrecidos
├── sedes.html         # Ubicaciones y mapas
├── sobre.html         # Historia y visión de la academia
├── style.css          # Hoja de estilos principal
└── script.js         # Lógica de interactividad y validaciones
```

## 🔧 Instalación y Uso Local

1.  Clona este repositorio:
    ```bash
    git clone https://github.com/tu-usuario/nombre-del-repo.git
    ```
2.  Abre el archivo `index.html` en tu navegador preferido. No requiere de un servidor backend complejo ya que utiliza servicios externos para los formularios.

## 📝 Notas de Despliegue

*   **Caché**: Al realizar cambios en `script.js` o `style.css`, asegúrate de forzar la recarga del caché (`Ctrl + F5`) en el navegador para ver los cambios reflejados.
*   **Autoplay de Video**: Por políticas de seguridad de los navegadores modernos, el video siempre inicia silenciado. El usuario debe activar el sonido manualmente mediante el botón dorado en la sección de inicio.

## ⚖️ Licencia

Este proyecto es de propiedad privada para **C.I.A.M. Adora-Sión**. Todos los derechos reservados.

---
*Formando músicos con propósito en Ecuador.*
