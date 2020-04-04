import React from 'react'
import PigeonMap from 'pigeon-maps'
import PigeonMarker from 'pigeon-marker'
import PigeonOverlay from 'pigeon-overlay'
import Compass from '../../assets/compass.svg'
import './index.css'

module.exports = ({ findMe, handleMap, handleMarker, ...state }) => {
  const { center, launch, points, status, zoom } = state

  const provider = (x, y, z, devicePixelRatio) => {
    const dpr = (devicePixelRatio >= 2) ? '@2x' : ''
    const token = 'w2p5eWH8MapdrHDSbFid'
    const mapId = 'voyager'
    const stub = 'https://api.maptiler.com/maps/'
    return `${stub}${mapId}/256/${z}/${x}/${y}${dpr}.png?key=${token}`
  }

  return (
    <div className="map">
      <PigeonMap center={center} onClick={handleMap} provider={provider} zoom={zoom}>
        <p className="status">{status}</p>
        {
          points.map(([lon, lat, name], i) => (
            <PigeonMarker anchor={[lat, lon]} key={i} payload={name} onClick={handleMarker} />
          ))
        }
        {
          (launch.hasOwnProperty('anchor'))
            ? (<PigeonOverlay anchor={launch.anchor}>{launch.payload}</PigeonOverlay>)
            : null
        }
        <div className="find-me" onClick={findMe}>
          <Compass width={60} height={60} />
        </div>
      </PigeonMap>
    </div>
  )
}
