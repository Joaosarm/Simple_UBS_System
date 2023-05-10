package main

import (
	"database/sql"
	"fmt"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	_ "github.com/lib/pq"
)

//INFOS PARA POSTGRES
// const (
// 	host     = "localhost"
// 	port     = 5432
// 	user     = "postgres"
// 	password = "postgres"
// 	dbname   = "ubs"
// )

// STRUCT TO CREATE USERS
type worker struct {
	Username   string `json:"username"`
	Password   string `json:"password"`
	Department int    `json:"department"`
}

// STRUCT TO CHECK USER EXISTANCE AND PASSWORD
type logIn struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

// STRUCT TO RETURN LOGIN DATA
type logInReturningInfos struct {
	Username   string `json:"username"`
	Department int    `json:"department"`
}

type Patient struct {
	ID            int    `json:"id"`
	Name          string `json:"name"`
	CPF           string `json:"cpf"`
	Date_Of_Birth string `json:"date_of_birth"`
	Address       string `json:"address"`
	Phone         string `json:"phone"`
	Email         string `json:"email"`
}

type MedicalRecord struct {
	ID            int    `json:"id"`
	PatientID     string `json:"patient_id"`
	Date          string `json:"date"`
	Allergy       string `json:"allergy"`
	MainComplaint string `json:"main_complaint"`
	MedicalNote   string `json:"medical_note"`
}

func main() {
	// Conectando-se ao banco de dados MySQL
	db, err := sql.Open("mysql", "root:BDt#30_01@tcp(127.0.0.1:3306)/ubs_system_db")
	if err != nil {
		panic(err.Error())
	}
	fmt.Println("Conectado ao banco de dados com sucesso!")
	defer db.Close()

	//===============================
	// Conectando-se ao banco de dados Postgres

	// psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
	// 	"password=%s dbname=%s sslmode=disable",
	// 	host, port, user, password, dbname)

	// db, err := sql.Open("postgres", psqlInfo)
	// if err != nil {
	// 	panic(err)
	// }
	// defer db.Close()

	// err = db.Ping()
	// if err != nil {
	// 	panic(err)
	// }

	// fmt.Println("Successfully connected!")

	//============================

	// Criação de um objeto Echo
	e := echo.New()

	// Middleware para tratar erros
	e.Use(middleware.Recover())

	// Inicio servidor Echo
	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World!")
	})

	//// CRIAÇÃO DE TICKET E ARRAYS DE TICKETS - PREFERENCIAL E REGULAR

	ticket := 0

	var preferentialTickets []int
	var regularTickets []int

	//////////////////////////////////////////////////////////
	// 		   FUNÇOES DE ENVIO DE TICKET PARA BACK         //
	//////////////////////////////////////////////////////////

	//ENVIA REQUISIÇÃO DE NOVO TICKET - PREFERENCIAL
	e.POST("/preferential-ticket", func(context echo.Context) error {

		ticket = ticket + 1
		preferentialTickets = append(preferentialTickets, ticket)

		return context.JSON(http.StatusOK, ticket)
	})

	//ENVIA REQUISIÇÃO DE NOVO TICKET - PREFERENCIAL
	e.POST("/regular-ticket", func(context echo.Context) error {

		ticket = ticket + 1
		regularTickets = append(regularTickets, ticket)

		return context.JSON(http.StatusOK, ticket)
	})

	//////////////////////////////////////////////////////////
	// 		   FUNÇOES DE RESGATE DE TICKETS DO BACK        //
	//////////////////////////////////////////////////////////

	// DEVOLVE ARRAY DE TICKETS - PREFERENCIAL
	e.GET("/preferential-ticket", func(context echo.Context) error {
		return context.JSON(http.StatusOK, preferentialTickets)
	})

	//DEVOLVE ARRAY DE TICKETS - REGULAR
	e.GET("/regular-ticket", func(context echo.Context) error {
		return context.JSON(http.StatusOK, regularTickets)
	})

	//////////////////////////////////////////////////////////
	// 		   FUNÇOES PARA LIDAR COM USUARIOS.             //
	//////////////////////////////////////////////////////////

	//CRIA NOVO USUÁRIO
	e.POST("/new-user", func(context echo.Context) error {
		var newUser worker

		context.Bind(&newUser)

		sqlStatement := `
		INSERT INTO users (username, password, department)
		VALUES (?, ?, ?)`

		_, err = db.Exec(sqlStatement, newUser.Username, newUser.Password, newUser.Department)
		if err != nil {
			return err
		}

		return context.NoContent(201)
	})

	//PROCURA USUÁRIO E CHECA SE A SENHA ESTA CORRETA
	e.POST("/log-in", func(context echo.Context) error {
		var newLogIn logIn
		var username string
		var password string
		var department int

		context.Bind(&newLogIn)

		row := db.QueryRow("SELECT username, password, department FROM users WHERE username= ?", newLogIn.Username)

		row.Scan(&username, &password, &department)
		if row == nil || password != newLogIn.Password {
			return context.NoContent(400)
		}

		logInReturn := &logInReturningInfos{username, department}

		return context.JSON(http.StatusOK, logInReturn)
	})

	//////////////////////////////////////////////////////////
	// 		   CRIA PACIENTE NOVO NO BANCO DE DADOS         //
	//////////////////////////////////////////////////////////

	// Handler (Lida com as rotas) para criar um novo paciente
	e.POST("/CreatePatient", func(c echo.Context) error {
		// Passa o json data e o metodo bind para o objeto paciente
		p := &Patient{
			Name:          c.FormValue("name"),
			CPF:           c.FormValue("cpf"),
			Date_Of_Birth: c.FormValue("date_of_birth"),
			Address:       c.FormValue("address"),
			Phone:         c.FormValue("phone"),
			Email:         c.FormValue("email"),
		}
		if err := c.Bind(p); err != nil {
			return err
		}

		fmt.Println("Paciente sendo criado...")
		fmt.Println("Informações do paciente: ", p.Name, p.CPF, p.Date_Of_Birth, p.Address, p.Phone, p.Email)

		// Inserindo um novo paciente no banco de dados
		// Exec aqui funciona para Insert, Update e Delete
		res, err := db.Exec("INSERT INTO patient_data(name, cpf, date_of_birth, address, phone, email) VALUES (?, ?, ?, ?, ?, ?)",
			p.Name, p.CPF, p.Date_Of_Birth, p.Address, p.Phone, p.Email)
		if err != nil {
			return err
		}

		// Obtendo o ID do paciente recém-criado
		id, err := res.LastInsertId()
		if err != nil {
			return err
		}

		p.ID = int(id)
		fmt.Println("ID do novo paciente: ", p.ID)
		return c.String(http.StatusOK, "Paciente criado com sucesso!")
	})

	//////////////////////////////////////////////////////////
	// 		   VERIFICAR PACIENTE NO BANDO DE DADOS         //
	//////////////////////////////////////////////////////////

	// Handler para buscar informações de um paciente
	e.GET("/patient/:cpf", func(c echo.Context) error {
		cpf := c.Param("cpf")
		fmt.Println("Recebido CPF: ", cpf)
		// Selecionando as informações de um paciente no banco de dados
		row := db.QueryRow("SELECT * FROM patient_data WHERE cpf = ?", cpf)

		fmt.Println("Query criada...")
		p := new(Patient)
		err := row.Scan(&p.ID, &p.Name, &p.CPF, &p.Date_Of_Birth, &p.Address, &p.Phone, &p.Email)
		if err != nil {
			return err
		}

		// Verificando se o paciente existe
		if p.ID == 0 {
			return c.JSON(http.StatusNotFound, "paciente não encontrado")
		}

		return c.JSON(http.StatusOK, p)
	})

	//////////////////////////////////////////////////////////
	// CRIA NOVO PRONTUARIO PARA PACIENTE NO BANDO DE DADOS //
	//////////////////////////////////////////////////////////

	// Handler para criar um novo prontuário médico
	e.POST("/medical-records", func(c echo.Context) error {
		mr := &MedicalRecord{
			PatientID:     c.FormValue("patient_id"),
			Date:          c.FormValue("date"),
			Allergy:       c.FormValue("allergy"),
			MainComplaint: c.FormValue("main_complaint"),
			MedicalNote:   c.FormValue("medical_note"),
		}
		if err := c.Bind(mr); err != nil {
			return err
		}

		fmt.Println("Prontuario medico sendo criado para paciente de id: ", mr.PatientID)
		fmt.Println("Informações do prontuario medico: ", mr.Date, mr.Allergy, mr.MainComplaint, mr.MedicalNote)

		// Inserindo um novo prontuário médico no banco de dados
		res, err := db.Exec("INSERT INTO medical_records(patient_id, date, allergy, complaint, medical_note) VALUES (?, ?, ?, ?, ?)", mr.PatientID, mr.Date, mr.Allergy, mr.MainComplaint, mr.MedicalNote)
		if err != nil {
			return err
		}

		mr_id, err := res.LastInsertId()
		if err != nil {
			return err
		}

		mr.ID = int(mr_id)
		fmt.Println("ID do novo prontuario medico: ", mr.ID)
		return c.JSON(http.StatusOK, "Prontuario medico criado com sucesso")
	})

	////////////////////////////////////////////////////////////////
	//   VERIFICAR PRONTUARIO DO PACIENTE _X_ NO BANDO DE DADOS   //
	////////////////////////////////////////////////////////////////

	// Handler para buscar prontuários médicos de um paciente
	e.GET("/patients/:id/medical-records", func(c echo.Context) error {

		id := c.Param("id")
		// Selecionando os prontuários médicos de um paciente no banco de dados
		rows, err := db.Query("SELECT * FROM medical_records WHERE patient_id = ?", id)
		if err != nil {
			fmt.Println("Erro ao buscar prontuarios medicos do paciente de id: ", id)
			return err
		}
		defer rows.Close()

		fmt.Println("Prontuarios medicos do paciente de id: ", id)

		mrs := []MedicalRecord{}
		for rows.Next() {
			mr := MedicalRecord{}
			err := rows.Scan(&mr.ID, &mr.PatientID, &mr.Date, &mr.Allergy, &mr.MainComplaint, &mr.MedicalNote)
			if err != nil {
				return err
			}
			mrs = append(mrs, mr)
		}

		return c.JSON(http.StatusOK, mrs)
	})

	// Iniciando o servidor Echo
	e.Logger.Fatal(e.Start(":4000"))
}
