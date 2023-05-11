import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { TicketContext } from "../context/ticketContext";

export default function TicketNumber(){
    const {ticket} = useContext(TicketContext);
    const navigator = useNavigate();

    function navigate(){
        navigator("/");
    }

    return(
        <Container>
            <p>SENHA NÚMERO:</p>
            <h1>{ticket}</h1>
            <Button onClick={navigate}>voltar</Button>
        </Container>
    )
}

const Container= styled.div`
    color: #FFFFFF;
    font-weight: 700;

    h1{
        font-size: 200px;
        margin:20px 0;
    }

    p{
        margin:0;
        font-size: 30px;
    }
`

const Button = styled.button`
    background-color: #FFFFFF;
    color: #000000;
    font-size: 30px;
    font-weight: 700;
    margin-top: 70px;
    box-shadow: 5px 5px 5px rgb(61, 44, 31);
`