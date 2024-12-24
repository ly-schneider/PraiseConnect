export default function CalcBirthdate(date: Date | undefined) {
  // Return the birthdate in years
  const today = new Date();
  const birthdate = new Date(date || today);
  const age = today.getFullYear() - birthdate.getFullYear();

  return age;
}
