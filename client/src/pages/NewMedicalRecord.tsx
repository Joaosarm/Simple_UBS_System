import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";


// TELA DE NOVO PRONTUÁRIO
export default function NewMedicalRecord(){
    const navigator = useNavigate();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const pName = urlParams.get('name');

    const [date, setDate] = useState<string>("");
    const [complains, setComplains] = useState<string>("");
    const [allergy, setAllergy] = useState<string>("");
    const [notes, setNotes] = useState<string>("");

    console.log({complains});

    function logOut(){
        navigator("/log-in");
    }
    
    function goBack(){
        navigator("/medical-records");
    }
    
    function registerMedicalRecord(){
        try {
            axios.post("http://localhost:4000/medical-records", {patient_name: pName, date, allergy,  main_complaint: complains, medicalNote: notes});
            navigator("/medical-records")
        } catch (error) {
            console.log(error);
            alert("Erro ao enviar informaçoes!");
        }
    }

    return(
        <Container>
            <Header><p></p><button onClick={logOut}>Sair</button></Header>

            <Infos>
                <h3>Paciente: {pName}</h3>
                <div><p>Data:</p> <Input type="date" size={150} value={date} onChange={(e) => setDate(e.target.value)} placeholder="" /></div>
                <div>Queixa: <Input value={complains} size={665} onChange={(e) => setComplains(e.target.value)} placeholder="" /></div>
                <div>Alergias: <Input type="text" size={652} value={allergy} onChange={(e) => setAllergy(e.target.value)} placeholder="" /></div>
                <div className="center">Anotações: <TextArea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="" /></div>
            </Infos>
            <button onClick={registerMedicalRecord}>Finalizar Prontuário</button>
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
        background-color: #0D4B9C;
        color: #FFFFFF;
        margin: 15px;
    }

    .checkbox{
        margin: 0;
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

  const Infos = styled.div`
    text-align: left;
    margin-top: 100px;
    h3{
        margin: 0 0 15px 0;
        padding: 0;
        font-size: 32px;
        color: rgb(237, 158, 106);
    }
    p{
        margin:0;
    }
    input{
        margin: 0 0 20px 5px;;
    }   
    div{
        display: flex;
    }
     .column > input, .column>p{
        margin-right:30px;
    }
    .row, .vaccines{
        display: flex;
    }
    .vaccines{
        margin-right: 20px;
        p{
            margin-right: 10px;
        }
        input{
            margin-left: 10px;
        }
    }

    .risk{
        display:flex;
        align-items: center;
        justify-content: space-around;
    }

    .center{
        display:flex;
    }
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

const TextArea = styled.textarea`
  height: auto;
  min-height: 80px;
  width: 620px;
  border: none;
  background-color: #FFFFFF;
  font-size: 16px;
  padding: 15px;
  margin: 0 0 13px 5px;
  border-radius: 5px;
  color: #000000;
`;