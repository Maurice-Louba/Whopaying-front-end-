const formatDate = (isoDate: string | undefined) => {
  if (!isoDate) return "Date inconnue";
  const dateObj = new Date(isoDate);
  const pad = (n: number) => n.toString().padStart(2, "0");
  if (isNaN(dateObj.getTime())) return "Date invalide";
  return `${dateObj.getFullYear()}-${pad(dateObj.getMonth() + 1)}-${pad(dateObj.getDate())} ` + 
         `at ${pad(dateObj.getHours())}:${pad(dateObj.getMinutes())}`;
};

const DateDisplay = ({ isoDate }: {  isoDate: string | undefined }) => {
  return <span>{formatDate(isoDate)}</span>;
};
 
export default DateDisplay;