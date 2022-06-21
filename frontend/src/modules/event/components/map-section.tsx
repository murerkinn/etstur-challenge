import FmdGood from '@mui/icons-material/FmdGood'
import { GoogleMap, OverlayView, useJsApiLoader } from '@react-google-maps/api'
import { useCallback, useState } from 'react'

import {
  defaultZoom,
  googleMapParams,
  googleMapStyle,
  maxZoom,
  minZoom,
} from '@/constants/google-map-config'

const PinMarker = ({
  key,
  position,
}: {
  key?: string
  position: google.maps.LatLng
  color?: string
}) => {
  return (
    <OverlayView
      key={key}
      position={position}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
    >
      <div className="pin-marker">
        <FmdGood />
      </div>
    </OverlayView>
  )
}

type MapSectionProps = {
  lat: number
  lng: number
  address: string
}

const MapSection = ({ lat, lng, address }: MapSectionProps) => {
  const { isLoaded } = useJsApiLoader(googleMapParams)

  const [, setMap] = useState<any>(null)
  const [zoom] = useState(defaultZoom)

  const onLoad = useCallback(
    (map: google.maps.Map) => {
      map.setOptions({ styles: googleMapStyle })

      setMap(map)

      map.setCenter({ lat, lng })
    },
    [lat, lng]
  )

  const onUnmount = useCallback(() => {
    setMap(null)
  }, [])

  return (
    <div className="map-section">
      <h3 className="map-section-title">Location of the Event</h3>

      <p className="address">{address}</p>

      <div className="map-container">
        {isLoaded && (
          <GoogleMap
            mapContainerStyle={{
              height: '100%',
              width: '100%',
            }}
            center={{ lat, lng }}
            zoom={zoom}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
              fullscreenControl: false,
              zoomControl: false,
              minZoom,
              maxZoom,
              disableDefaultUI: true,
              keyboardShortcuts: false,
            }}
          >
            <PinMarker
              position={{ lat, lng } as unknown as google.maps.LatLng}
            />
          </GoogleMap>
        )}
      </div>
    </div>
  )
}

export default MapSection
