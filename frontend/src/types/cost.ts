export interface Cost {
    id: string;
    name: string;
    value: number;
    type: 'Alimentação' | 'Lazer | "Transporte' | 'Educação' | "Outros";
    data?: string;
}