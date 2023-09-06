import {atom} from 'recoil';

const token=localStorage.getItem("auth-token-creator");


export const token_local=atom({
    key:'token_local',
    default:token | null,
})