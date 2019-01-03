/**
 * Traffic obj structure

  const traffic = {
    dests: {
      123: [{ src: 456, bytes: 100 }]
    },
    srcs: {
      456: [{ dest: 123, bytes: 100 }]
    },
    ips: [123, 456, 789]
  }

*/

export default function transformData (data) {
  const dests = {}
  const srcs = {}
  const ips = []

  data.forEach(record => {
    const { result } = record
    const dest = result['All_Traffic.dest']
    const src = result['All_Traffic.src']
    const bytes = result['sum_bytes']

    // Populate overall IP array
    if (ips.indexOf(dest) === -1) ips.push(dest)
    if (ips.indexOf(src) === -1) ips.push(src)

    // If the dest is already in dests obj add it to it's array, else create it
    dests[dest] ? dests[dest].push({ src, bytes }) : dests[dest] = [{ src, bytes }]

    // If the src is already in srcs obj add it to it's array, else create it
    srcs[src] ? srcs[src].push({ dest, bytes }) : srcs[src] = [{ dest, bytes }]
  })

  return { dests, srcs, ips }
}
