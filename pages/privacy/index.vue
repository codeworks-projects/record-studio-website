<template>
  <main class="main">
    <div class="center terms-ct">
      <div v-if="locale === 'en'">
        <h1>Privacy and Cookie Policy</h1>

        <h2>Data Controller</h2>
        <p>The data controller for personal data on this website is:</p>
        <p>
          {{ $t('contacts.companyLegalName') }}<br />
          Address: {{ $t('contacts.legalStreet') }}<br />
          Email: {{ $t('contacts.legalMail', { at: '@' }) }}<br />
          <span v-if="$t('contacts.phone')">Phone: {{ $t('contacts.phone') }}</span>
        </p>

        <h2>Data Protection Officer (DPO)</h2>
        <p>
          The Data Protection Officer (DPO) for
          {{ DOMAIN_URL }} is:
        </p>
        <p>
          {{ $t('contacts.companyLegalName') }}<br />
          Address: {{ $t('contacts.legalStreet') }}<br />
          Email: {{ $t('contacts.legalMail', { at: '@' }) }}<br />
          <span v-if="$t('contacts.phone')">Phone: {{ $t('contacts.phone') }}</span>
        </p>

        <h2>Collection and Use of Personal Data</h2>
        <p>{{ DOMAIN_URL }} may collect and use the following types of personal data:</p>
        <ul>
          <li>Name and surname via contact form</li>
          <li>Email via contact form</li>
        </ul>

        <h2>Use of Cookies</h2>
        <p>
          This website does not use profiling cookies and uses a single technical cookie called
          "i18n_redirected". The purpose of this cookie is to remember the user's language
          preference and redirect them to the appropriate version of the website.
        </p>

        <h2>Third-Party Websites</h2>
        <p>
          This website may contain links to third-party websites.
          {{ DOMAIN_URL }} is not responsible for the privacy practices or content of these
          third-party sites. We encourage users to read the privacy policies of any external sites
          they visit.
        </p>

        <h2>Security Measures</h2>
        <p>
          {{ DOMAIN_URL }} adopts adequate security measures to protect against unauthorized access,
          alteration, disclosure, or destruction of personal data. However, no transmission of data
          over the Internet or storage system can be guaranteed 100% secure.
        </p>

        <h2>Changes to this Privacy Policy</h2>
        <p>
          {{ DOMAIN_URL }} reserves the right to update or modify this privacy policy at any time.
          Any changes will be posted on this page with a revised date.
        </p>

        <h2>Contact Information</h2>
        <p>If you have any questions or concerns about this privacy policy, please contact us:</p>
        <p>
          {{ $t('contacts.companyLegalName') }}<br />
          Address: {{ $t('contacts.legalStreet') }}<br />
          Email: {{ $t('contacts.legalMail', { at: '@' }) }}<br />
          <span v-if="$t('contacts.phone')">Phone: {{ $t('contacts.phone') }}</span>
        </p>
      </div>
      <div v-if="locale === 'it'">
        <h1>Informativa sulla privacy</h1>

        <h2>Titolare del Trattamento dei Dati</h2>
        <p>Il titolare del trattamento dei dati personali su questo sito web è:</p>
        <p>
          {{ $t('contacts.companyLegalName') }}<br />
          Indirizzo: {{ $t('contacts.legalStreet') }}<br />
          Email: {{ $t('contacts.legalMail', { at: '@' }) }}<br />
          <span v-if="$t('contacts.phone')">Telefono: {{ $t('contacts.phone') }}</span>
        </p>

        <h2>Responsabile della Protezione dei Dati (RPD)</h2>
        <p>
          Il Responsabile della Protezione dei Dati (RPD) per
          {{ DOMAIN_URL }} è:
        </p>
        <p>
          {{ $t('contacts.companyLegalName') }}<br />
          Indirizzo: {{ $t('contacts.legalStreet') }}<br />
          Email: {{ $t('contacts.legalMail', { at: '@' }) }}<br />
          <span v-if="$t('contacts.phone')">Telefono: {{ $t('contacts.phone') }}</span>
        </p>

        <h2>Raccolta e Utilizzo dei Dati Personali</h2>
        <p>{{ DOMAIN_URL }} potrebbe raccogliere e utilizzare i seguenti tipi di dati personali:</p>
        <ul>
          <li>Nome e cognome tramite modulo di contatto</li>
          <li>Email tramite modulo di contatto</li>
        </ul>

        <h2>Utilizzo dei Cookie</h2>
        <p>
          Questo sito web non utilizza cookie di profilazione e utilizza un singolo cookie tecnico
          chiamato "i18n_redirected". Lo scopo di questo cookie è ricordare la preferenza di lingua
          dell'utente e reindirizzarlo alla versione appropriata del sito web.
        </p>

        <h2>Siti Web di Terze Parti</h2>
        <p>
          Questo sito web potrebbe contenere collegamenti a siti web di terze parti.
          {{ DOMAIN_URL }} non è responsabile delle pratiche sulla privacy o dei contenuti di questi
          siti di terze parti. Incoraggiamo gli utenti a leggere le informative sulla privacy di
          eventuali siti esterni che visitano.
        </p>

        <h2>Misure di Sicurezza</h2>
        <p>
          {{ DOMAIN_URL }} adotta adeguate misure di sicurezza per proteggere da accessi non
          autorizzati, alterazioni, divulgazioni o distruzioni dei dati personali. Tuttavia, nessuna
          trasmissione di dati su Internet o sistema di archiviazione può essere garantita al 100%
          sicura.
        </p>

        <h2>Modifiche a questa Informativa sulla Privacy</h2>
        <p>
          {{ DOMAIN_URL }} si riserva il diritto di aggiornare o modificare questa informativa sulla
          privacy in qualsiasi momento. Eventuali modifiche saranno pubblicate su questa pagina con
          una data revisata.
        </p>

        <h2>Informazioni di Contatto</h2>
        <p>
          Se hai domande o dubbi su questa informativa sulla privacy, ti preghiamo di contattarci:
        </p>
        <p>
          {{ $t('contacts.companyLegalName') }}<br />
          Indirizzo: {{ $t('contacts.legalStreet') }}<br />
          Email: {{ $t('contacts.legalMail', { at: '@' }) }}<br />
          <span v-if="$t('contacts.phone')">Telefono: {{ $t('contacts.phone') }}</span>
        </p>
      </div>
      <div v-else-if="locale === 'de'">
        <h1>Datenschutzerklärung</h1>

        <h2>Datenverantwortlicher</h2>
        <p>Der Datenverantwortliche für diese Website ist:</p>
        <p>
          {{ $t('contacts.companyLegalName') }}<br />
          Adresse: {{ $t('contacts.legalStreet') }}<br />
          E-Mail: {{ $t('contacts.legalMail', { at: '@' }) }}<br />
          <span v-if="$t('contacts.phone')">Telefon: {{ $t('contacts.phone') }}</span>
        </p>

        <h2>Datenschutzbeauftragter (DSB)</h2>
        <p>Der Datenschutzbeauftragte (DSB) für {{ DOMAIN_URL }} ist:</p>
        <p>
          {{ $t('contacts.companyLegalName') }}<br />
          Adresse: {{ $t('contacts.legalStreet') }}<br />
          E-Mail: {{ $t('contacts.legalMail', { at: '@' }) }}<br />
          <span v-if="$t('contacts.phone')">Telefon: {{ $t('contacts.phone') }}</span>
        </p>

        <h2>Erhebung und Verwendung personenbezogener Daten</h2>
        <p>{{ DOMAIN_URL }} kann folgende Arten personenbezogener Daten erheben und verwenden:</p>
        <ul>
          <li>Vor- und Nachname über das Kontaktformular</li>
          <li>E-Mail über das Kontaktformular</li>
        </ul>

        <h2>Verwendung von Cookies</h2>
        <p>
          Diese Website verwendet keine Profiling-Cookies und nur ein technisches Cookie namens
          "i18n_redirected". Der Zweck dieses Cookies besteht darin, die Spracheinstellung des
          Benutzers zu speichern und ihn zur entsprechenden Version der Website weiterzuleiten.
        </p>

        <h2>Websites von Drittanbietern</h2>
        <p>
          Diese Website kann Links zu Websites von Drittanbietern enthalten.
          {{ DOMAIN_URL }} ist nicht verantwortlich für die Datenschutzpraktiken oder Inhalte dieser
          Drittanbieter-Websites. Wir empfehlen den Benutzern, die Datenschutzerklärungen der
          besuchten externen Websites zu lesen.
        </p>

        <h2>Sicherheitsmaßnahmen</h2>
        <p>
          {{ DOMAIN_URL }} ergreift angemessene Sicherheitsmaßnahmen, um unbefugten Zugriff,
          Änderungen, Offenlegungen oder Zerstörung von personenbezogenen Daten zu schützen. Dennoch
          kann keine Datenübertragung über das Internet oder ein Datenspeichersystem zu 100 % sicher
          sein.
        </p>

        <h2>Änderungen dieser Datenschutzerklärung</h2>
        <p>
          {{ DOMAIN_URL }} behält sich das Recht vor, diese Datenschutzerklärung jederzeit zu
          aktualisieren oder zu ändern. Alle Änderungen werden auf dieser Seite mit einem
          überarbeiteten Datum veröffentlicht.
        </p>

        <h2>Kontaktinformationen</h2>
        <p>Bei Fragen oder Bedenken zu dieser Datenschutzerklärung kontaktieren Sie uns bitte:</p>
        <p>
          {{ $t('contacts.companyLegalName') }}<br />
          Adresse: {{ $t('contacts.legalStreet') }}<br />
          E-Mail: {{ $t('contacts.legalMail', { at: '@' }) }}<br />
          <span v-if="$t('contacts.phone')">Telefon: {{ $t('contacts.phone') }}</span>
        </p>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
const { locale } = useI18n()

const { t } = useI18n()

const config = useRuntimeConfig()
const url = useRequestURL()
const DOMAIN_URL = config.public.NUXT_PUBLIC_DOMAIN_URL || url.host

// SEO
useHead({
  title: t('pg.privacy.meta.title') + ' | ' + t('contacts.companySimpleName'),
  meta: [{ name: 'description', content: t('pg.privacy.meta.description') }],
})
</script>

<style lang="postcss" scoped>
.main {
  @apply text-white pt-36;

  & .terms-ct {
    @apply pt-6 pb-12;

    & > div {
      @apply max-w-[700px];
    }

    & h1 {
      @apply text-4xl py-4 font-black;
    }

    & h2 {
      @apply text-xl mt-6 font-black;
    }
  }
}
</style>
