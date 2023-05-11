import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/userContext";


// TELA DO USUÁRIO
export default function InitialPage(){
    const navigator = useNavigate();
    const [preferentialTickets, setPreferentialTickets] = useState<number[]>([]);
    const [regularTickets, setRegularTickets] = useState<number[]>([]);
    const {username} = useContext(UserContext);

    useEffect(() => {
        (async () => {
            try {
                axios.get("http://localhost:4000/preferential-ticket").then(
                    response => response.data?setPreferentialTickets(response.data):
                    setPreferentialTickets([]));
                    axios.get("http://localhost:4000/regular-ticket").then(
                        response => response.data?setRegularTickets(response.data):
                        setRegularTickets([]));

            } catch (e) {
                alert("Erro ao receber dados");
            }
        })();
    }, [])



    function logOut(){
        navigator("/log-in");
    }

    function register(ticket: string){
        navigator(`/search-register/?ticket=${ticket}`);
    }

    return(
        <Container>
            <Header><p>Bem-Vindo, {username}</p> <button onClick={logOut}>Sair</button></Header>
            {/* BOTÃO INICIAL PARA COMEÇAR O ATENDIMENTO */}

            <h4>Preferencial:</h4>
            <Box color = {"#1877F2"}>
                <div>
                    {preferentialTickets.length>0?preferentialTickets.map(ticket => <p key={ticket} onClick={() =>register(ticket.toString())}>{ticket}</p>):
                    <h4>Nenhuma senha a espera</h4>}
                </div>
            </Box>
            
            <h4>Regular:</h4>
            <Box color = {"#D6860E"}>
                <div>
                    {regularTickets.length>0?regularTickets.map(ticket => <p key={ticket} onClick={() =>register(ticket.toString())}>{ticket}</p>):
                    <h4>Nenhuma senha a espera</h4>}
                </div>
            </Box>
        </Container>
    )
}

const Container= styled.div`
    color: #FFFFFF;
    font-weight: 700;
    padding: 0;
    font-size: 30px;
    padding: 50px;
`

const Header = styled.header`
    background-color: #0D4B9C;
    width: calc(100vw - 20px);
    display:flex;
    justify-content: space-between;
    margin: 0;
    height: auto;
    position: fixed;
    left: 0;
    top: 0;
    padding: 0 10px;
    font-size: 23px;

    P{
        display:flex;
        align-items: center;
    }

    button{
        background-color: transparent;
        color: #FFFFFF;
    }
` 

const Box = styled.div`
    background-color: ${p => p.color};
    width: 60vw;
    height: 25vh;
    border-radius: 10px;
    overflow: scroll;

    p{
        margin: 0px;
    }
    div{
        margin: 20px;
        height: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    h4{
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`