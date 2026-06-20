export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  category: "Consejos" | "Novedades" | "Tendencias";
  likes: number;
  comments: number;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "5 Consejos para mantener tu Balayage brillante",
    excerpt: "Descubre los secretos de nuestros expertos para que tu color luzca como el primer día durante meses.",
    content: "Mantener un balayage perfecto requiere cuidados específicos...",
    author: "Elena Baskuñana",
    date: "25 Abr 2026",
    image: "/assets/blog-1.png",
    category: "Consejos",
    likes: 124,
    comments: 18
  },
  {
    id: "2",
    title: "Nueva Colección: Esencia Mediterránea",
    excerpt: "Presentamos nuestra nueva propuesta inspirada en la luz y los colores de Cartagena.",
    content: "Nuestra última colección busca capturar la esencia de nuestra tierra...",
    author: "Marco Antonio",
    date: "20 Abr 2026",
    image: "/assets/blog-2.png",
    category: "Tendencias",
    likes: 89,
    comments: 5
  },
  {
    id: "3",
    title: "Por qué el Olaplex es el mejor aliado de tu cabello",
    excerpt: "Te explicamos la ciencia detrás del tratamiento que ha revolucionado la peluquería mundial.",
    content: "Olaplex no es solo un acondicionador, es un multiplicador de enlaces...",
    author: "Sofía Martín",
    date: "15 Abr 2026",
    image: "/assets/blog-3.png",
    category: "Consejos",
    likes: 215,
    comments: 32
  },
  {
    id: "4",
    title: "Secretos del Método Curly: Define tus rizos",
    excerpt: "Aprende a amar y potenciar tus rizos naturales con las técnicas más avanzadas del momento.",
    content: "El método curly ha cambiado la vida de miles de personas. En este artículo te enseñamos cómo aplicarlo correctamente en casa...",
    author: "Elena Baskuñana",
    date: "10 Abr 2026",
    image: "/assets/hair-5.png",
    category: "Consejos",
    likes: 156,
    comments: 24
  },
  {
    id: "5",
    title: "Tendencias 2026: El regreso del corte 'Shag'",
    excerpt: "Las capas vuelven con más fuerza que nunca. Descubre si este estilo es para ti.",
    content: "El corte Shag es versátil, moderno y lleno de personalidad. Analizamos por qué está siendo el más pedido esta temporada...",
    author: "Marco Antonio",
    date: "05 Abr 2026",
    image: "/assets/hair-2.jpg",
    category: "Tendencias",
    likes: 92,
    comments: 8
  },
  {
    id: "6",
    title: "Tratamiento de Ácido Hialurónico: Hidratación Extrema",
    excerpt: "No solo es para la piel. Te contamos cómo este ingrediente puede salvar tu melena del verano.",
    content: "La falta de hidratación es el enemigo número uno del cabello. Nuestro tratamiento con ácido hialurónico sella la humedad...",
    author: "Sofía Martín",
    date: "01 Abr 2026",
    image: "/assets/hair-3.png",
    category: "Novedades",
    likes: 178,
    comments: 15
  },
  {
    id: "7",
    title: "Coloración Orgánica: El poder de la naturaleza",
    excerpt: "Descubre nuestra gama de tintes sin amoníaco que respetan la salud de tu fibra capilar.",
    content: "La coloración orgánica no solo es tendencia, es una necesidad para cabellos sensibles...",
    author: "Elena Baskuñana",
    date: "28 Mar 2026",
    image: "/assets/hair-1.jpg",
    category: "Consejos",
    likes: 112,
    comments: 4
  },
  {
    id: "8",
    title: "Scalp Detox: La clave de un cabello sano",
    excerpt: "Por qué deberías empezar a cuidar tu cuero cabelludo tanto como cuidas tu piel.",
    content: "Un cabello bonito nace de un cuero cabelludo sano. Te explicamos nuestro ritual detox...",
    author: "Marco Antonio",
    date: "25 Mar 2026",
    image: "/assets/hair-4.png",
    category: "Novedades",
    likes: 67,
    comments: 12
  },
  {
    id: "9",
    title: "Especial Novias: Peinados que cuentan historias",
    excerpt: "Nuestra guía exclusiva para elegir el estilo perfecto en tu gran día.",
    content: "Ser novia es una experiencia única. En Baskuñana creamos recogidos que reflejan tu personalidad...",
    author: "Sofía Martín",
    date: "20 Mar 2026",
    image: "/assets/hair-6.png",
    category: "Tendencias",
    likes: 245,
    comments: 41
  }
];
