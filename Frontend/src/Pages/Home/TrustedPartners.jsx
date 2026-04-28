// TrustedPartners.jsx — Premium marquee design, consistent with site theme
import React, { useEffect, useRef } from 'react'
import styles from './Trustedpartners.module.css'


const LOGOS = [
  { name: 'Google',     url: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
  { name: 'Microsoft',  url: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg' },
  { name: 'Amazon',     url: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
  { name: 'Meta',       url: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg' },
  { name: 'IBM',        url: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg' },
  { name: 'Oracle',     url: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg' },
  { name: 'Intel',      url: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Intel_logo_%282006-2020%29.svg' },
  { name: 'Cisco',      url: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg' },
  { name: 'Adobe',      url: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Adobe_Corporate_Logo.png' },
  { name: 'Salesforce', url: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg' },
  { name: 'Shopify',    url: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg' },
  { name: 'Slack',      url: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Slack_Technologies_Logo.svg' },
  { name: 'HubSpot',    url: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/HubSpot_Logo.svg' },
  { name: 'Stripe',     url: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg' },
  { name: 'GitHub',     url: 'https://upload.wikimedia.org/wikipedia/commons/c/c2/GitHub_Invertocat_Logo.svg' },
  { name: 'Docker',     url: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Docker_%28container_engine%29_logo.svg' },
  { name: 'MongoDB',    url: 'https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg' },
  { name: 'Figma',      url: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg' },
  { name: 'Stripe',     url: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg' },
  { name: 'Notion',     url: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png' },
]

// Split into two rows for staggered effect
const ROW1 = LOGOS.slice(0, 10)
const ROW2 = LOGOS.slice(10)

const LogoRow = ({ logos, reverse = false }) => (
  <div className={`${styles.track} ${reverse ? styles.trackReverse : ''}`}>
    {/* Duplicate logos for seamless loop */}
    {[...logos, ...logos].map((logo, i) => (
      <div key={i} className={styles.logoCard}>
        <img
          src={logo.url}
          alt={logo.name}
          className={styles.logoImg}
          loading="lazy"
          draggable={false}
        />
      </div>
    ))}
  </div>
)

export default function TrustedPartners() {
  return (
    <section className={styles.section}>
      

      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            Our Clients &amp; Partners
          </span>
          <h2 className={styles.heading}>
            Trusted by <span className={styles.accent}>Innovators</span>,<br />
            Builders &amp; Industry Leaders
          </h2>
          <p className={styles.sub}>
            From ambitious startups to established enterprises — we've helped businesses
            across industries unlock their digital potential.
          </p>
        </div>

        {/* Marquee rows */}
        <div className={styles.marqueeWrapper}>
          {/* Fade masks left & right */}
          <div className={styles.fadeLeft} />
          <div className={styles.fadeRight} />

          <div className={styles.marqueeInner}>
            <LogoRow logos={ROW1} reverse={false} />
            <LogoRow logos={ROW2} reverse={true} />
          </div>
        </div>

        {/* Pill stat */}
        <div className={styles.pill}>
          <span className={styles.pillDot} />
          24+ Companies &amp; Growing
        </div>
      </div>
    </section>
  )
}