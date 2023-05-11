import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


// TELA DE REGISTO DE USUÁRIO
export default function InitialPage() {
    const navigator = useNavigate();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ticket = urlParams.get('ticket');
    const cpfNumber = urlParams.get('cpf');
    const ticketNumber = ticket ? parseInt(ticket) : 0;

    //TO DO: PEGAR INFORMAÇÕES DO REGISTRO
    const [name, setName] = useState<string>("");
    const [cpf, setCpf] = useState<string>("");
    const [birthDate, setBirthDate] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    if (cpfNumber) {
        useEffect(() => {
            (async () => {
                try {
                    const response =  await axios.get(`http://localhost:4000/patient/${cpfNumber}`);
                    setName(response.data.name)
                    setCpf(response.data.cpf)
                    setBirthDate(response.data.date_of_birth)
                    setAddress(response.data.address)
                    setPhone(response.data.phone)
                    setEmail(response.data.email)
                } catch (e) {
                }
            })();
        }, [])
    }

    function logOut() {
        navigator("/log-in");
    }

    function goBack() {
        navigator("/main-page");
    }

    async function register() {
        try {
            axios.post("http://localhost:4000/CreatePatient", { name, cpf, date_of_birth: birthDate, address, phone, email });
            axios.put("http://localhost:4000/ticket", { ticket: ticketNumber })
            navigator("/main-page")
        } catch (error) {
            console.log(error);
            alert("Erro ao realizar cadastro!");
        }
    }

    return (
        <Container>
            <Header><p></p><button onClick={logOut}>Sair</button></Header>

            <Title>Realizar Cadastro:  Senha Número {ticket}</Title>

            <Infos>
                <div> Nome: <Input type="text" value={name} onChange={(e) => setName(e.target.value)} size={350} placeholder={""} /> </div>
                <div>CPF: <Input type="number" value={cpf} onChange={(e) => setCpf(e.target.value)} placeholder="" /></div>
                <div>Data de Nascimento: <Input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} placeholder="" /></div>
                <div>Logradouro: <Input type="string" size={350} value={address} onChange={(e) => setAddress(e.target.value)} placeholder="" /></div>
                <div>Telefone: <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="" /></div>
                <div>E-mail: <Input type="string" size={300} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="" /></div>
            </Infos>
            <button onClick={register}>Finalizar Cadastro</button>
            <button onClick={goBack}>Voltar</button>

        </Container>
    )
}

const Container = styled.div`
    color: #FFFFFF;ß
    font-weight: 700;ß
    padding: 0;
    font-size: 30px;

    display:flex;
    flex-direction: column;

    button{
        background-color: #0D4B9C;
        color: #FFFFFF;
        margin: 15px;
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

const Infos = styled.div`
    text-align: left;
  `

const Input = styled.input`
  height: auto;
  width: ${p => p.size}px;
  border: none;
  background-color: #FFFFFF;
  font-size: 20px;
  padding: 15px;
  margin-bottom: 13px;
  border-radius: 5px;
  color: #000000;
`;