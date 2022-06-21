type EventInfoProps = {
  name: string
  description: string
}

const EventInfo = ({ name, description }: EventInfoProps) => {
  return (
    <div className="event-info">
      <h1 className="event-info-title">{name}</h1>
      <p className="event-info-description">{description}</p>
    </div>
  )
}

export default EventInfo
