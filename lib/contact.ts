export const EMAIL = "anneryssuarez@gmail.com"
export const PHONE_DISPLAY = "+34 610 919 305"
export const PHONE_HREF = "tel:+34610919305"
export const WHATSAPP_NUMBER = "34610919305"

export const whatsappUrl = (text: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
