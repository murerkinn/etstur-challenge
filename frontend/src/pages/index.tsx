import PopularEventsCarousel from '@/modules/home/components/popular-events-carousel'

const HomePage = () => {
  return (
    <>
      <main className="page home-page">
        <div className="container">
          <section className="hero-section">
            <PopularEventsCarousel />
          </section>
        </div>
      </main>
    </>
  )
}

export default HomePage
