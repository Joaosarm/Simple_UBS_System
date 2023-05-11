import styled from "styled-components";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/userContext";

export default function LogIn(){
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const {setDepartment, setUsername} = useContext(UserContext);

    const navigator = useNavigate();

    async function login(){
        // ENVIAR REQUISIÇÃO DE USUÁRIO, RETORNANDO NOME E TIPO DE USUÁRIO
        try {
            const response = await axios.post("http://localhost:4000/log-in", {username: user,password});
            setUsername(response.data.username);
            setDepartment(response.data.department);
            if(response.data.department == 1){
                navigator("/main-page");
            } else if(response.data.department == 2||response.data.department == 3){
                navigator("/medical-records");
            } else{
                throw new Error('Unconfigured user!')
            }
          } catch (error){
            console.log(error);
            alert("Username ou senha errado!");
          }

    }

    return(
        <Container>
            <Title>UBS System</Title>
            <input type="text" value={user} onChange={(e) => setUser(e.target.value)} placeholder="Username" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" />
            <button onClick={login}>Entrar</button>
        </Container>
    )
}

const Container = styled.div`
    color: #FFFFFF;
    font-weight: 700;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;

    input{
        margin: 10px;
        height: 30px;
        width: 290px;
        font-size: 18px;
        text-align: center;
        border-radius: 6px;

    }

    button{
        width: 300px;
        background-color: #0D4B9C;
        color: #FFFFFF;
    }

`;

const Title = styled.h1`
    font-size: 50px;
    margin: 0 0 20px 0;
    padding: 0;
`