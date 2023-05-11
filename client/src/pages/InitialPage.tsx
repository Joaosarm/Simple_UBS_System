import styled from "styled-components";
import { useNavigate } from "react-router-dom";


// PRIMEIRA TELA
export default function InitialPage(){
    const navigator = useNavigate();

    function navigate(){
        navigator("/service-type");
    }

    return(
        <Container>
            {/* BOTÃO INICIAL PARA COMEÇAR O ATENDIMENTO */}
            <Button onClick={navigate}>INICIAR ATENDIMENTO</Button>
        </Container>
    )
}

const Container = styled.div`
`

const Button = styled.button`
    background-color: #D6860E;
    color: #FFFFFF;
    font-size: 70px;
    font-weight: 700;
    width: 50vw;
    height: 40vh;
    box-shadow: 5px 5px 5px rgb(61, 44, 31);
`