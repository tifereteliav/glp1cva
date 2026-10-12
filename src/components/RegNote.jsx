import React from 'react';

// Small regulatory footnote: disclaimers (English, LTR) and references.
export default function RegNote({ notes = [], refs = [], style = {} }) {
  if (!notes.length && !refs.length) return null;
  return (
    <div style={{
      marginTop: '14px',
      padding: '10px 14px',
      background: '#f8fafc',
      border: '1px solid #e2e8f0',
      borderRadius: '10px',
      fontSize: '0.74rem',
      color: '#64748b',
      lineHeight: 1.5,
      ...style
    }}>
      {notes.map((n, i) => (
        <div key={`n${i}`} dir="ltr" style={{ textAlign: 'left', marginBottom: '4px' }}>{n}</div>
      ))}
      {refs.length > 0 && (
        <div dir="ltr" style={{ textAlign: 'left' }}>
          <strong>References: </strong>
          {refs.map((r, i) => (
            <span key={`r${i}`}>{i + 1}. {r}{i < refs.length - 1 ? ' ' : ''}</span>
          ))}
        </div>
      )}
    </div>
  );
}

export const AI_IMAGE_NOTE = 'Image generated using AI';

export const REFS = {
  wegovySpc: 'Wegovy® IL SPC as approved by MOH.',
  step: [
    'Wilding et al. N Engl J Med 2021; doi:10.1056/NEJMoa2032183;',
    'Wadden et al. JAMA doi:10.1001/jama.2021.1831;',
    'Rubino et al. JAMA. 2021 Apr 13;325(14):1414-1425. doi: 10.1001/jama.2021.3224.',
    'Garvey et al. Nat Med 28, 2083–2091 (2022);',
    'Rubino et al. JAMA 2022; 327(2): 138-150'
  ],
  select: 'Lincoff AM et al. N Engl J Med 2023;389:2221-2232. DOI:10.1056/NEJMoa2307563.',
  esc2024: 'Vrints C, Andreotti F, Koskinas KC, et al. 2024 ESC Guidelines for the management of chronic coronary syndromes. Eur Heart J 2024;45:3415-3537. doi.org/10.1093/eurheartj/ehae177.',
  essence: 'Sanyal AJ et al. N Engl J Med. 2025;392:2089–99.',
  ada2026: 'ADA Professional Practice Committee. Standards of Care in Diabetes—2026. Diabetes Care 2026;49(Suppl 1).',
  tir: 'Battelino T et al. Clinical Targets for Continuous Glucose Monitoring Data Interpretation: Recommendations From the International Consensus on Time in Range. Diabetes Care 2019;42:1593-1603.',
  obesity: [
    'Bray GA, Kim KK, Wilding JPH. Obesity: a chronic relapsing progressive disease process. A position statement of the World Obesity Federation. Obes Rev 2017;18:715-723.',
    'Guh DP et al. The incidence of co-morbidities related to obesity and overweight: a systematic review and meta-analysis. BMC Public Health 2009;9:88.'
  ]
};
