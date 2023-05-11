import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import axios from "axios";


// TELA DA ENFERMARIA -> PÁGINA COM OS PRONTUÁRIOS DE PACIENTES EM ATENDIMENTO
export default function MedicalRecords(){
    const navigator = useNavigate();
    const [inAttendance, setInAttendance] = useState<string[]>([]); 
    const {username, department} = useContext(UserContext);

    //TO DO: CARREGAR PRONTUARIOS DE PACIENTES EM ATENDIMENTO - department

    useEffect(() => {
        (async () => {
            try {
                setTimeout(async () => {
                const response = await axios.get(`http://localhost:4000/patients/waiting/${department-1}`)
                setInAttendance(response.data)
            },100
            )
            } catch (e) {
                alert("Erro ao receber dados");
            }
        })();
    }, [])

    function logOut(){
        navigator("/log-in");
    }
    
    function newRecord(pName: string){
        navigator(`/new-medical-record/?name=${pName}`);
    }

    return(
        <Container>
            <Header><p>Bem-Vindo, {username}</p> <button onClick={logOut}>Sair</button></Header>

            <Pacients>{
                inAttendance.length>0?inAttendance.map(pName => <Box>
                    <p>{pName}</p>
                    <button onClick={() =>newRecord(pName)}> Novo Prontuário</button>
                    </Box>):
                <p>Nenhum Paciente encontrado</p>
            }</Pacients>
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
    Z-index: 1;

    P{
        display:flex;
        align-items: center;
    }

    button{
        background-color: transparent;
        color: #FFFFFF;
    }
` 

const Pacients = styled.div`
    margin: 80px;
`

const Box = styled.div`
    padding-bottom: 30px;
    height: auto;
    width: 500px;
    background-color: orange;
    color: #000000;
    margin: 15px;
    font-size: 20px;
    position: relative;
    p{
        height: auto;
        background-color: rgb(255, 84, 0);
        text-align: left;
        padding: 5px 0 5px 15px;
    }
    button{
        position: absolute;
        font-weight: 700;
        right: 5px;
        bottom: 5px;
        background-color: rgb(70, 160, 6);
        font-size: 11px;
        height: auto;
        width: auto;
    }
`