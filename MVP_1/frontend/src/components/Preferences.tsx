import React, { useState } from 'react';
import SelectPreference from './selectPreference';
import ProceedButton from './proceedButton';
import certificationService from '../services/certificationService';
import '../styles/App.css';

interface PreferencesProps {
  savePreferences: (identityPreference: string, reviewPreference: string) => Promise<void>;
  onProceed: () => void;
}

const Preferences: React.FC<PreferencesProps> = ({ savePreferences, onProceed }) => {
  const [identityPreference, setIdentityPreference] = useState<string>('');
  const [reviewPreference, setReviewPreference] = useState<string>('');
  const [proceedClicked, setProceedClicked] = useState<boolean>(false);

  const handleProceed = () => {
    setProceedClicked(true);
    onProceed();
  };

  const handleIdentitySelect = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newIdentityPreference = event.target.value;
    setIdentityPreference(newIdentityPreference);
    await savePreferences(newIdentityPreference, reviewPreference);
  };

  const handleReviewSelect = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newReviewPreference = event.target.value;
    setReviewPreference(newReviewPreference);
    await savePreferences(identityPreference, newReviewPreference);
  };

  const handleCertificationLinkClick = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const { href } = event.currentTarget;
    try {
      await certificationService.logCertificationAccess();
      window.open(href, '_blank');
    } catch (error) {
      console.error('Error logging certification access:', error);
    }
  };

  return (
    <div className="preferences-container">
      <div className="header">
        <h1>JobSecrets.com</h1>
      </div>
      <div className="main-content">
        <h2>Benvenuto!</h2>
        <p>Questo sito è dedicato alla raccolta di recensioni autentiche di aziende italiane da parte di colleghi e
          dipendenti che desiderano condividere le loro esperienze. Il nostro obiettivo è quello di fungere da guida
          affidabile per le persone in cerca di lavoro, fornendo approfondimenti veritieri. In un'epoca piena di fake news
          e recensioni, siamo profondamente impegnati ad aiutare le persone a prendere decisioni informa te e genuine
          riguardo a una delle scelte più importanti della vita: il loro percorso prof essionale.</p>
        <h3>Sezione Obiettivi: </h3>
        <p>Per garantire la massima affidabilità delle nostre recensioni, offriamo la possibilità di rimanere anonimi
          durante l'invio del feedback. A differenza di altre piattaforme, non tracciamo la vostra identità se scegliete
          l'anonimato. Per le recensioni certificate, garantiamo che il recensore sia un attuale dipendente dell'azienda
          recensita, aumentando così il livello di affidabilità. Facendo c lic sul pulsante "Vuoi saperlo?", il recensore può
          accedere a un file PDF contenente la certificazione rilasciata da un ente terzo.</p>
        <a href="/Certificazione Polimi.pdf" target="_blank" className="certification-link" onClick={handleCertificationLinkClick}>
          Vuoi saperne di più sulla nostra certificazione?
        </a>
        <SelectPreference
          label="Preferenza di identità"
          options={[
            { value: 'Anonymous', description: 'Sì, voglio restare ANONIMO' },
            { value: 'Public', description: 'Sì, desidero che le mie recensioni siano PUBBLICHE' }
          ]}
          onSelect={handleIdentitySelect}
          disabled={proceedClicked}
        />
        <SelectPreference
          label="Preferenza di revisione"
          options={[
            { value: 'Verified', description: 'Verificato' },
            { value: 'NotVerified', description: 'Non verificato' }
          ]}
          onSelect={handleReviewSelect}
          disabled={proceedClicked}
        />
        <ProceedButton onClick={handleProceed} disabled={!(identityPreference && reviewPreference)} />
      </div>
    </div>
  );
};

export default Preferences;