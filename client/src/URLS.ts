const BUILD: boolean = false;

const localAPI: string = "http://localhost:3000/bowling";
const vercelAPI: string = "https://www.gabestuf.com/bowling";

export default BUILD ? vercelAPI : localAPI;
