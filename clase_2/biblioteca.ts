// interface Libro {
//   lastName: string;
// }

// interface DetailsUser {
//   getUsers: () => void;
// }

// class User implements DetailsUser {}

// type Year = number | string;

// type Libro = {
//   id: number;
//   title: string;
//   author: string;
//   genre: string[];
//   year: Year
//   idTest?: number;
// };

// type Prueba = string

// type Otro = Prueba & Libro
interface Libro {
  id: number;
  title: string;
  author: string;
  genre: string[];
  year: number | string;
  idTest?: number;
  isAvaliable: boolean;
}

let libro1: Libro = {
  id: 1,
  author: "andres perez",
  genre: ["accion", "suspenso"],
  title: "dracula",
  year: "2000",
  isAvaliable: true,
};

const listaLibros: Libro[] = [
  {
    id: 1,
    author: "andres perez",
    genre: ["accion", "suspenso"],
    title: "dracula",
    year: "2000",
    isAvaliable: true,
  },
  {
    id: 2,
    author: "andres perez",
    genre: ["accion", "suspenso"],
    title: "dracula",
    year: "2000",
    isAvaliable: false,
  },
  {
    id: 3,
    author: "andres perez",
    genre: ["accion", "suspenso"],
    title: "dracula",
    year: "2000",
    isAvaliable: true,
  },
];

const validarLibrosDisponibles = (libros: Libro[]): Libro[] => {
  // es lo mismo o no estos dos?
  //   return libros.filter((f) => f.isAvaliable === true);
  const newData = libros.filter((f) => f.isAvaliable);
  return newData;

  // podemos usar un if dentro de un filter?
  //   libros.filter((f) => {
  //     if (f.isAvaliable) return f;
  //   });
};

// console.log("vamos a ver los libros", validarLibrosDisponibles(listaLibros));

// npx tsx biblioteca.ts

const buscarPorId = (libros: Libro[], id: number): Libro | [] => {
  // find => {libro}
  // filter, map => []

  const searchByid = libros.find((f) => f.id === id);
  if (!searchByid) return [];

  return searchByid;
};

console.log("vamos a buscar por id", buscarPorId(listaLibros, 4));

let myName: string | null = null;
