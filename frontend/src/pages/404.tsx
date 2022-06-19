import Link from 'next/link'

const Custom404Page = () => {
  return (
    <main className="page error-page">
      <img src="/images/404.svg" alt="404 - Not Found" className="error-img" />

      <div className="btn-group">
        <Link href="/" passHref>
          <a className="btn btn-primary">Home Page</a>
        </Link>
      </div>
    </main>
  )
}

export default Custom404Page
