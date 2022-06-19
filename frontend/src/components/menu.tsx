import Link from 'next/link'

const Menu = () => {
  return (
    <ul className="menu">
      <li className="menu-item">
        <Link href="/search" passHref>
          <a>Music</a>
        </Link>
      </li>

      <li className="menu-item">
        <Link href="/search" passHref>
          <a>Stage</a>
        </Link>
      </li>

      <li className="menu-item">
        <Link href="/search" passHref>
          <a>Sports</a>
        </Link>
      </li>
    </ul>
  )
}

export default Menu
