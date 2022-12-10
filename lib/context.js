import { createContext } from 'react';

export const UserContext = createContext({user: null})

export const ContestsContext = createContext([])

export const ImagesContext = createContext([])

export const TestContext = createContext('test contest here')
