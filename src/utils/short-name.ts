export function shortName(name: string): string {
  const names = name.trim().split(' ');
  if (names.length === 0) return '';

  const firstName = names[0];
  const lastName = names.length > 1 ? names[names.length - 1] : '';

  const shortFirstName = firstName.charAt(0).toUpperCase();
  const shortLastName = lastName ? lastName.charAt(0).toUpperCase() : '';

  return shortFirstName + shortLastName;
}
