import './favoritos.css'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
function Favoritos(){
    const [filmes, setFilmes] = useState([])
    useEffect(()=>{
        const minhalista = localStorage.getItem("@primeflix")
        setFilmes(JSON.parse(minhalista) || []) 
    }, [])

    function excluirFilme(id){
        let limparFilme = filmes.filter((item)=>{
            return(item.id !== id)
        })

        setFilmes(limparFilme);
        localStorage.setItem('@primeflix', JSON.stringify(limparFilme))
        toast.success("Filme removido com sucesso")
    }

    return(
        <div className='favorites'>
            <h1>Meus Filmes</h1>
            {filmes.length === 0 && <p>Sorry, você não tem filmes salvos</p>}
            <ul>
                {filmes.map((item)=>{
                    return(
                        <li key={item.id}>
                            <span>{item.title}</span>
                        <div className='area_button'>
                            <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                            <button className='excluir' onClick={()=>excluirFilme(item.id)}>Excluir</button>
                        </div>
                        </li>
)
                })}
            </ul>
        </div>
    )
}

export default Favoritos