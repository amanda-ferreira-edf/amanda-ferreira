import { QuestsDTO } from "./questsDTO"
import { UserDTO } from "./userDTO"

export type AnswerDTO = {
    response: string,
    idUser: string,
    idQuestion: number
    idAnswer?: number | null
    user?: UserDTO
    question?: QuestsDTO
}