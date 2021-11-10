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
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles['hero__button']}>
            <Link
              className="button button--secondary button--lg"
              to="/docs/intro"
            >
              Get started
            </Link>
          </div>
          <img className={styles['hero__image']} src="/img/hero-1.png" alt="App screenshot" />
        </div>
      </main>
    </Layout>
  );
}
