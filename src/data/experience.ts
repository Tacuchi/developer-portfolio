export interface Experience {
  period: string;
  employer: string;
  client?: string;
  role: string;
  description: string;
  tech: string[];
}

// Forma canónica de la trayectoria. Del más reciente al más antiguo.
export const experience: Experience[] = [
  {
    period: '11/2024 – actualidad',
    employer: 'QTC Servicios Financieros',
    role: 'Analista Programador Senior (Web, Backend)',
    description:
      'Desarrollo y mantenimiento de plataformas web y servicios backend para la evaluación y gestión de créditos. Integración de pagos en línea mediante APIs. Optimización de consultas y reportes en base de datos.',
    tech: ['Angular', 'Spring Boot', 'PostgreSQL'],
  },
  {
    period: '09/2023 – 08/2024',
    employer: 'ValorA (Oregon Foods)',
    role: 'Desarrollador Senior (Android, Backend)',
    description:
      'Mantenimiento y mejora de rendimiento de aplicaciones móviles que conectan líneas comerciales B2B y canales B2C. Integración con sistemas externos (ERP y bancos) mediante APIs. Optimización de bases de datos y procedimientos almacenados. Estimación de tiempos y recursos para nuevos proyectos. Mejora de usabilidad con Material Design 3.',
    tech: ['Android', 'Kotlin', 'Java', 'SQL Server', 'Material Design 3'],
  },
  {
    period: '04/2023 – 08/2023',
    employer: 'CSTI Corp',
    client: 'Oregon Foods',
    role: 'Desarrollador Móvil',
    description:
      'Desarrollo y mantenimiento de aplicaciones móviles Android para líneas comerciales B2B y canales B2C.',
    tech: ['Android', 'Java', 'Kotlin'],
  },
  {
    period: '03/2022 – 01/2023',
    employer: 'Inetum',
    client: 'RENIEC',
    role: 'Software Engineer (Android, Backend)',
    description:
      'Desarrollo y mantenimiento de aplicaciones Android con Java (MVP) y servicios web con Spring Boot. Análisis y modelado de bases de datos en MySQL. Seguimiento diario de los puntos clave del desarrollo backend. Adopción de Clean Code y patrones de diseño en el ciclo de desarrollo. Servicios para el envío de información a las bases de datos del cliente según los estándares acordados.',
    tech: ['Android', 'Java', 'Spring Boot', 'MySQL'],
  },
  {
    period: '02/2020 – 01/2022',
    employer: 'Experis Perú',
    client: 'Ferreyros',
    role: 'Desarrollador Android (Android, Flutter, Backend)',
    description:
      'Desarrollo de aplicaciones móviles con Flutter. Interfaces de usuario funcionales y cuidadas. Mantenimiento de servicios web en .NET Core y aplicaciones web en Angular. Trabajo conjunto con los equipos de diseño y backend, con Scrum.',
    tech: ['Flutter', 'Dart', '.NET Core', 'Angular'],
  },
  {
    period: '01/2019 – 12/2019',
    employer: 'Software Enterprise Services (SES)',
    client: 'Luz del Sur',
    role: 'Analista Programador (Backend, Web, Android)',
    description:
      'Continuidad de la modernización de aplicaciones de Luz del Sur desde una nueva contratista: aplicaciones web con .NET MVC, servicios WCF y aplicaciones Android.',
    tech: ['.NET', 'C#', 'WCF', 'Android', 'Java'],
  },
  {
    period: '02/2016 – 12/2018',
    employer: 'Stefanini IT Solutions',
    client: 'Luz del Sur',
    role: 'Analista Programador (Backend, Web, Android)',
    description:
      'Modernización y mejora de aplicaciones. Aplicaciones web y de escritorio con .NET, MVC (Razor), HTML5, CSS (Bootstrap) y JavaScript. Servicios WCF (Windows Communication Foundation) con C# para aplicaciones web y móviles. Aplicaciones Android (Java) con arquitecturas MVC y MVP, a partir de diseños en Figma y lineamientos de Material Design.',
    tech: ['.NET', 'C#', 'WCF', 'Android', 'Java', 'JavaScript'],
  },
  {
    period: '09/2015 – 11/2015',
    employer: 'B&C Soluciones',
    client: 'World Vision Perú',
    role: 'Analista Programador',
    description:
      'Actualización y optimización de sistemas web en ASP.NET WebForms (C# y VB). Migración de aplicaciones de WebForms en VB a MVC 4 con C#. Mantenimiento de la documentación técnica y de las bases de datos en SQL Server.',
    tech: ['ASP.NET', 'C#', 'VB.NET', 'SQL Server'],
  },
  {
    period: '09/2014 – 07/2015',
    employer: 'Sociedad Nacional del Taxista Peruano (SNTP)',
    role: 'Técnico Programador',
    description:
      'Primera versión de la aplicación móvil de la SNTP, con mapa interactivo, localización de puntos y autenticación. Sitio web para gestionar cobros, consultas y autenticación del taxista en ASP.NET WebForms. Página web para la ficha de inscripción.',
    tech: ['Android', 'ASP.NET WebForms'],
  },
];
