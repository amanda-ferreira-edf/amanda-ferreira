import { QuestsDTO, TypeResponse } from "../models/questsDTO";


// export const questsMock: QuestsDTO[] = [
//     {
//         id: 1,
//         title: 'Seu Nome?',
//         typeResponse: TypeResponse.text,
//     },
//     {
//         id: 2,
//         title: 'Sua data de nascimento?',
//         typeResponse: TypeResponse.date,

//     },
//     {
//         id: 3,
//         title: 'Você pratica exercício físico? Se sim, qual e com que frequência?',
//         typeResponse: TypeResponse.text,
//     },
//     {
//         id: 4,
//         title: 'Você tem algum desses sintomas quando faz exercícios?',
//         typeResponse: TypeResponse.text,
//         multipleChoice: true,
//         choices: ['Tontura', 'Enjôo', 'Mal estar', 'Dor no peito', 'Falta de ar', 'nenhum dos anteriores'],
//     },
//     {
//         id: 5,
//         title: 'Você faz quantas refeições por dia?',
//         typeResponse: TypeResponse.number,
//     },
//     {
//         id: 6,
//         title: 'Você bebe quantos litros de água por dia, aproximadamente?',
//         typeResponse: TypeResponse.number,
//     },
//     {
//         id: 7,
//         title: 'Você faz alguma dieta ou suplementação?',
//         typeResponse: TypeResponse.boolean,
//     },
//     {
//         id: 8,
//         title: 'Você consome bebidas alcóolicas? Com que frequência?',
//         typeResponse: TypeResponse.text,
//     },
//     {
//         id: 9,
//         title: 'Você fuma ou já fumou? Se sim, com que frequência?',
//         typeResponse: TypeResponse.text,
//     },
//      {
//         id: 10,
//         title: 'Você costuma dormir quantas horas por noite?',
//         typeResponse: TypeResponse.text,
//     },
//     {
//         id: 11,
//         title: 'Com o que você trabalha?',
//         typeResponse: TypeResponse.text,
//     },
//     {
//         id: 12,
//         title: 'Você passa muito tempo em repouso?',
//         subtitle: 'Em posição sentada ou deitada',
//         typeResponse: TypeResponse.text,
//     },
//     {
//         id: 13,
//         title: 'Você tem ciclo menstrual presente e regular?',
//         typeResponse: TypeResponse.boolean,
//     },
//     {
//         id: 14,
//         title: 'Você usa algum aplicativo para monitorar seu ciclo?',
//         typeResponse: TypeResponse.boolean,
//     },
//     {
//         id: 15,
//         title: 'Você sente mais indisposição ou desmotivação para treinar em alguma fase do seu ciclo menstrual? Se sim, em qual?',
//         typeResponse: TypeResponse.text,
//     },
//     {
//         id: 16,
//         title: 'Você tem hipertensão, diabetes, ou alguma outra doença?',
//         subtitle :'caso a resposta seja "sim", descrever o tipo da doença em "outro"',
//         typeResponse: TypeResponse.text,
//         multipleChoice: true,
//         choices: [
//             'Hipertensão',
//             'Diabetes',
//             'Problemas respiratórios',
//             'Doença cardiovascular',
//             'Alterações cardíacas',
//             'Nenhuma doença',
//         ]
//     },
//     {
//         id: 17,
//         title: 'Você fez exame de sangue nos últimos 3 meses?',
//         typeResponse: TypeResponse.boolean,
//     },
//     {
//         id: 18,
//         title: 'Dentro dos últimos 3 meses, esteve com o colesterol alto? Se sim, qual o valor?',
//         subtitle: 'Aparece no exame de sangue como HDL e LDL',
//         typeResponse: TypeResponse.text,
//     },
//     {
//         id: 19,
//         title: 'Possui histórico de colesterol alto na família? Se sim, qual o grau de parentesco?',
//         typeResponse: TypeResponse.text,
//     },
//     {
//         id: 20,
//         title: 'Tem histórico de sobrepeso na família? Se sim, qual o grau de parentesco?',
//         typeResponse: TypeResponse.text,
//     },
//     {
//         id: 21,
//         title: 'Você foi uma criança ou adolescente com sobrepeso?',
//         typeResponse: TypeResponse.boolean,
//     },
//     {
//         id: 22,
//         title: 'Tem casos de cardiopatia antes dos 50 anos na família? Se sim, qual o grau de parentesco?',
//         typeResponse: TypeResponse.text,
//     },
//     {
//         id: 23,
//         title: 'Tem histórico de hipertensão na família? Se sim, qual o grau de parentesco?',
//         typeResponse: TypeResponse.text,
//     },
//     {
//         id: 24,
//         title: 'Tem histórico de diabetes na família? Se sim, qual o tipo e o grau de parentesco?',
//         typeResponse: TypeResponse.text,
//     },
//     {
//         id: 25,
//         title: 'Tem histórico familiar de osteoporose? Se sim, qual o grau de parentesco?',
//         typeResponse: TypeResponse.text,
//     },
//     {
//         id: 26,
//         title: 'Você utiliza algum medicamento contínuo? Se sim, qual(is)?',
//         typeResponse: TypeResponse.text,
//     },
//     {
//         id: 27,
//         title: 'Você tem alergia a medicamentos ou substâncias? Se sim, qual(is)?',
//         typeResponse: TypeResponse.text,
//     },
//     {
//         id: 28,
//         title: 'Você já fez alguma cirurgia? Se sim, qual?',
//         typeResponse: TypeResponse.text,
//     },
//     {
//         id: 29,
//         title: 'Você sente dores em alguma dessas estruturas?',
//         typeResponse: TypeResponse.text,
//         multipleChoice: true,
//         choices: [
//             'Coluna',
//             'Articulações (joelhos, cotovelos, ombros...)',
//             'Músculos',
//             'Nenhuma dor',
//         ]
//     },
//     {
//         id: 30,
//         title: 'Você possui diagnóstico de algum problema ortopédico? Se sim, qual?',
//         typeResponse: TypeResponse.text,
//         multipleChoice: true,
//         choices: [
//             'Lesão óssea ou muscular',
//             'Inflamação (tendinite, bursite...)',
//             'Artrose',
//             'Fratura',
//         ]
//     },
//     {
//         id: 31,
//         title: 'Você possui alguma restrição ou recomendação médica para a prática de exercícios?',
//         typeResponse: TypeResponse.text,
//     },
//     {
//         id: 32,
//         title: 'Você possui alguma limitação para fazer atividades do cotidiano?',
//         typeResponse: TypeResponse.text,
//     },
//     {
//         id: 33,
//         title: 'Você fez alguma avaliação física dentro do período de 1 ano (teste ergométrico, de esforço, de força...)? Se sim, qual?',
//         typeResponse: TypeResponse.text,
//     },
//     {
//         id: 34,
//         title: 'Quais são os seus objetivos com a prática de exercício físico?',
//         typeResponse: TypeResponse.text,
//     },
//     {
//         id: 35,
//         title: 'Quantos dias na semana você pretende treinar? Quanto tempo você tem por dia para treinar?',
//         typeResponse: TypeResponse.text,
//     },
//     {
//         id: 36,
//         title: 'Tem algum exercício que você não gosta ou não pode fazer? E algum que você gosta?',
//         typeResponse: TypeResponse.text,
//     }
// ]

