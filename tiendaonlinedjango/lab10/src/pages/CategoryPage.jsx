import { useState, useEffect } from 'react'
import { editar, eliminar } from '../ImportImages'
import '../App.css'

export function CategoryPage() {

    const [categorias, setCategorias] = useState([]);
    const [recuperado, setRecuperado] = useState(false);
    const [nuevaCategoria, setNuevaCategoria] = useState({
      nombre: '',
    });
    const [modoEdicion, setModoEdicion] = useState(false);
    const [categoriaEditandoId, setCategoriaEditandoId] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:8000/api/categoria');
          const data = await response.json();
          setCategorias(data);
          setRecuperado(true);
        } catch (error) {
          console.error('Error al recuperar datos:', error);
        }
      };
  
      fetchData();
    }, []);
  
    const handleInputChange = (e) => {
        setNuevaCategoria({
        ...nuevaCategoria,
        [e.target.name]: e.target.value
      });
    };
  
    const handleCrearProducto = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/categoria/crear/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(nuevaCategoria)
        });
  
        if (response.ok) {
          const nuevoProductoCreado = await response.json();
          setCategorias([...categorias, nuevoProductoCreado]);
          setNuevaCategoria({
            nombre: ''
          });
        } else {
          console.error('Error al crear el producto:', response.statusText);
        }
      } catch (error) {
        console.error('Error al crear el producto:', error);
      }
    };
  
    const handleEliminarProducto = async (id) => {
      try {
        const response = await fetch(`http://localhost:8000/api/categoria/${id}/`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });
  
        if (response.ok) {
            setCategorias(categorias.filter((prod) => prod.id !== id));
        } else {
          console.error('Error al eliminar el producto:', response.statusText);
        }
      } catch (error) {
        console.error('Error al eliminar el producto:', error);
      }
    };
  
    const handleEditarProducto = (id) => {
      setModoEdicion(true);
      setCategoriaEditandoId(id);
      const productToEdit = categorias.find((prod) => prod.id === id);
      if (productToEdit) {
        setNuevaCategoria({ ...productToEdit });
      }
    };
  
    const handleCancelarEdicion = () => {
      setModoEdicion(false);
      setCategoriaEditandoId(null);
      setNuevaCategoria({
        nombre: ''
      });
    };
  
    const handleActualizarDesdeFormulario = () => {
      handleActualizarProducto(categoriaEditandoId, nuevaCategoria);
      handleCancelarEdicion();
    };
  
    const handleActualizarProducto = async (id, updatedProduct) => {
      try {
        const response = await fetch(`http://localhost:8000/api/categoria/${id}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedProduct)
        });
  
        if (response.ok) {
          const updatedProductData = await response.json();
          setCategorias(categorias.map((prod) => (prod.id === id ? updatedProductData : prod)));
        } else {
          console.error('Error al actualizar el producto:', response.statusText);
        }
      } catch (error) {
        console.error('Error al actualizar el producto:', error);
      }
    };
  
    const mostrarTabla = () => (
      <div className="container mt-4">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Operaciones</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((prod) => (
              <tr key={prod.id}>
                <td>{prod.id}</td>
                <td>{prod.nombre}</td>
                <td>
                  <img src={editar} alt="Editar" className="icono mx-2" onClick={() => handleEditarProducto(prod.id)} style={{ cursor: 'pointer' }}/>
                  <img src={eliminar} alt="Eliminar" className="icono mx-2" onClick={() => handleEliminarProducto(prod.id)} style={{ cursor: 'pointer' }}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
  
      </div>
    );
  

    return (
        <div>
            <h1 className="mt-3">Categorias</h1>

            <div>
                <h2 className="mt-3">{modoEdicion ? 'Editar Categoria' : 'Crear Categoria'}</h2>
                <form className="row g-3">
                    <div className="col-md-3">
                        <label htmlFor="nombre" className="form-label my-3">Nombre:</label>
                        <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={nuevaCategoria.nombre}
                        onChange={handleInputChange}
                        />
                    </div>
                    
                    <div className="col-12 mt-3">
                        <button type="button" className="btn btn-primary" onClick={ modoEdicion ? handleActualizarDesdeFormulario : handleCrearProducto}>
                        {modoEdicion ? 'Actualizar Categoria' : 'Crear Categoria'}
                        </button>
                        {modoEdicion && (
                        <button type="button" className="btn btn-secondary ms-2" onClick={handleCancelarEdicion}>
                            Cancelar Edición
                        </button> 
                        )}
                    </div>
                </form>
            </div>

        {recuperado ? mostrarTabla() : <div>Recuperando datos...</div>}
    </div>
    )
}