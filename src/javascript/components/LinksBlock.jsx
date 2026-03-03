import React from 'react'

const LinksBlock = ({ links }) => {
  return (
    <div className="O_LinksBlock">
      <h3 className="A_Text A_Text--h2">Полезные ссылки</h3>
      <div className="C_Links">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            className="A_Link"
            target={link.external ? '_blank' : undefined}
            rel={link.external ? 'noopener noreferrer' : undefined}
          >
            <div className="W_GreenTextWithImage">
              <img
                src="/images/icons/Q_IconLink.svg"
                alt={`Ссылка на ${link.text}`}
              />
              {link.text}
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default LinksBlock
