import { Flower, FlowerLotus, FlowerTulip } from '@phosphor-icons/react'
import {
  BOUQUETS,
  CATEGORIES,
  MESSENGER,
  SHOP,
  linkProps,
  type Bouquet,
  type Category,
  type FlowerIcon,
} from '../data'

const FLOWER_ICONS = {
  flower: Flower,
  'flower-lotus': FlowerLotus,
  'flower-tulip': FlowerTulip,
} as const

type BloomProps = {
  icon?: FlowerIcon
  animate?: boolean
  className?: string
}

// Renders the matching Phosphor flower icon for each category swatch and fallback card.
export function Bloom({ icon = 'flower', animate = false, className = '' }: BloomProps) {
  const IconComponent = FLOWER_ICONS[icon]

  return (
    <IconComponent
      className={`bloom ${animate ? 'bloom--animate' : ''} ${className}`.trim()}
      size="100%"
      weight="regular"
      aria-hidden="true"
      focusable="false"
    />
  )
}

function Tag({ bouquet, category }: { bouquet: Bouquet; category: Category }) {
  const price = `${bouquet.custom ? 'From ' : ''}${SHOP.currency}${bouquet.price}`

  return (
    <li className="tag">
      <div className="tag__top">
        <span className="tag__hole" />
      </div>
      <div className="tag__art" style={{ background: category.bg }}>
        {bouquet.image ? (
          <img src={bouquet.image} alt={bouquet.name} loading="lazy" />
        ) : (
          <Bloom icon={category.icon} />
        )}
        {bouquet.badge && <span className="tag__badge">{bouquet.badge}</span>}
      </div>
      <div className="tag__body">
        <div className="tag__row">
          <h3>{bouquet.name}</h3>
          <span className="tag__price">{price}</span>
        </div>
        <p>{bouquet.description}</p>
        <p className="tag__flowers">{bouquet.flowers}</p>
        <div className="tag__meta">
          <span>Item {bouquet.code}</span>
          <span>{bouquet.size}</span>
        </div>
        <a className="btn btn--small" href={MESSENGER.href} {...linkProps(MESSENGER.href)}>
          Order {bouquet.code} on Messenger
        </a>
      </div>
    </li>
  )
}

export default function Bouquets({ category }: { category?: string }) {
  const active = CATEGORIES.find((c) => c.id === category)
  const shown = active ? [active] : CATEGORIES

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <h1>Bouquets</h1>
          <p className="lead">
            Pick an occasion, then message us the item code to order. We will confirm the total and
            your pickup or delivery details.
          </p>
          <nav className="filters" aria-label="Bouquet categories">
            <a className="chip" href="#/bouquets" aria-current={active ? undefined : 'true'}>
              All
            </a>
            {CATEGORIES.map((c) => (
              <a
                key={c.id}
                className="chip"
                href={`#/bouquets/${c.id}`}
                aria-current={active?.id === c.id ? 'true' : undefined}
              >
                <span className="chip__dot" style={{ background: c.petal }} />
                {c.name}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <div className="wrap">
        {shown.map((c) => (
          <section key={c.id} className="group" aria-labelledby={`cat-${c.id}`}>
            <div className="group__head">
              <span className="swatch" style={{ background: c.bg }}>
                <Bloom icon={c.icon} />
              </span>
              <div>
                <h2 id={`cat-${c.id}`}>{c.name}</h2>
                <p>{c.blurb}</p>
              </div>
            </div>
            <ul className="tags">
              {BOUQUETS.filter((b) => b.category === c.id).map((b) => (
                <Tag key={b.id} bouquet={b} category={c} />
              ))}
            </ul>
          </section>
        ))}

        <section className="custom-cta">
          <h2>Don’t see what you want?</h2>
          <p>Send us a photo or describe it on Messenger and we will make something close.</p>
          <a className="btn" href={MESSENGER.href} {...linkProps(MESSENGER.href)}>
            Message us on Messenger
          </a>
        </section>
      </div>
    </>
  )
}