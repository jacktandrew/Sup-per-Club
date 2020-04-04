import React, { useState } from 'react'
import inside from 'point-in-polygon'
import keys from '../../keys.json'
import Header from './header'
import Map from './map'
import Footer from './footer'
import polygons from '../polygons'
import launches from '../launches'

const allPlaces = [
  'bakery',
  'bar',
  'cafe',
  'convenience_store',
  'drugstore',
  'gas_station',
  'grocery_or_supermarket',
  'liquor_store',
  'meal_takeaway',
  'restaurant',
  'shopping_mall',
  'store',
  'supermarket',
]

module.exports = () => {
  const [points, setPoints] = useState([])
  const [center, setCenter] = useState([47.64, -122.335])
  const [selected, setSelected] = useState('all')
  const [status, setStatus] = useState()
  const [launch, setLaunch] = useState({})
  const [zoom, setZoom] = useState(12)

  const findMe = () => {
    const success = ({ coords: { latitude, longitude } }) => {
      setCenter([0, 0])
      setCenter([latitude, longitude])
      setStatus(`${latitude.toFixed(3)}, ${longitude.toFixed(3)}`)
    }

    const error = () => setStatus('Unable to locate you...')

    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser')
    } else {
      setStatus('Locating…')
      navigator.geolocation.getCurrentPosition(success, error)
    }
  }

  const getNearby = (latLon) => {
    console.log('getNearby', latLon)
    const url = [
      'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
      `?location=${latLon}`,
      `&type=${selected}`,
      '&radius=100',
      '&opennow=true',
      `&key=${keys.googleApi}`,
    ].join('')

    console.log('url', url)

    // fetch(url).then(response => {
    //   console.log('response', response)
    // })
  }

  const handleMap = ({ latLng, pixel }) => {
    const [lat, lng] = latLng
    let match

    for (let key in polygons) {
      if (inside([lng, lat], polygons[key])) {
        match = launches[key]
        if (match) {
          setPoints(match)
          break
        }
      }
    }
  }

  const handleMarker = ({ anchor, payload }) => {
    setLaunch({ anchor, payload })
    getNearby(anchor.join())
    setCenter(anchor)
    setZoom(17)
  }

  const handleSelect = ({ target: { value } }) => {
    setSelected(value)
  }

  return (
    <div>
      <Header
        handleSelect={handleSelect}
        selected={selected}
      />
      <Map
        center={center}
        status={status}
        zoom={zoom}
        points={points}
        launch={launch}
        findMe={findMe}
        handleMap={handleMap}
        handleMarker={handleMarker}
      />
      <Footer />
    </div>
  )
}
