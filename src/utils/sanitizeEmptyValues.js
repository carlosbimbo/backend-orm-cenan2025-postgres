function sanitizeEmptyValues(data) {
  const cleanData = { ...data };

  Object.keys(cleanData).forEach((key) => {
    const value = cleanData[key];

    // Limpia valores vacíos, indefinidos, nulos o NaN
    if (
      value === "" ||                               // cadena vacía
      (typeof value === "string" && value.trim() === "") || // cadena con solo espacios
      value === undefined ||                        // sin definir
      value === null ||                             // nulo
      (typeof value === "number" && isNaN(value))   // NaN
    ) {
      cleanData[key] = null;
    }
  });

  return cleanData;
}

module.exports = { sanitizeEmptyValues };
