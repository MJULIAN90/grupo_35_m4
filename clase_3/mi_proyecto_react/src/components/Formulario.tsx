interface FormularioProps {
  children: React.ReactNode;
}

const Formulario = ({ children }: FormularioProps) => {
  return (
    <div
      style={{
        backgroundColor: "yellowgreen",
        marginTop: 20,
      }}
    >
      {children}
    </div>
  );
};

// const Formulario2 = ({ children }) => {
//   return { children };
// };

// Export default
export default Formulario;

// Exportacion nombradas
// export {
//     Formulario,
//     Formulario2
// }
