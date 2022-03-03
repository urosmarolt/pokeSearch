import axios from 'axios'

export default async function fetchAPIData(searchQuery) {
    let uri = `/api/pokemon/${searchQuery}`
    return await axios.get(uri).then(response => response.data).catch((err) => console.error(err)) 
}