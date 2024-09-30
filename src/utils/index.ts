export function formatDate(isoString: string) : string {
    const data = new Date(isoString) 
    const formatter = new Intl.DateTimeFormat('en-EN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
    return formatter.format(data)
}

export function capitalizeName(name: string): string {
    const capitalized = name.split(' ').map(item => {
      let newItem = [...item]
      newItem[0] = newItem[0].toUpperCase()
      return newItem.join('')
    })
    return capitalized.join(' ')
  }