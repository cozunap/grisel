import { useTranslation } from 'react-i18next';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import '../index.css';

export default function GiftCards() {
  const { t } = useTranslation('giftcards');

  return (
    <Layout>
      <SEO title="Gift Cards" description="Give the gift of wellness with Grisel Beauty Spa gift cards." />

      <section className="page-header">
        <div className="container">
          <span className="eyebrow center-line">{t('eyebrow')}</span>
          <h1>{t('heroTitle')}</h1>
          <p className="lede">{t('heroSubtitle')}</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="grid grid-3">
            <div className="plain-card">
              <h3>{t('use1Title')}</h3>
              <p>{t('use1Desc')}</p>
            </div>
            <div className="plain-card">
              <h3>{t('use2Title')}</h3>
              <p>{t('use2Desc')}</p>
            </div>
            <div className="plain-card">
              <h3>{t('use3Title')}</h3>
              <p>{t('use3Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section--tight section--olive">
        <div className="container center">
          <h2>{t('ctaTitle')}</h2>
          <p className="lede">{t('ctaSubtitle')}</p>
          <div className="btn-row" style={{ marginTop: "32px" }}>
            <a href="tel:2407010731" className="btn btn-primary">{t('btnPhone')}</a>
            <a href="/contact" className="btn btn-outline">{t('btnMessage')}</a>
          </div>
        </div>
      </section>

    </Layout>
  );
}
