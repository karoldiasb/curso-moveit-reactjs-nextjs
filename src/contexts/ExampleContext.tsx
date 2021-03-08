
// Context é utilizado para troca de informações entre os componentes da aplicação
// Envolve toda a aplicação

import { createContext, ReactNode } from "react";

interface ExampleContextData {

}

interface ExampleProviderProps {
    children: ReactNode;
}

const ExampleContext = createContext({} as ExampleContextData)

export function ExampleProvider({children}: ExampleProviderProps){
    return (
        <ExampleContext.Provider value ={{}}>
            {children}
        </ExampleContext.Provider>
    );
}