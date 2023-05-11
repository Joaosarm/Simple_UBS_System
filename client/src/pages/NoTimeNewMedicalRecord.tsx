import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


// TELA DE NOVO PRONTUÁRIO
export default function NewMedicalRecord(){
    const navigator = useNavigate();

    const [pressure, setPressure] = useState<string>("");
    const [temperature, setTemperature] = useState<string>("");
    const [weight, setWeight] = useState<string>("");
    const [complains, setComplains] = useState<string>("");
    const [alergies, setAlergies] = useState<string>("");
    const [medicalHistory, setMedicalHistory] = useState<string>("");
    const [familyHistory, setFamilyHistory] = useState<string>("");
    const [medicationsInUse, setMedicationsInUse] = useState<string>("");
    const [vaccines, setVaccines] = useState<boolean>();
    const [pendentVaccines, setPendentVaccines] = useState<string>("");
    const [specificSymptoms, setSpecificSymptoms] = useState<string>("");
    const [riskClassification, setRiskClassification] = useState<string>("");
    
    console.log(vaccines, riskClassification)

    function logOut(){
        navigator("/log-in");
    }
    
    function goBack(){
        navigator("/medical-records");
    }
    
    function registerMedicalRecord(){
        //TO DO: FINALIZAR REGISTRO - POST
    }

    return(
        <Container>
            <Header><p></p><button onClick={logOut}>Sair</button></Header>

            <Infos>
                <div className="row">
                    <div className="column"> <p>Pressão:</p> <Input type="text" size={100} value={pressure} onChange={(e) => setPressure(e.target.value)} placeholder={""} /> </div>
                    <div className="column"><p>Temperatura:</p> <Input type="text" size={100} value={temperature} onChange={(e) => setTemperature(e.target.value)} placeholder="" /></div>
                    <div className="column"><p>Peso:</p> <Input type="text" size={100} value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="" /></div>
                </div>
                <div>Queixas: <Input type="text" size={650} value={complains} onChange={(e) => setComplains(e.target.value)} placeholder="" /></div>
                <div>Alergias: <Input type="text" size={652} value={alergies} onChange={(e) => setAlergies(e.target.value)} placeholder="" /></div>
                <div>Histórico Médico: <Input type="text" size={537} value={medicalHistory} onChange={(e) => setMedicalHistory(e.target.value)} placeholder="" /></div>
                <div>Histórico Familiar: <Input type="text" size={535} value={familyHistory} onChange={(e) => setFamilyHistory(e.target.value)} placeholder="" /></div>
                <div>Medicamentos em Uso: <Input type="text" size={460}  value={medicationsInUse} onChange={(e) => setMedicationsInUse(e.target.value)} placeholder="" /></div>
                <div className="row">
                    <div className="vaccines">
                        <p>Vacinas:</p>
                        <Input type="checkbox" onChange={() => setVaccines(true)} value={1}/>Sim
                        <Input type="checkbox"  onChange={() => setVaccines(false)} value={0}/>Não
                    </div>
                    <div>Pendente: <Input type="text" size={334} value={pendentVaccines} onChange={(e) => setPendentVaccines(e.target.value)} placeholder="" /></div>
                </div>
                <div>Sintomas Específicos: <Input type="text" size={481} value={specificSymptoms} onChange={(e) => setSpecificSymptoms(e.target.value)} placeholder="" /></div>
                <div className="risk">
                    <p>Classificação de Risco:</p>
                    <Input className="checkbox" type="checkbox" onChange={(e) => setRiskClassification(e.target.value)} value={"Azul"}/>Azul
                    <Input className="checkbox" type="checkbox" onChange={(e) => setRiskClassification(e.target.value)} value={"Verde"}/>Verde
                    <Input className="checkbox" type="checkbox" onChange={(e) => setRiskClassification(e.target.value)} value={"Amarelo"}/>Amarelo
                    <Input className="checkbox" type="checkbox" onChange={(e) => setRiskClassification(e.target.value)} value={"Vermelho"}/>Vermelho
                </div>
            </Infos>
            <button onClick={registerMedicalRecord}>Finalizar Cadastro</button>
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
    p{
        margin:0;
    }
    input{
        margin-bottom: 20px;
    }   
     .column > input, .column>p{
        margin-right:30px;
    }
    .colum{
        display: flex;
        flex-direction: column;
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