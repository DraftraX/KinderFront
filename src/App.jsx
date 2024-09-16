import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RutasProtegidas from "./utils/RutasProtegida";
//seguridad
import IniciarSesion from "./Modules/Seguridad/pages/Iniciar Sesion/IniciarSesion";
import PaginaPrincipal from "./Modules/Seguridad/pages/Pagina Principal";
import Registrarse from "./Modules/Seguridad/pages/Registrarse/Registrarse";
import Usuarios from "./Modules/Seguridad/pages/Usuarios/Usuarios";
import Perfiles from "./Modules/Seguridad/pages/Perfiles";
import Permisos from "./Modules/Seguridad/pages/Permisos";
import Modulos from "./Modules/Seguridad/pages/Modulos";
import CrearCaja from "./Modules/Seguridad/pages/CrearCaja";
//matricula
import FormularioAlumno from "./Modules/Matricula/pages/RegistrarAlumno/FormularioAlumno";
import FormularioApoderado from "./Modules/Matricula/pages/RegistrarApoderado/FormularioApoderado";
import ListaMatriculados from "./Modules/Matricula/pages/ListaMatriculados";
//planificacion
import Aulas from "./Modules/Planificacion/Aulas";
import Cursos from "./Modules/Planificacion/Cursos";
import Horarios from "./Modules/Planificacion/Horarios";
//registro
import Notas from "./Modules/Registros/Notas/Notas";
import Asistencias from "./Modules/Registros/Asistencias";
//caja
import Caja from "./Modules/Caja/pages/caja";
import ControlEstudiante from "./Modules/Caja/pages/controlEstudiante";
import Pagos from "./Modules/Caja/pages/pagos";
//reportes
import ReportesAsistencia from "./Modules/reportes/pages/ReportesAsistencia";
import ReportesNotas from "./Modules/reportes/pages/ReportesNotas";
import ReportesPagos from "./Modules/reportes/pages/ReportesPagos";

//Admin
import Sucursal from "./Modules/Aministrador/Sucursal";
import Establecimiento from "./Modules/Aministrador/Establecimiento";
//Documentacion
import Documentacion from "./Modules/Documentacion/Documentacion";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Registrarse />} />
        <Route path="/login" element={<IniciarSesion />} />
        <Route path="/documentacion" element={<Documentacion />} />

        {/* Todas las rutas protegidas */}
        <Route element={<RutasProtegidas />}>
          <Route path="/home" element={<PaginaPrincipal />} />
          {/* Pagina Admin */}
          <Route path="/establecimiento" element={<Establecimiento />} />
          <Route path="/sucursal" element={<Sucursal />} />
          {/* Rutas específicas de seguridad */}
          <Route path="/permisos" element={<Permisos />} />
          <Route path="/modulos" element={<Modulos />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/perfiles" element={<Perfiles />} />
          <Route path="/crearcaja" element={<CrearCaja />} />
          {/* Rutas específicas de matricula */}
          <Route path="/inscribiralumno" element={<FormularioAlumno />} />
          <Route path="/inscribirapoderado" element={<FormularioApoderado />} />
          <Route path="/listamatricula" element={<ListaMatriculados />} />
          {/* Rutas específicas de planificacion */}
          <Route path="/aulas" element={<Aulas />} />
          <Route path="/Cursos" element={<Cursos />} />
          <Route path="/Horarios" element={<Horarios />} />
          {/* Rutas específicas de registro */}
          <Route path="/notas" element={<Notas />} />
          <Route path="/asistencias" element={<Asistencias />} />
          {/* Rutas específicas de caja */}
          <Route path="/caja" element={<Caja />} />
          <Route path="/controlestudiantes" element={<ControlEstudiante />} />
          <Route path="/pagos" element={<Pagos />} />
          {/* Rutas específicas de reportes */}
          <Route path="/reportesasistencia" element={<ReportesAsistencia />} />
          <Route path="/reportesnotas" element={<ReportesNotas />} />
          <Route path="/reportespagos" element={<ReportesPagos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
