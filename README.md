# :stethoscope: Sistema Web Simple para uma UBS :computer:



![eua](https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/22px-Flag_of_the_United_States.svg.png) Simple UBS Web System: Project been made aiming to apply agile methods, requirements engineering and others subjects related to the course of Projects and Software Engineering of my Computer Engineed Degree taught at the Universidade Federal do Rio Grande do Norte.

![brasil](https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/22px-Flag_of_Brazil.svg.png) Sistema UBS Web Simples: Projeto realizado visando a aplicação de métodos ágeis, engenharia de requisitos e outras disciplinas relacionadas ao curso de Projetos e Engenharia de Software do curso de Engenharia de Computação da Universidade Federal do Rio Grande do Norte.


## Requisitos

### :dart: First Use Case Diagram

<center><img width="800" src="Img/first_use_case_diagram.png"></center>

#### :pencil: Descrição dos Casos de Uso
---
> Paciente :raising_hand:

***Solicitar atendimento*** <br>
***Ator:*** *Paciente* <br>
***Fluxo normal***: <br>
*1 - Paciente inicia nova solicitação de atendimento ao chegar na UBS, via painel central.* <br>
*2 - Sistema pergunta ao paciente qual área relacionada com sua queixa.* <br>
*3 - Sistema pergunta qual tipo de preferência de atendimento do paciente.* <br>
*4 - Paciente efetua conclusão da solicitação.* <br>
*5 - Sistema informa ao paciente uma senha de solicitação* <br>
*6 - Sistema notifica recepção de sobre uma nova solicitação de atendimento.* <br>

---
> Recepção :technologist:

***Chamar Paciente*** <br>
**Pré-Condição:** *Autentica Profissional*
***Ator:*** *Recepção* <br>
***Fluxo normal:*** <br>
*1 - Sistema informa fila de solicitações a recepção*<br>
*2 - Recepção seleciona solicitação*<br>
*3 - Sistema informa solicitação selecionada aos pacientes*<br>
*4 - Sistema pergunta Recepção se paciente veio*<br>
*5 - Sistema exclui solicitação*<br>
***Extensões:***<br>
*4a - Se paciente vier, sistema segue para cadastro*<br>


***Realizar Cadastro de Paciente**<br>
**Pré-Condição:** *Autentica Profissional*
**Ator:** Recepção<br>
**Fluxo normal:**<br>
1 - Chamar paciente (Sublinhado) <br>
2 - Recepção informa nome do paciente e CPF ao sistema<br>
3 - Sistema verifica se paciente está na lista de atendidos<br>
4 - Sistema deve efetuar novo cadastro ou editar existente<br>
5 - Recepção informa dados do paciente ao sistema (Data de Nascimento, Logradouro, Telefone, Email)<br>
6 - Recepção conclui cadastramento.<br>
7 - Sistema move paciente para lista de não atendidos (Atualiza Status).<br>
8 - Sistema notifica Enfermagem sobre novo paciente.*<br>

---
> Enfermagem :health_worker:

***Chamar Paciente na lista de Não Atendidos**<br>
**Pré-Condição:** *Autentica Profissional*
**Ator:** Enfermagem<br>
**Fluxo normal:**<br>
1 - Sistema Informa Lista de pacientes Não atendidos<br>
2 - Enfermagem seleciona paciente<br>
3 - Sistema informa paciente selecionada aos pacientes<br>
**Extensões:**<br>
3a - Sistema deve chamar paciente por nome*<br>


***Cadastrar prontuário**<br>
**Pré-Condição:** *Autentica Profissional*
**Ator:** Enfermagem<br>
**Fluxo normal:**<br>
1 - Chamar Paciente na lista de Não Atendidos<br>
2 - Sistema pergunta a Enfermagem se paciente veio<br>
3 - Enfermagem abre novo prontuário para paciente<br>
4 - Enfermagem realiza Triagem (Anamnese, Classificação das cores etc.)<br>
5 - Enfermagem conclui Triagem.<br>
6 - Sistema conclui cadastramento de novo prontuário<br>
**Extensões:**<br>
1a - Se paciente não vier sistema move para lista de “Atendidos” (atualiza status)<br>
2a - Novo prontuário deve ter característica única do dia*<br>

***Encaminhar Paciente**<br>
**Pré-Condição:** *Autentica Profissional*
**Ator:** Enfermagem<br>
**Fluxo normal:**<br>
1 - Cadastrar Prontuário<br>
2 - Sistema pergunta enfermagem setor de atendimento do paciente<br>
3 - Sistema encaminha paciente para lista de pacientes “Em atendimento” (atualiza status)<br>
4 - Sistema notificar medicina sobre novo paciente “Em atendimento”*<br>

---
> Medicina :medical_symbol:

***Chamar paciente na Lista de “Em atendimento”**<br>
**Pré-Condição:** *Autentica Profissional*
**Ator:** Medicina<br>
**Fluxo normal:**<br>
1 - O médico acessa o sistema e seleciona a lista de pacientes que aguardam atendimento.<br>
2 - O médico identifica o próximo paciente na lista de espera e chama-o pelo nome ou número de cadastro.<br>
3- O paciente se apresenta ao médico para receber o atendimento necessário.<br>
**Extensões:**<br>
1a - Caso o paciente não esteja presente no momento em que é chamado, o médico pode marcar a ausência no sistema e chamar o próximo paciente da lista<br>
3a - Se houver algum imprevisto que impeça o atendimento imediato do paciente (por exemplo, a necessidade de realizar algum procedimento antes), o médico pode registrar essa informação no sistema e informar ao paciente o tempo estimado de espera.*

***Atualizar Prontuário**<br>
**Pré-Condição:** *Autentica Profissional*
**Ator:** Medicina<br>
**Fluxo normal:**<br>
1 - O médico acessa o sistema e busca pelo prontuário do paciente que deseja atualizar.<br>
2 - O médico seleciona a opção "Atualizar prontuário" e insere as informações relevantes, tais como sintomas, diagnósticos, tratamentos prescritos e resultados de exames.<br>
3 -O médico salva as informações atualizadas no sistema.<br>
***Extensões:***<br>
1a - Caso o médico identifique algum problema no prontuário (por exemplo, informações incorretas ou incompletas), ele pode solicitar uma revisão do prontuário ou a correção dos dados necessários.*

****Concluir atendimento***<br>
**Pré-Condição:** *Autentica Profissional*
**Ator:** Medicina<br>
**Fluxo normal:**<br>
1 - O médico acessa o sistema e verifica se todas as informações relevantes foram devidamente registradas no prontuário do paciente.<br>
2 - O médico finaliza o atendimento selecionando a opção "Concluir atendimento" no sistema.<br>
3 - O sistema atualiza o status do paciente para "Atendimento concluído".<br>
**Extensões:**<br>
1a - Caso o médico identifique a necessidade de prescrever medicamentos ao paciente, ele pode selecionar a opção "Prescrever medicamentos" e inserir as informações correspondentes.*

---
> Todos

***Autenticar Profissional**<br>
**Ator:** Recepção, Enfermagem e Medicina<br>
**Fluxo normal:**<br>
1 - Sistema verifica se existe Token de autenticação para profissional<br>
2 - Sistema solicita nome de usuário<br>
3 - Sistema solicita senha<br>
4 - Sistema retorna feedback de autenticação<br>
**Extensões:**<br>
4a - Se usuário ou senha estiverem incorretos, sistema indica erro e solicita novamente*



## :bookmark_tabs: References

- [Engenharia de Software Moderna - Marco Tulio Valente](https://engsoftmoderna.info/)
- [Prof. Eduardo Falcão - Github](https://github.com/eduardolfalcao)


