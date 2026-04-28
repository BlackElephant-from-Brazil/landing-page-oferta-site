export function buildWhatsAppLink(phoneNumber: string, message: string) {
  const normalized = phoneNumber.replace(/\D/g, "");
  return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`;
}
