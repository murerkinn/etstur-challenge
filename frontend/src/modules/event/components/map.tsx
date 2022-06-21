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

type MapProps = {
  lat: number
  lng: number
}

const Map = ({ lat, lng }: MapProps) => {
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
          <PinMarker position={{ lat, lng } as unknown as google.maps.LatLng} />
        </GoogleMap>
      )}
    </div>
  )
}

export default Map
