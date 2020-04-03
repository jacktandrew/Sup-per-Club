module.exports = function getDistance(latLon1, latLon2, units) {
  const [lat1, lon1] = latLon1
  const [lat2, lon2] = latLon2
  const piRadians = Math.PI / 180
  const arc = 0.5 - Math.cos((lat2 - lat1) * piRadians) / 2 +
          Math.cos(lat1 * piRadians) * Math.cos(lat2 * piRadians) *
          (1 - Math.cos((lon2 - lon1) * piRadians)) / 2

  const earthRadius = 6371
  const kilometers = 2 * earthRadius * Math.asin(Math.sqrt(arc))
  const kmInMi = 1.609344
  const distance = (units === 'miles') ? kilometers / kmInMi : kilometers

  return distance
}
