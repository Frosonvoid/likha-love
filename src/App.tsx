import { useEffect, useRef, useState } from 'react'
import './App.css'
import { CHANNELS, MESSENGER, SHOP, linkProps } from './data'
import Home from './pages/home'
import Bouquets from './pages/bouquets'
import Contact from './pages/contact'

type Route = { page: 'home' | 'bouquets' | 'contact'; category?: string }

// Pages are chosen by the URL hash, so no router library is needed:
//   #/               -> Home
//   #/bouquets       -> all bouquets
//   #/bouquets/<id>  -> one category, e.g. #/bouquets/romantic
//   #/contact        -> Contact
function readRoute(): Route {
  const [, page, category] = window.location.hash.replace(/^#/, '').split('/')
  if (page === 'bouquets') return { page, category }
  if (page === 'contact') return { page }
  return { page: 'home' }
}

const NAV = [
  { page: 'home', label: 'Home', href: '#/' },
  { page: 'bouquets', label: 'Bouquets', href: '#/bouquets' },
  { page: 'contact', label: 'Contact', href: '#/contact' },
] as const

const TITLES: Record<Route['page'], string> = {
  home: SHOP.name,
  bouquets: `Bouquets - ${SHOP.name}`,
  contact: `Contact - ${SHOP.name}`,
}

function App() {
  const [route, setRoute] = useState<Route>(readRoute)
  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onHashChange = () => setRoute(readRoute())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = TITLES[route.page]
  }, [route.page, route.category])

  return (
    <div className="shop">
      <a
        className="skip"
        href="#main"
        onClick={(e) => {
          e.preventDefault()
          mainRef.current?.focus()
        }}
      >
        Skip to content
      </a>

      <header className="top">
        <div className="wrap top__inner">
          <a className="brand" href="#/">
            {SHOP.name}
          </a>
          <nav className="nav" aria-label="Main">
            {NAV.map((item) => (
              <a
                key={item.page}
                className="nav__link"
                href={item.href}
                aria-current={route.page === item.page ? 'page' : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a className="btn btn--small" href={MESSENGER.href} {...linkProps(MESSENGER.href)}>
            Message us
          </a>
        </div>
      </header>

      <main id="main" ref={mainRef} tabIndex={-1}>
        {route.page === 'home' && <Home />}
        {route.page === 'bouquets' && <Bouquets category={route.category} />}
        {route.page === 'contact' && <Contact />}
      </main>

      <footer className="foot">
        <div className="wrap foot__grid">
          <div>
            <p className="foot__name">{SHOP.name}</p>
            <p>
              {SHOP.hours[0].days}, {SHOP.hours[0].time}
            </p>
          </div>
          <ul className="foot__links">
            {CHANNELS.map((ch) => (
              <li key={ch.id}>
                <a href={ch.href} {...linkProps(ch.href)}>
                  {ch.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </div>
  )
}

export default App