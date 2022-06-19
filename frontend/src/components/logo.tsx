import Link from 'next/link'

const Logo = () => {
  return (
    <Link href="/" passHref>
      <a className="logo">Event.ly</a>
    </Link>
  )
}

export default Logo
