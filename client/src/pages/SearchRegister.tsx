import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";


// TELA DE BUSCA DE CPF EM USUÁRIOS CADASTRADOS
export default function InitialPage(){
    const navigator = useNavigate();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ticket = urlParams.get('ticket');

    const [foundCpf, setFoundCpf] = useState<string>("");
    const [cpf, setCpf] = useState<string>("");
    
    
    const [registered, setRegistered] = useState<string>();
    

    function logOut(){
        navigator("/log-in");
    }
    
    function newRegister(ticket: string, funcCpf : string){
        navigator(`/register/?ticket=${ticket}&cpf=${funcCpf}`);
    }

    function goBack(){
        navigator("/main-page");
    }
    
    async function SearchCPF(){
        try{
            const response =  await axios.get(`http://localhost:4000/patient/${cpf}`);
            setRegistered(response.data.name)
            setFoundCpf(response.data.cpf)
        } catch (error){
            setRegistered("")
            console.log(error);
        }
    }

    return(
        <Container>
            <Header><p></p><button onClick={logOut}>Sair</button></Header>

            <Title>Buscar Cadastro:  Senha Número {ticket}</Title>

            <div>CPF: <Input type="number" size= {300}value={cpf} onChange={(e) => setCpf(e.target.value)} placeholder="" /></div>
            <button onClick={SearchCPF}>Realizar Busca</button>

            <FoundRegisters>{
                registered?<h3 onClick={() => newRegister(ticket?ticket.toString():"Erro", foundCpf)}>{registered}</h3>:
                <div><p>Nenhum Paciente encontrado</p> <u onClick={() => newRegister(ticket?ticket.toString():"", "")}>Realizar Cadastro</u></div>
            }</FoundRegisters>

            {/* <button onClick={() => newRegister(ticket?ticket.toString():"", "")}>Realizar Novo Cadastro</button> */}
            <button onClick={goBack}>Voltar</button>
            
        </Container>
    )
}

const Container= styled.div`
    color: #FFFFFF;ß
    font-weight: 700;ß
    padding: 0;
    font-size: 30px;

    display:flex;
    flex-direction: column;
    button{
        margin: 10px;
        background-color: #0D4B9C;
        color: #FFFFFF;
    }

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
    padding: 10px;
    font-size: 23px;

    button{
        background-color: transparent;
        color: #FFFFFF;
        margin: 0;
    }
` 

const Title = styled.h1`
    font-size: 32px;
    color: #FFFFFF;
    padding: 24px;
`

const Input = styled.input`
  height: auto;
  width: ${p => p.size}px;
  border: none;
  background-color: #FFFFFF;
  font-size: 20px;
  padding: 15px;
  margin: 13px;
  border-radius: 5px;
  color: #000000;
`;

const FoundRegisters= styled.div`
    color: #000000;
    background-color: #FFFFFF;
    font-size: 20px;
    border-radius: 20px;
    height: 15vh;
    width: 560px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 100px 0 20px 0;

    p{
        padding:0;
        margin:0;
    }

    u{
        cursor: pointer;
    }
`