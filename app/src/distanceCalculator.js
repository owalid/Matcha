const rad = (x) => {
  return x * Math.PI / 180
}

export const getDistance = (p1, p2) => {
  let lat1 = parseFloat(p1.latitude) || parseFloat(p1.lat)
  let lat2 = parseFloat(p2.latitude) || parseFloat(p2.lat)
  let long1 = parseFloat(p1.longitude) || parseFloat(p1.lgn)
  let long2 = parseFloat(p2.longitude) || parseFloat(p2.lgn)
  let R = 6378137
  let dLat = rad(lat2 - lat1)
  let dLong = rad(long2 - long1)
  let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
  Math.cos(rad(lat1)) * Math.cos(rad(lat2)) *
  Math.sin(dLong / 2) * Math.sin(dLong / 2)
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  let d = Math.floor((R * c) / 1000)
  return d.toString()
}
