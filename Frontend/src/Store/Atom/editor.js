import {atom} from 'recoil';

const token=localStorage.getItem("auth-token-editor");


export const token_editor=atom({
    key:'token_editor',
    default:token | null,
})