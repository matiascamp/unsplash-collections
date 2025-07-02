# Unsplash Collection

Una aplicación web moderna para crear y gestionar colecciones de imágenes de Unsplash. Desarrollada con Next.js 14, TypeScript y Tailwind CSS.

## 🚀 Características

- **Búsqueda de imágenes**: Integración con la API de Unsplash para buscar imágenes por palabras clave
- **Gestión de colecciones**: Crear, editar y eliminar colecciones personalizadas
- **Interfaz moderna**: Diseño responsive con Tailwind CSS
- **Optimización de imágenes**: Uso de Next.js Image para optimización automática
- **Estado global**: Gestión de estado con Zustand
- **Base de datos**: Almacenamiento persistente con MongoDB
- **Testing**: Cobertura de tests con Vitest y React Testing Library

## 🛠️ Tecnologías

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Estado**: Zustand
- **Base de datos**: MongoDB con Mongoose
- **Testing**: Vitest, React Testing Library
- **API**: Unsplash API
- **Deployment**: Vercel (recomendado)

## 📋 Prerrequisitos

- Node.js 18+ 
- npm, yarn, pnpm o bun
- MongoDB (local o Atlas)
- Cuenta de desarrollador en Unsplash

## 🔧 Instalación

1. **Clona el repositorio**
```bash
git clone <repository-url>
cd unsplash-collection
```

2. **Instala las dependencias**
```bash
npm install
# o
yarn install
# o
pnpm install
```

3. **Configura las variables de entorno**
Crea un archivo `.env.local` en la raíz del proyecto:

```env
# Unsplash API
UNSPLASH_ACCESS_KEY=tu_access_key_de_unsplash

# MongoDB
MONGODB_URI=tu_uri_de_mongodb

# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. **Configura la base de datos**
- Asegúrate de que MongoDB esté corriendo
- Las colecciones se crearán automáticamente al usar la aplicación

5. **Inicia el servidor de desarrollo**
```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🧪 Testing

La aplicación incluye una suite completa de tests:

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests en modo watch
npm run test:watch

# Ejecutar tests con coverage
npm run test:coverage
```

### Componentes con tests
- ✅ Modal
- ✅ AddToCollections  
- ✅ SearchInput
- ✅ CollectionGrid
- ✅ DynamicImage

### Funciones utilitarias con tests
- ✅ ImageIncluded
- ✅ SearchImages (getAllImages)

## 📁 Estructura del Proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── api/               # API Routes
│   │   ├── collections/   # Endpoints de colecciones
│   │   └── images/        # Endpoints de imágenes
│   ├── collections/       # Páginas de colecciones
│   ├── photos/           # Páginas de fotos
│   └── search/           # Páginas de búsqueda
├── components/            # Componentes React
│   ├── modal.tsx
│   ├── addToCollections.tsx
│   ├── searchInput.tsx
│   ├── collectionGrid.tsx
│   ├── dynamicImage.tsx
│   └── ...
├── store/                 # Estado global (Zustand)
│   ├── store.ts
│   ├── hooks.ts
│   ├── selectors.ts
│   └── slices/
├── utils/                 # Funciones utilitarias
│   ├── getAllImages.ts
│   ├── imageIncluded.ts
│   ├── mongoose.ts
│   └── ...
├── interfaces/            # Tipos TypeScript
├── models/               # Modelos de MongoDB
└── schemas/              # Esquemas de validación
```

## 🎯 Funcionalidades Principales

### Búsqueda de Imágenes
- Búsqueda por palabras clave
- Paginación automática
- Filtros y ordenamiento
- Vista previa de imágenes

### Gestión de Colecciones
- Crear nuevas colecciones
- Agregar imágenes a colecciones existentes
- Eliminar imágenes de colecciones
- Ver estadísticas de colecciones

### Interfaz de Usuario
- Diseño responsive
- Modales interactivos
- Estados de carga
- Navegación intuitiva

## 🔌 API Endpoints

### Colecciones
- `GET /api/collections` - Obtener todas las colecciones
- `POST /api/collections` - Crear nueva colección
- `GET /api/collections/[id]` - Obtener colección específica
- `DELETE /api/collections/[id]` - Eliminar colección

### Imágenes en Colecciones
- `POST /api/collections/[id]/images` - Agregar imagen a colección
- `DELETE /api/collections/[id]/images/[imageId]` - Eliminar imagen de colección

### Búsqueda
- `GET /api/images` - Buscar imágenes en Unsplash

