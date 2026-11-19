import { CHANNELS, SHOP, linkProps } from '../data'

export default function Contact() {
  const directions = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SHOP.address)}`

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <h1>How to reach us</h1>
          <p className="lead">
            Messenger gets the fastest reply. The other channels suit the situations listed under
            each one.
          </p>
        </div>
      </section>

      <div className="wrap contact">
        <ul className="channels">
          {CHANNELS.map((ch) => (
            <li key={ch.id} className={`channel ${ch.primary ? 'channel--primary' : ''}`}>
              <div className="channel__head">
                <h2>{ch.label}</h2>
                <span className="channel__handle">{ch.handle}</span>
              </div>
              <p>
                <strong>Best for</strong> {ch.bestFor}
              </p>
              <p>
                <strong>Reply time</strong> {ch.reply}
              </p>
              <a className="btn btn--small" href={ch.href} {...linkProps(ch.href)}>
                {ch.cta}
              </a>
            </li>
          ))}
        </ul>

        <aside className="info">
          <section>
            <h2>Opening hours</h2>
            <dl className="hours">
              {SHOP.hours.map((h) => (
                <div key={h.days} className="hours__row">
                  <dt>{h.days}</dt>
                  <dd>{h.time}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section>
            <h2>Pickup</h2>
            <p>{SHOP.address}</p>
            <p>
              <a href={directions} target="_blank" rel="noopener noreferrer">
                Get directions
              </a>
            </p>
          </section>

          <section>
            <h2>Good to know</h2>
            <ul className="notes">
              {SHOP.notes.map((n) => (
                <li key={n.title}>
                  <strong>{n.title}</strong>
                  {n.text}
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </>
  )
}