import initTranslations from '../i18n';
import TranslationProvider from '../../components/TranslationProvider'
export default async function Home({ params: { locale } }) {
  const { t, resources } = await initTranslations(locale, ['home']);
  return (
    <TranslationProvider resources={resources}  locale={locale} namespaces={['home']}>
      <main>
        <div>{t('header')}</div>
      </main>
    </TranslationProvider>
  );
}

