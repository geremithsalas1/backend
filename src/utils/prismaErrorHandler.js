

export function handlePrismaError(error, res) {
  if (error && typeof error.code === 'string') {
    switch (error.code) {
      case 'P2000':
        // Valor demasiado largo para el tipo de columna
        return res.status(400).json({ message: 'El valor es demasiado largo para este campo.' });
      case 'P2001':
        // Registro no encontrado
        return res.status(404).json({ message: 'No se encontró el registro solicitado.' });
      case 'P2002':
        // Violación de restricción única
        return res.status(409).json({
          message: `Ya existe un registro con ese valor único (${error.meta?.target})`,
        });
      case 'P2003':
        // Violación de clave foránea
        return res.status(400).json({ message: 'Referencia inválida a otra tabla (clave foránea).' });
      case 'P2004':
        // Violación de restricción
        return res.status(400).json({ message: 'Violación de restricción en la base de datos.' });
      case 'P2005':
        // Valor incorrecto para columna
        return res.status(400).json({ message: 'Valor incorrecto para el tipo de columna.' });
      case 'P2006':
        // Valor incorrecto para el tipo de entrada
        return res.status(400).json({ message: 'Valor incorrecto para el tipo de entrada.' });
      case 'P2007':
        // Error de validación de datos
        return res.status(400).json({ message: 'Error de validación de datos.' });
      case 'P2008':
        // Error de lectura de consulta
        return res.status(400).json({ message: 'Error de lectura de consulta.' });
      case 'P2009':
        // Error de validación de entrada
        return res.status(400).json({ message: 'Error de validación de entrada.' });
      case 'P2010':
        // Error de consulta bruta
        return res.status(400).json({ message: 'Error de consulta bruta.' });
      case 'P2011':
        // Violación de restricción nula
        return res.status(400).json({ message: 'No se permite valor nulo en este campo.' });
      case 'P2012':
        // Campo requerido faltante
        return res.status(400).json({ message: 'Falta un campo requerido.' });
      case 'P2013':
        // Argumento faltante
        return res.status(400).json({ message: 'Falta un argumento requerido.' });
      case 'P2014':
        // Violación de relación
        return res.status(400).json({ message: 'Violación de relación en la base de datos.' });
      case 'P2015':
        // Registro relacionado no encontrado
        return res.status(404).json({ message: 'No se encontró el registro relacionado.' });
      case 'P2016':
        // Consulta inválida
        return res.status(400).json({ message: 'Consulta inválida.' });
      case 'P2017':
        // Relación no encontrada
        return res.status(404).json({ message: 'Relación no encontrada.' });
      case 'P2018':
        // El campo no existe
        return res.status(400).json({ message: 'El campo especificado no existe.' });
      case 'P2019':
        // Entrada inválida
        return res.status(400).json({ message: 'Entrada inválida.' });
      case 'P2020':
        // Valor fuera de rango
        return res.status(400).json({ message: 'Valor fuera de rango para el campo.' });
      case 'P2021':
        // Tabla no encontrada
        return res.status(400).json({ message: 'La tabla especificada no existe.' });
      case 'P2022':
        // Columna no encontrada
        return res.status(400).json({ message: 'La columna especificada no existe.' });
      case 'P2023':
        // Acción no permitida
        return res.status(400).json({ message: 'Acción no permitida en la base de datos.' });
      case 'P2024':
        // Límite de conexiones alcanzado
        return res.status(503).json({ message: 'Límite de conexiones a la base de datos alcanzado.' });
      case 'P2025':
        // No se encontró el registro para actualizar o eliminar
        return res.status(404).json({ message: 'No se encontró el registro para actualizar o eliminar.' });
      case 'P2026':
        // Error de inicialización de base de datos
        return res.status(500).json({ message: 'Error de inicialización de la base de datos.' });
      case 'P2027':
        // Error de transacción
        return res.status(500).json({ message: 'Error de transacción en la base de datos.' });
      case 'P2028':
        // Error de timeout
        return res.status(504).json({ message: 'La operación tardó demasiado y fue cancelada (timeout).' });
      case 'P2030':
        // Error de base de datos
        return res.status(500).json({ message: 'Error general de la base de datos.' });
      case 'P2033':
        // Error de parsing de datos
        return res.status(400).json({ message: 'Error al interpretar los datos.' });
      default:
        return res.status(400).json({ message: `Error de base de datos (${error.code})`, detail: error.message });
    }
  }
  // Otros errores no controlados
  return res.status(500).json({ message: 'Error interno del servidor', error: error.message });
}