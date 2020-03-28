import React, {useEffect, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import logoImg from  '../../assets/logo.svg'
import './style.css';

function Profile(){
    const ongId = localStorage.getItem('ongId')
    const ongName = localStorage.getItem('ongName')
    const history = useHistory();

    const [incidents, setIncidents] = useState([]);

    useEffect(()=>{
        api.get('profile', {
            headers: {
                authorization: ongId,
            }
        })
        .then(response => {
            setIncidents(response.data.incidents)
        })
        },
        [ongId]
    );
    function handleLogout(){
        localStorage.clear();
        history.push('/')
    }

    async function handleDeleteIncident(id){
        try{
            await api.delete(`incidents/${id}`, {
                headers: {
                    authorization: ongId,
                }
            });
            setIncidents( incidents.filter( incidents => incidents.id !== id));
        }
        catch{
            alert("Error ao deletar caso.");
        }
    }
    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="logo do site be the heroes"/>
                <span>Bem vinda, {ongName}.</span>

                <Link className="button" to="incidents/new">Cadastrar novo Caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#e02041"/>
                </button>
            </header>
            <h1>Casos cadastrados</h1>
            <ul>
                {
                incidents.map( incidents => ( 
                    <li key={incidents.id}>
                        <strong>CASO:</strong>
                        <p>{incidents.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incidents.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incidents.value)}</p>

                        <button onClick={() => handleDeleteIncident(incidents.id)} type="button">
                            <FiTrash2 size={20} color="a8a8b3"/>
                        </button>
                    </li>     
                ))
                }   
            </ul>
        </div>
    )
}

export default Profile;