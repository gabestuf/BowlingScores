const BUILD: boolean = true

const localAPI: string = "http://localhost:3000"
const vercelAPI: string = "https://www.gabestuf.com"

export default BUILD ? vercelAPI : localAPI