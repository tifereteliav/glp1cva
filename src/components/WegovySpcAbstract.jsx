import React, { useState } from 'react';
import { FileText, ChevronDown, ChevronUp } from 'lucide-react';

// Abridged Israeli prescribing information, as added to the approved deck by the sponsor's medical review.
export default function WegovySpcAbstract({ defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const h = { fontWeight: 800, color: '#0f172a' };
  return (
    <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ width: '100%', padding: '16px 22px', background: 'white', border: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'right' }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 800, fontSize: '1.05rem', color: '#0f172a' }}>
          <FileText size={20} color="#0284c7" />
          תקציר העלון הרשום של Wegovy® בישראל
        </span>
        {open ? <ChevronUp size={20} color="#64748b" /> : <ChevronDown size={20} color="#64748b" />}
      </button>
      {open && (
        <div dir="ltr" style={{ padding: '4px 24px 22px 24px', textAlign: 'left', fontSize: '0.84rem', color: '#334155', lineHeight: 1.55, borderTop: '1px solid #f1f5f9' }}>
          <h4 style={{ ...h, fontSize: '1.05rem', margin: '14px 0 6px 0' }}>Wegovy®</h4>
          <p><span style={h}>Therapeutic indications:</span></p>
          <p>Adults: Wegovy® is indicated as an adjunct to a reduced-calorie diet and increased physical activity for weight management, including weight loss and weight maintenance, in adults with an initial Body Mass Index (BMI) of</p>
          <ul style={{ margin: '4px 0 8px 18px' }}>
            <li>≥30 kg/m2 (obesity), or</li>
            <li>≥27 kg/m2 to &lt;30 kg/m2 (overweight) in the presence of at least one weight-related comorbidity e.g. dysglycaemia (prediabetes or type 2 diabetes mellitus), hypertension, dyslipidaemia, obstructive sleep apnoea or cardiovascular disease.</li>
          </ul>
          <p>For trial results with respect to cardiovascular risk reduction and populations studied, see section 5.1 of the full Israeli physician leaflet.</p>
          <p>Adolescents (≥12 years): Wegovy® is indicated as an adjunct to a reduced-calorie diet and increased physical activity for weight management in adolescents ages 12 years and above with obesity (BMI ≥95th percentile as defined on sex- and age-specific BMI growth charts -CDC.gov), and body weight above 60 kg.</p>
          <p>Treatment with Wegovy® should be discontinued and re-evaluated if adolescent patients have not reduced their BMI by at least 5% after 12 weeks on the 2.4 mg or maximum tolerated dose.</p>
          <p><span style={h}>Contraindication:</span> Hypersensitivity to the active substance or to any of the excipients listed in section 6.1 of the full Israeli physician leaflet.</p>
          <p><span style={h}>Special warnings:</span></p>
          <p><span style={h}>Aspiration in association with general anaesthesia or deep sedation:</span> Cases of pulmonary aspiration have been reported in patients receiving GLP-1 receptor agonists undergoing general anaesthesia or deep sedation. Therefore the increase risk of residual gastric content due to delayed gastric emptying should be considered prior to performing procedures with general anaesthesia or deep sedation.</p>
          <p><span style={h}>Gastrointestinal effects and Dehydration:</span> Use of GLP-1 receptor agonists may be associated with gastrointestinal adverse reactions. This should be considered when treating patients with impaired renal function, as nausea, vomiting, and diarrhoea may cause dehydration, which in rare cases can lead to a deterioration of renal function. Patients treated with semaglutide should be advised of the potential risk of dehydration in relation to gastrointestinal side effects and take precautions to avoid fluid depletion.</p>
          <p><span style={h}>Acute pancreatitis:</span> Acute pancreatitis has been observed with the use of GLP-1 receptor agonists. Patients should be informed of the characteristic symptoms of acute pancreatitis.</p>
          <p><span style={h}>Hypoglycaemia in patients with type 2 diabetes:</span> Patients treated with semaglutide in combination with a sulfonylurea or insulin may have an increased risk of hypoglycaemia.</p>
          <p><span style={h}>Diabetic retinopathy in patients with type 2 diabetes:</span> In patients with diabetic retinopathy with semaglutide, an increased risk of developing diabetic retinopathy complications has been observed.</p>
          <p><span style={h}>Non-arteritic anterior ischaemic optic neuropathy (NAION):</span> Data from epidemiological studies indicates an increased risk for non-arteritic anterior ischaemic optic neuropathy (NAION) during treatment with semaglutide. There is no identified time interval for when NAION may develop following treatment start. A sudden loss of vision should lead to ophthalmological examination and treatment with semaglutide should be discontinued if NAION is confirmed.</p>
          <p><span style={h}>Patients with gastroparesis:</span> Semaglutide treated patients with gastroparesis may experience more serious or severe gastrointestinal adverse events. Semaglutide should be used with caution in these patients, and semaglutide is not recommended if gastroparesis is severe.</p>
          <p>For full information regarding special warnings and precautions please refer to the full Israeli physician leaflet as appears in the MoH website.</p>
          <p><span style={h}>Safety profile:</span> The most frequently reported adverse reactions during treatment with Wegovy® are: vomiting, diarrhoea, constipation, nausea, abdominal pain, headache and fatigue. For further information please refer to the full Israeli physician leaflet as appears in the MoH website.</p>
          <p><span style={h}>Marketing registration holder:</span> Novo Nordisk LTD, Israel</p>
        </div>
      )}
    </div>
  );
}
