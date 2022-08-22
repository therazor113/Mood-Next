export const colors = [
  'rgba(255, 0, 0, 0.7)',
  'rgba(255, 68, 0, 0.7)',
  'rgba(255, 119, 0, 0.7)',
  'rgba(255, 204, 0, 0.7)',
  'rgba(255, 255, 0, 0.7)',
  'rgba(200, 225, 0, 0.7)',
  'rgba(120, 200, 0, 0.7)',
  'rgba(55, 225, 0, 0.7)',
  'rgba(0, 200, 0, 0.9)'
]

export const solidColors = [
  'rgb(255, 0, 0)',
  'rgb(255, 68, 0)',
  'rgb(255, 119, 0)',
  'rgb(255, 204, 0)',
  'rgb(255, 255, 0)',
  'rgb(200, 225, 0)',
  'rgb(120, 200, 0)',
  'rgb(55, 225, 0)',
  'rgb(0, 200, 0)'
]

export const icons = [
  '\uf567',
  '\uf5b3',
  '\uf119',
  '\uf57a',
  '\uf11a',
  '\uf118',
  '\uf5b8',
  '\uf582',
  '\uf59a'
]

export const createGradient = (ctx, area) => {
  const colorStart = 'rgb(255, 0, 0)'
  const colorMid = 'rgb(200, 225, 0)'
  const colorEnd = 'rgb(0, 200, 0)'
  const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top)
  gradient.addColorStop(0, colorStart)
  gradient.addColorStop(0.5, colorMid)
  gradient.addColorStop(1, colorEnd)

  return gradient
}
