import Link from 'next/link'

const Custom404Page = () => {
  return (
    <main className="page error-page">
      <div className="container">
        <img src="/images/error.svg" alt="Error" className="error-img" />

        <div className="btn-group">
          <Link href="/" passHref>
            <a className="btn btn-primary">Home Page</a>
          </Link>
        </div>
      </div>
    </main>
  )
}

export default Custom404Page
