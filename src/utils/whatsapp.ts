import { UtmParams } from './tracking';

export const WHATSAPP_NUMBER = '5527988524978';
export const WHATSAPP_DISPLAY = '+55 27 98852-4978';
export const INSTAGRAM_URL = 'https://www.instagram.com/edmilson_anuncios/';

export interface DiagnosticFormData {
  fullName: string;
  companyName: string;
  whatsapp: string;
  cityState: string;
  segment: string;
  mainChallenge: string;
  adStatus: string;
  additionalInfo: string;
  consent: boolean;
}

export function formatBrazilianPhone(input: string): string {
  const digits = input.replace(/\D/g, '').slice(0, 11);
  if (digits.length === 0) return '';
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function isValidBrazilianPhone(input: string): boolean {
  const digits = input.replace(/\D/g, '');
  return digits.length === 10 || digits.length === 11;
}

export function getDirectWhatsappUrl(customMessage?: string): string {
  const defaultMessage =
    customMessage ||
    'Olá! Vim pelo site da AG Alves – Consultoria e Marketing e gostaria de falar com um especialista sobre estratégia digital para minha empresa.';
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(defaultMessage)}`;
}

export function buildDiagnosticMessage(
  data: DiagnosticFormData,
  attribution: UtmParams,
): string {
  const lines = [
    '*Solicitação de Diagnóstico Estratégico Gratuito — AG Alves*',
    '',
    `*Nome completo:* ${data.fullName.trim()}`,
    `*Empresa:* ${data.companyName.trim()}`,
    `*WhatsApp:* ${data.whatsapp.trim()}`,
    `*Cidade / Estado:* ${data.cityState.trim()}`,
    `*Segmento de atuação:* ${data.segment.trim()}`,
    `*Principal desafio:* ${data.mainChallenge}`,
    `*Já investe em anúncios:* ${data.adStatus}`,
  ];

  if (data.additionalInfo.trim()) {
    lines.push(`*Informações adicionais:* ${data.additionalInfo.trim()}`);
  }

  const utmDetails: string[] = [];
  if (attribution.utm_source) utmDetails.push(`Fonte: ${attribution.utm_source}`);
  if (attribution.utm_medium) utmDetails.push(`Mídia: ${attribution.utm_medium}`);
  if (attribution.utm_campaign) utmDetails.push(`Campanha: ${attribution.utm_campaign}`);
  if (attribution.utm_content) utmDetails.push(`Conteúdo: ${attribution.utm_content}`);
  if (attribution.utm_term) utmDetails.push(`Termo: ${attribution.utm_term}`);

  if (utmDetails.length > 0 || attribution.referrer) {
    lines.push('');
    lines.push('---');
    lines.push(`*Origem da visita:* ${attribution.referrer || 'Acesso direto'}`);
    if (utmDetails.length > 0) {
      lines.push(`*Parâmetros UTM:* ${utmDetails.join(' | ')}`);
    }
  }

  return lines.join('\n');
}

export function buildDiagnosticWhatsappUrl(
  data: DiagnosticFormData,
  attribution: UtmParams,
): string {
  const message = buildDiagnosticMessage(data, attribution);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
