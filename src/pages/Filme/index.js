import { useEffect, useState } from "react";
import { toast } from 'react-toastify'
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import './filme.css'
function Filme(){
    const {id} = useParams()
    const navigate = useNavigate()
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
                navigate("/", {replace:true})
                return;
            })
        }
        loadFilme()

        return (()=>{
            console.log('Componente desmontado')
        })
    
    }, [navigate, id])

    function salvarfilme(){
        const minhalista = localStorage.getItem('@primeflix');
        let filmesSalvos = JSON.parse(minhalista) || [];

        const hasFilme = filmesSalvos.some((filmesSalvo)=> filmesSalvo.id === filme.id)

        if(hasFilme){
            toast.warn("Esse filme esta na sua lista")
            return
        }

        filmesSalvos.push(filme);
        localStorage.setItem('@primeflix', JSON.stringify(filmesSalvos))
        toast.success("Filme salvo com sucesso")        

    }

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
           <div className="area-buttons">
            <button onClick={salvarfilme}>Salvar</button>
            <button>
                <a target="blank" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>Trailer</a>
            </button>
           </div>
        </div>
    );
}

export default Filme;