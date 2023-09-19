import { Fragment } from "react";
import { MARCAS, PLANES, YEARS } from "../constants";
import useCotizador from "../hooks/useCotizador";
import Error from './Error'
const Formulario = () => {
  const { datos, handleChangeDatos, error, setError, cotizarSeguro } = useCotizador();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.values(datos).includes("")) {
      setError('Es necesario completar todos los campos')
      return
    }

    setError('')
    // TODO: cotizar
    cotizarSeguro()

  };

  return (
    <>
    {error && <Error />}
      <form onSubmit={handleSubmit}>
        <div className="my-5">
          <label
            htmlFor="marca"
            className="block mb-3 font-bold text-gray-400 uppercase"
          >
            Marca
          </label>
          <select
            name="marca"
            id="marca"
            className="w-full p-3 bg-white border border-gray-200 rounded-sm"
            onChange={(e) => handleChangeDatos(e)}
            value={datos.marca}
          >
            <option value="">-- Seleccionar --</option>
            {MARCAS.map((marca) => (
              <option value={marca.id} key={marca.id}>
                {marca.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="my-5">
          <label
            htmlFor="año"
            className="block mb-3 font-bold text-gray-400 uppercase"
          >
            Año
          </label>
          <select
            name="año"
            id="año"
            className="w-full p-3 bg-white border border-gray-200 rounded-sm"
            onChange={(e) => handleChangeDatos(e)}
            value={datos.año}
          >
            <option value="">-- Seleccionar --</option>
            {YEARS.map((year) => (
              <option value={year} key={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="my-5">
          <label
            htmlFor="plan"
            className="block mb-3 font-bold text-gray-400 uppercase"
          >
            Elige el plan
          </label>
          <div className="flex gap-3 items-center">
            {PLANES.map((plan) => (
              <Fragment key={plan.id}>
                <label htmlFor={plan.nombre}>{plan.nombre}</label>
                <input
                  type="radio"
                  id={plan.nombre}
                  name="plan"
                  value={plan.id}
                  onChange={(e) => handleChangeDatos(e)}
                />
              </Fragment>
            ))}
          </div>
        </div>

        <input
          type="submit"
          value="Cotizar"
          className="w-full bg-indigo-500 hover:bg-indigo-600 transition-colors text-white cursor-pointer p-3 uppercase font-bold"
        />
      </form>
    </>
  );
};

export default Formulario;
