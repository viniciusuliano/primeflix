import './erro.css'
import Error from './src/error.png'
import {Link} from 'react-router-dom'
function Erro(){
    return(
        <div className="erro">
            <img src={Error} alt='imagem de erro'></img>
            <Link to="/">Veja todos os filmes</Link>
        </div>
    )
}

export default Erro