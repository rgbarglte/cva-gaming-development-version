const getMonthEnd = () => {
  const tmp = new Date();
  // Iniciar en este año, el siguiente mes, en el día 0 (así que así nos regresamos un día)
  return new Date(tmp.getFullYear(), tmp.getMonth() + 1, 0);
};
const getMonthStart = () => {
  const tmp = new Date();
  // Iniciar en este año, este mes, en el día 1
  return new Date(tmp.getFullYear(), tmp.getMonth(), 1);
};

const getCurrentMonthDate = () => {
  return [getMonthStart(), getMonthEnd()];
};
 

export default {
    getCurrentMonthDate : getCurrentMonthDate
}