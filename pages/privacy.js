import {useState} from 'react';

const PrivacyPage = () => {
    const [language, setLanguage] = useState('en');

    const content = {
        de: {
            tldr: 'Zusammenfassung: Deine Anmeldedaten werden mit deiner E-Mail-Adresse verknüpft. Diese Informationen werden innerhalb der Schule geteilt und nicht personenbezogene daten können mit Partnern wie Hackclub geteilt werden, die diese niemals verkaufen werden.',
            details: `
        <h2 class="text-2xl font-bold mb-4">Datenschutzrichtlinie</h2>

        <h3 class="text-xl font-semibold mb-2">Einleitung</h3>
        <p class="mb-4">Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Diese Datenschutzrichtlinie erläutert, wie wir Ihre Daten erfassen, verwenden und schützen.</p>

        <h3 class="text-xl font-semibold mb-2">Datenverarbeitung</h3>
        <ul class="list-disc list-inside mb-4">
          <li><strong>Anmeldedaten:</strong> Ihre Anmeldeinformationen werden mit Ihrer E-Mail-Adresse verknüpft.</li>
          <li><strong>Nutzung der Daten:</strong> Diese Informationen werden innerhalb der Schule geteilt und können mit vertrauenswürdigen Partnern wie Hackclub geteilt werden. Unsere Partner verpflichten sich, diese Daten niemals zu verkaufen oder missbräuchlich zu verwenden.</li>
        </ul>

        <h3 class="text-xl font-semibold mb-2">Dienste von Drittanbietern</h3>
        <p class="mb-4">Wir verwenden die folgenden Dienste:</p>
        <ul class="list-disc list-inside mb-4">
          <li><strong>Microsoft EntraID:</strong> Für die Authentifizierung. <a href="https://www.microsoft.com/de-de/privacy/" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline">Datenschutzrichtlinie</a></li>
          <li><strong>Supabase:</strong> Für die Datenbankverwaltung. Die Supabase-Datenbank befindet sich in Frankfurt, Deutschland. <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline">Datenschutzrichtlinie</a></li>
        </ul>

        <h3 class="text-xl font-semibold mb-2">Datenweitergabe</h3>
        <p class="mb-4">Ihre Daten können innerhalb der Schulgemeinschaft und mit ausgewählten Partnern wie Hackclub geteilt werden. Diese Partner sind vertraglich verpflichtet, Ihre Daten vertraulich zu behandeln und nicht an Dritte zu verkaufen.</p>

        <h3 class="text-xl font-semibold mb-2">Kontenverwaltung</h3>
        <p class="mb-4">Die Konten wurden von Ihrem ENTRA ID-Administrator erstellt, und wir haben keine Kontrolle darüber.</p>

        <h3 class="text-xl font-semibold mb-2">Hosting</h3>
        <p class="mb-4">Die Website wird in einem deutschen Rechenzentrum gehostet.</p>

        <h3 class="text-xl font-semibold mb-2">Ihre Rechte</h3>
        <p class="mb-4">Sie haben das Recht, jederzeit Auskunft über Ihre bei uns gespeicherten personenbezogenen Daten zu erhalten. Ebenso haben Sie das Recht auf Berichtigung, Sperrung oder Löschung Ihrer personenbezogenen Daten.</p>

        <h3 class="text-xl font-semibold mb-2">Kontakt</h3>
        <p class="mb-4">Bei Fragen zur Erhebung, Verarbeitung oder Nutzung Ihrer personenbezogenen Daten, bei Auskünften, Berichtigung, Sperrung oder Löschung von Daten sowie Widerruf erteilter Einwilligungen wenden Sie sich bitte an:</p>
      `,
            links: {
                entraID: 'https://learn.microsoft.com/de-de/entra/identity/conditional-access/terms-of-use',
                supabase: 'https://supabase.com/privacy',
            },
        },
        en: {
            tldr: 'TL;DR: Your registration data will be linked to your email. This information will be shared within the school and may be shared with trusted partners like Hackclub who will never sell this data.',
            details: `
        <h2 class="text-2xl font-bold mb-4">Privacy Policy</h2>

        <h3 class="text-xl font-semibold mb-2">Introduction</h3>
        <p class="mb-4">We take the protection of your personal data very seriously. This privacy policy explains how we collect, use, and protect your data.</p>

        <h3 class="text-xl font-semibold mb-2">Data Processing</h3>
        <ul class="list-disc list-inside mb-4">
          <li><strong>Registration Data:</strong> Your registration information will be linked to your email address.</li>
          <li><strong>Use of Data:</strong> This information will be shared within the school and may be shared with trusted partners like Hackclub. Our partners commit to never selling or misusing this data.</li>
        </ul>

        <h3 class="text-xl font-semibold mb-2">Third-Party Services</h3>
        <p class="mb-4">We use the following services:</p>
        <ul class="list-disc list-inside mb-4">
          <li><strong>Microsoft:</strong> For authentication. <a href="https://www.microsoft.com/de-de/privacy/" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline">Privacy Policy</a></li>
          <li><strong>Supabase:</strong> For database management. The Supabase database is located in Frankfurt, Germany. <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline">Privacy Policy</a></li>
        </ul>

        <h3 class="text-xl font-semibold mb-2">Data Sharing</h3>
        <p class="mb-4">Your data may be shared within the school community and with selected partners like Hackclub. These partners are contractually obligated to keep your data confidential and not sell it to third parties.</p>

        <h3 class="text-xl font-semibold mb-2">Account Management</h3>
        <p class="mb-4">The accounts have been created by your ENTRA ID admin, and we have no control over them. We only access your email.</p>

        <h3 class="text-xl font-semibold mb-2">Hosting</h3>
        <p class="mb-4">The site is hosted in a German data center.</p>

        <h3 class="text-xl font-semibold mb-2">Your Rights</h3>
        <p class="mb-4">You have the right to obtain information about your personal data stored with us at any time. You also have the right to correct, block, or delete your personal data.</p>

        <h3 class="text-xl font-semibold mb-2">Contact</h3>
        <p class="mb-4">If you have any questions about the collection, processing, or use of your personal data, or if you wish to request information, correction, blocking, or deletion of data, please contact:</p>
      `,
            links: {
                entraID: 'https://learn.microsoft.com/de-de/entra/identity/conditional-access/terms-of-use',
                supabase: 'https://supabase.com/privacy',
                code: '',
            },
        },
    };

    const {tldr, details, contact, links} = content[language];

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-3xl mx-auto">
                <div className="flex justify-end mb-4">
                    <button
                        onClick={() => setLanguage('de')}
                        className={`px-4 py-2 ${language === 'de' ? 'bg-blue-600' : 'bg-gray-700'} rounded-md mr-2`}
                    >
                        Deutsch
                    </button>
                    <button
                        onClick={() => setLanguage('en')}
                        className={`px-4 py-2 ${language === 'en' ? 'bg-blue-600' : 'bg-gray-700'} rounded-md`}
                    >
                        English
                    </button>
                </div>
                <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
                <div className="flex justify-center my-10">
                    <img src="https://files.catbox.moe/iylc6o.png" alt="Logo" className="w-32 h-auto"/>
                </div>
                <p className="text-xl mb-4">{tldr}</p>
                <div className="mb-4" dangerouslySetInnerHTML={{__html: details}}/>
                <p className="mb-4">{contact}</p>
                <p className="mb-4">
                    <a href={links.entraID} className="text-blue-500 underline" target="_blank"
                       rel="noopener noreferrer">
                        Microsoft EntraID Privacy Policy
                    </a>
                </p>
                <p className="mb-4">
                    <a href={links.supabase} className="text-blue-500 underline" target="_blank"
                       rel="noopener noreferrer">
                        Supabase Privacy Policy
                    </a>
                </p>
            </div>
        </div>
    );
};

export default PrivacyPage;