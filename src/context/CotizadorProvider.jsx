import { createContext, useState } from "react";
import {
  calcularMarca,
  calcularPlan,
  formatearDinero,
  obtenerDiferenciaYear,
} from "../helpers";

const CotizadorContext = createContext();

const CotizadorProvider = ({ children }) => {
  const [datos, setDatos] = useState({
    marca: "",
    año: "",
    plan: "",
  });

  const [error, setError] = useState("");
  const [resultado, setResultado] = useState(0);
  const [cargando, setCargando] = useState(false);

  const handleChangeDatos = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const cotizarSeguro = () => {
    // Una base
    let resultado = 2000;

    // Obtener diferencia de años
    const diferencia = obtenerDiferenciaYear(datos.año);

    // Hay q restar el 3% por cada año
    resultado -= (diferencia * 3 * resultado) / 100;

    // Europeo 30%

    resultado *= calcularMarca(datos.marca);

    // Americano 15%

    // Asiatico 5%

    resultado *= calcularPlan(datos.plan);

    //    resultado = resultado.toFixed(2)

    //    console.log(resultado)

    // Basico 20%
    // Completo 50%

    // Formatear Dinero
    resultado = formatearDinero(resultado);
    setCargando(true);

    setTimeout(() => {
      setResultado(resultado);
      setCargando(false)
    }, 2500);
  };

  return (
    <CotizadorContext.Provider
      value={{
        datos,
        handleChangeDatos,
        error,
        setError,
        cotizarSeguro,
        resultado,
        cargando
      }}
    >
      {children}
    </CotizadorContext.Provider>
  );
};

export { CotizadorProvider };

export default CotizadorContext;
