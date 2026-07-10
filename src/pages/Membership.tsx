import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { useTranslation } from 'react-i18next';
import '../index.css';

export default function Membership() {
  const { t } = useTranslation('membership');

  return (
    <Layout>
      <SEO title={t('eyebrow')} description={t('heroSubtitle')} />

      <section className="page-header">
        <div className="container">
          <span className="eyebrow center-line">{t('eyebrow')}</span>
          <h1>{t('heroTitle')}</h1>
          <p className="lede">{t('heroSubtitle')}</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "20px" }}>
        <div className="container">
          <div className="grid grid-3">

            <div className="plan-card">
              <span className="eyebrow center-line">{t('plan1Eyebrow')}</span>
              <div className="plan-price">{t('plan1Price')}<span>/month</span></div>
              <ul className="plan-list">
                <li>{t('plan1Perk1')}</li>
                <li>{t('plan1Perk2')}</li>
                <li>{t('plan1Perk3')}</li>
                <li>{t('plan1Perk4')}</li>
              </ul>
              <a href="/booking" className="btn btn-outline" style={{ justifyContent: "center" }}>{t('startPlan')}</a>
            </div>

            <div className="plan-card featured">
              <span className="plan-tag">{t('plan2Tag')}</span>
              <span className="eyebrow center-line">{t('plan2Eyebrow')}</span>
              <div className="plan-price">{t('plan2Price')}<span>/month</span></div>
              <ul className="plan-list">
                <li>{t('plan2Perk1')}</li>
                <li>{t('plan2Perk2')}</li>
                <li>{t('plan2Perk3')}</li>
                <li>{t('plan2Perk4')}</li>
              </ul>
              <a href="/booking" className="btn btn-primary" style={{ justifyContent: "center" }}>{t('startPlan')}</a>
            </div>

            <div className="plan-card">
              <span className="eyebrow center-line">{t('plan3Eyebrow')}</span>
              <div className="plan-price">{t('plan3Price')}<span>/month</span></div>
              <ul className="plan-list">
                <li>{t('plan3Perk1')}</li>
                <li>{t('plan3Perk2')}</li>
                <li>{t('plan3Perk3')}</li>
                <li>{t('plan3Perk4')}</li>
              </ul>
              <a href="/booking" className="btn btn-outline" style={{ justifyContent: "center" }}>{t('startPlan')}</a>
            </div>

          </div>

          <p className="lede center" style={{ margin: "44px auto 0", maxWidth: "720px", fontSize: "0.92rem" }}>{t('footerNote')}</p>
        </div>
      </section>

      <section className="section--tight section--olive">
        <div className="container center">
          <h2>{t('ctaTitle')}</h2>
          <p className="lede">{t('ctaSubtitle')}</p>
          <div className="btn-row">
            <a href="/booking" className="btn btn-primary">{t('bookAppt')}</a>
            <a href="/contact" className="btn btn-outline">{t('askQuestion')}</a>
          </div>
        </div>
      </section>

    </Layout>
  );
}
