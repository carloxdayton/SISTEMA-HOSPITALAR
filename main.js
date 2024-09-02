const readline = require('readline')

class Paciente {
    constructor(nome, idade, genero, contato) {
        this.nome = nome;
        this.idade = idade;
        this.genero = genero;
        this.contato = contato;
        this.pacienteId = null
    }
}

class SistemaRegistroHospital {
    constructor() {
        this.pacientes = new Map()
        this.IdProximoPaciente = 1
    }

    registroPaciente(paciente) {
        paciente.pacienteId = this.IdProximoPaciente
        this.pacientes.set(this.IdProximoPaciente, paciente)
        this.IdProximoPaciente++
        return paciente.pacienteId
    }

    informacaoPaciente(pacienteId) {
        return this.pacientes.get(pacienteId)
    }

    atualizarPaciente(pacienteId, updates) {
        if (this.pacientes.has(pacienteId)) {
            const paciente = this.pacientes.get(pacienteId)
            Object.assign(paciente, updates)
            return true
        }
        return false
    }

    removerPaciente(pacienteId) {
        return this.pacientes.delete(pacienteId)
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const sistemaHospital = new SistemaRegistroHospital()

function promptUser() {
    console.log('\nSistema de Registro do Hospital')
    console.log('1. Registrar novo paciente')
    console.log('2. Pegar informações do paciente')
    console.log('3. Atualizar informações do paciente')
    console.log('4. Remover paciente')
    console.log('5. Exit')

    rl.question('Escolha a ação que deseja utilizar (1-5): ', (escolha) => {
        handleUserInput(escolha)
    })
}

function handleUserInput(escolha) {
    switch (escolha) {
        case '1':
            registroPaciente()
            break;
        case '2':
            informacaoPaciente()
            break;
        case '3':
            atualizarPaciente()
            break;
        case '4':
            removerPaciente()
            break;
        case '5':
            console.log('Obrigado por utilizar o sistema do hospital. Até mais!')
            rl.close()
            break
        default:
            console.log('Escolha inválida. Por favor tente novamente.')
            promptUser()
    }
}

function registroPaciente() {
    rl.question('Nome do paciente: ', (nome) => {
        rl.question('Idade do paciente: ', (idade) => {
            rl.question('Gênero do paciente: ', (genero) => {
                rl.question('Contato do paciente: ', (contato) => {
                    const novoPaciente = new Paciente(nome, parseInt(idade), genero, contato)
                    const pacienteId = sistemaHospital.registroPaciente(novoPaciente)
                    console.log(`Paciente registado com sucesso. ID do paciente: ${pacienteId}`)
                    promptUser()
                })
            })
        })
    })
}

function informacaoPaciente() {
    rl.question('Digite o ID do paciente: ', (pacienteId) => {
        const paciente = sistemaHospital.informacaoPaciente(parseInt(pacienteId))
        if (paciente) {
            console.log(`Nome: ${paciente.nome}, Idade: ${paciente.idade}, Gênero: ${paciente.genero}, Contato: ${paciente.contato}`)
        } else {
            console.log('Paciente não encontrado')
        }
        promptUser()
    })
}

function atualizarPaciente() {
    rl.question('Digite o ID do paciente: ', (pacienteId) => {
        rl.question('Escolha o campo para alterar (nome/idade/genero/contato): ', (campo) => {
            rl.question('Digite o novo valor: ', (valor) => {
                const atualizar = {}
                atualizar[campo] = campo === 'idade' ? parseInt(valor) : valor
                if (sistemaHospital.atualizarPaciente(parseInt(pacienteId), atualizar)) {
                    console.log('As informações do paciente foram atualizadas!')
                } else {
                    console.log('Paciente não encontrado')
                }
                promptUser()
            })
        })
    })
}

function removerPaciente() {
    rl.question('Digite o ID do paciente: ', (pacienteId) => {
        if (sistemaHospital.removerPaciente(parseInt(pacienteId))) {
            console.log('Paciente removido!')
        } else {
            console.log('Paciente não encontrado!')
        }
        promptUser();
    })
}

promptUser();