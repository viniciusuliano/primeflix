import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import './filme.css'
function Filme(){
    const {id} = useParams()
    const [filme, setFilme] = useState(true)
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        async function loadFilme(){
            await api.get(`/movie/${id}`, {
                params:{
                    api_key:"1a53aa6ed2118bcba70ee948de3d7d0d",
                    language: "pt-BR",
                }
            })
            .then((response)=>{
                console.log(response.data)
                setFilme(response.data)
                setLoading(false)
                
            })
            .catch(()=>{
                console.log('Filme não encontrado')
            })
        }
        loadFilme()

        return (()=>{
            console.log('Componente desmontado')
        })
    
    }, [])


    if(loading){
        return(
            <div className="filme-info">
                <h1>Carregando página...</h1>
            </div>
        )
    }




    return(
        <div className="filme-info">
            <h1>{filme.title}</h1>
           <img src={`https://image.tmdb.org/t/p/original${filme.poster_path}`} alt="poster"></img>
           <h3>Sinopse</h3>
           <span>{filme.overview}</span>
           <strong>Avaliação: {Math.floor(filme.vote_average)}/10</strong>
        </div>
    );
}

export default Filme;