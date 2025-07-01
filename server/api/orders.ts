export default defineEventHandler(() => {
  const statuses = ['queued', 'printing', 'completed', 'failed', 'cancelled']
  const customers = [
    'James Anderson',
    'Mia White',
    'William Brown',
    'Emma Davis',
    'Ethan Harris',
    'Ava Thomas',
    'Michael Wilson',
    'Olivia Taylor',
    'Benjamin Jackson',
    'Sophia Miller',
    'Noah Clark',
    'Isabella Lee',
    'Liam Walker',
    'Charlotte Hall',
    'Mason Young',
    'Amelia King',
    'Elijah Wright',
    'Harper Scott',
    'Evelyn Green',
    'Logan Baker',
  ]
  const printers = ['Prusa i3 MK3S', 'Ultimaker S5', 'Creality Ender 3', 'Raise3D Pro2', 'Formlabs Form 3', 'Anycubic Photon Mono', 'Bambu X1C']
  const materials = ['PLA', 'ABS', 'PETG', 'Nylon', 'TPU', 'Resin']
  const domain = 'example.com'
  const orders = []
  const now = Date.now()
  for (let i = 0; i < 50; i++) {
    const id = (4600 - i).toString()
    const date = new Date(now - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString()
    const status = statuses[Math.floor(Math.random() * statuses.length)]
    const customer = customers[Math.floor(Math.random() * customers.length)]
    const email = `${customer.toLowerCase().replace(/ /g, '.')}@${domain}`
    const printer = printers[Math.floor(Math.random() * printers.length)]
    const material = materials[Math.floor(Math.random() * materials.length)]
    const cost = Math.round((Math.random() * 190 + 10) * 100) / 100
    orders.push({
      id,
      date,
      status,
      email,
      printer,
      material,
      cost,
    })
  }
  return orders
})
