import type { CSSProperties } from 'react'
import { Bloom } from './bouquets'
import { BOUQUETS, CATEGORIES, MESSENGER, SHOP, linkProps } from '../data'

export default function Home() {
  const featured = CATEGORIES[0]
  const hours = SHOP.hours[0]

  return (
    <>
      <section className="hero">
        <div className="wrap hero__grid">
          <div>
            <h1>{SHOP.tagline}</h1>
            <p className="lead">
              Browse by occasion, pick your favorite, and message us on Messenger to order.
            </p>
            <div className="hero__actions">
              <a className="btn" href={MESSENGER.href} {...linkProps(MESSENGER.href)}>
                Order on Messenger
              </a>
              <a className="btn btn--ghost" href="#/bouquets">
                Browse bouquets
              </a>
            </div>
            <p className="hero__hours">
              Open {hours.days}, {hours.time}.
            </p>
          </div>

          {SHOP.logo ? (
            <img className="hero__logo" src={SHOP.logo} alt={`${SHOP.name} logo`} />
          ) : (
            <div className="arch" style={{ background: featured.bg }} aria-hidden="true">
              <span className="arch__stem" />
              <Bloom className="arch__bloom" icon={featured.icon} animate />
            </div>
          )}
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section__head">
            <h2>Shop by occasion</h2>
            <p>Choose an occasion and we will show you the bouquets that suit it.</p>
          </div>
          <ul className="cats">
            {CATEGORIES.map((c) => {
              const count = BOUQUETS.filter((b) => b.category === c.id).length
              return (
                <li key={c.id}>
                  <a
                    className="cat-row"
                    href={`#/bouquets/${c.id}`}
                    style={{ '--row-bg': c.bg } as CSSProperties}
                  >
                    <span className="swatch" style={{ background: c.bg }}>
                      <Bloom icon={c.icon} />
                    </span>
                    <span>
                      <span className="cat-row__name">{c.name}</span>
                      <span className="cat-row__blurb">{c.blurb}</span>
                    </span>
                    <span className="cat-row__count">
                      {count} {count === 1 ? 'bouquet' : 'bouquets'}
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section__head">
            <h2>How to order</h2>
          </div>
          <ol className="steps">
            <li>
              <h3>Pick a bouquet</h3>
              <p>Browse by occasion and note the item code, like R-01.</p>
            </li>
            <li>
              <h3>Message us</h3>
              <p>Send the code, your date, and whether you want pickup or delivery.</p>
            </li>
            <li>
              <h3>We confirm</h3>
              <p>We reply with the total and how to pay, then arrange your flowers fresh.</p>
            </li>
          </ol>
        </div>
      </section>
    </>
  )
}