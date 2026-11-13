export interface UtmParams {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  referrer: string;
  landing_path: string;
}

declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown>>;
    __agAlvesGtmLoaded?: boolean;
    __agAlvesPageViewSent?: boolean;
  }
}

const UTM_STORAGE_KEY = 'ag_alves_attribution_v1';

export function getEmptyUtms(): UtmParams {
  return {
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_content: '',
    utm_term: '',
    referrer: '',
    landing_path: '',
  };
}

export function captureAndGetAttribution(): UtmParams {
  if (typeof window === 'undefined') {
    return getEmptyUtms();
  }

  let stored: Partial<UtmParams> = {};
  try {
    const raw = window.sessionStorage.getItem(UTM_STORAGE_KEY);
    if (raw) {
      stored = JSON.parse(raw) as Partial<UtmParams>;
    }
  } catch {
    stored = {};
  }

  const params = new URLSearchParams(window.location.search);
  const currentUtms: UtmParams = {
    utm_source: params.get('utm_source')?.trim() || stored.utm_source || '',
    utm_medium: params.get('utm_medium')?.trim() || stored.utm_medium || '',
    utm_campaign: params.get('utm_campaign')?.trim() || stored.utm_campaign || '',
    utm_content: params.get('utm_content')?.trim() || stored.utm_content || '',
    utm_term: params.get('utm_term')?.trim() || stored.utm_term || '',
    referrer:
      stored.referrer ||
      (document.referrer && !document.referrer.includes(window.location.host)
        ? document.referrer
        : 'Acesso direto'),
    landing_path: stored.landing_path || `${window.location.pathname}${window.location.search}`,
  };

  try {
    window.sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(currentUtms));
  } catch {
    // Ignore sessionStorage restrictions in private browsing
  }

  return currentUtms;
}

export function initTracking(): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];

  const gtmId = import.meta.env.VITE_GTM_ID?.trim();
  if (gtmId && /^GTM-[A-Z0-9]+$/i.test(gtmId) && !window.__agAlvesGtmLoaded) {
    window.__agAlvesGtmLoaded = true;
    window.dataLayer.push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js',
    });
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`;
    document.head.appendChild(script);
  }

  if (!window.__agAlvesPageViewSent) {
    window.__agAlvesPageViewSent = true;
    const attribution = captureAndGetAttribution();
    pushDataLayerEvent('page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname,
      ...attribution,
    });
  }
}

export function pushDataLayerEvent(
  eventName: 'page_view' | 'click_whatsapp' | 'form_start' | 'form_submit' | 'generate_lead',
  payload: Record<string, unknown> = {},
): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  const attribution = captureAndGetAttribution();
  window.dataLayer.push({
    event: eventName,
    event_timestamp: new Date().toISOString(),
    utm_source: attribution.utm_source || undefined,
    utm_medium: attribution.utm_medium || undefined,
    utm_campaign: attribution.utm_campaign || undefined,
    utm_content: attribution.utm_content || undefined,
    utm_term: attribution.utm_term || undefined,
    ...payload,
  });
}

export function trackClickWhatsapp(origin: string): void {
  pushDataLayerEvent('click_whatsapp', {
    whatsapp_origin: origin,
    contact_channel: 'whatsapp',
  });
}

export function trackFormStart(): void {
  pushDataLayerEvent('form_start', {
    form_id: 'diagnostico_estrategico',
    form_name: 'Diagnóstico Estratégico Gratuito',
  });
}

export function trackFormSubmit(challenge: string, adInvestment: string): void {
  pushDataLayerEvent('form_submit', {
    form_id: 'diagnostico_estrategico',
    form_name: 'Diagnóstico Estratégico Gratuito',
    principal_desafio: challenge,
    investe_anuncios: adInvestment,
  });
}

export function trackGenerateLead(challenge: string, adInvestment: string): void {
  pushDataLayerEvent('generate_lead', {
    form_id: 'diagnostico_estrategico',
    lead_channel: 'whatsapp',
    conversion_intent: 'diagnostic_request',
    confirmed_sale: false,
    principal_desafio: challenge,
    investe_anuncios: adInvestment,
  });
}
