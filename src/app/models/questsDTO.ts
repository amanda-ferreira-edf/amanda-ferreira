export type QuestsDTO = {
    questionId?: number;
    questionText: string;
    questionSubtext?: string;
    typeResponse: string;
    multipleChoice?: boolean;
    choices?: string[];
    response?: string;
    idAnswer?: number
};
export enum TypeResponse {
    text = 'text',
    date = 'date',
    number = 'number',
    boolean = 'boolean',
}