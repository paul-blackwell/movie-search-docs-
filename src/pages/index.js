import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="A modern React tutorial project"
    >
      <main className={styles.main}>
        <div className={styles.hero}>
          <div className={styles['hero__title-container']}>
          <h1 className={styles['hero__title']}>{siteConfig.title}</h1>
          <p className={styles['hero__subtitle']}>{siteConfig.tagline}</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat pretium, posuere ultricies consequat vel.</p>
          <div className={styles['hero__button']}>
            <Link
              className="button button--secondary button--lg"
              to="/docs/getting-started"
            >
              Get started
            </Link>
          </div>
          </div>
          <img className={styles['hero__image']} src="/img/hero-2.png" alt="App screenshot" />
        </div>
      </main>
    </Layout>
  );
}
