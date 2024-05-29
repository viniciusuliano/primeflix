import './home.css'
import { useEffect, useState } from "react";
import api from "../../services/api";
import {Link} from 'react-router-dom'
//URL DA API: /movie/now_playing?api_key=1a53aa6ed2118bcba70ee948de3d7d0d&language=pt-BR

function Home(){
    const [filme, setFilmes] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        async function loadFilmes(){
            const response = await api.get("movie/now_playing", {
                params:{
                    api_key:"1a53aa6ed2118bcba70ee948de3d7d0d",
                    language: "pt-BR",
                    page: 1,
                }
            })
            setFilmes(response.data.results.slice(0,10))
            setLoading(false)
        }
        loadFilmes()
    }, [])

    if(loading){
        return(
            <div className='loading'>
                <h1>Carregando...</h1>
            </div>
        )
    }


    return(
        <div className="container">
            <div className="lista-filmes">
                {filme.map((filme)=>{
                    return(
                        <article key={filme.id}>
                            <strong>{filme.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original${filme.poster_path}`} alt="poster"></img>
                            <Link to={`/filme/${filme.id}`}>Acessar</Link>
                        </article>
                        
                    )
                })}
            </div>
        </div>
    );
}

export default Home;